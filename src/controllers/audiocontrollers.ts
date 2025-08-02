import { Request, Response } from 'express';
import { generateExpandedText } from '../services/openaiServices';
import { convertTextToSpeech } from '../services/ttsService';
import s3 from '../uitils/aws';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const generateAudio = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const expandedText = await generateExpandedText(text);
    const filename = `${uuidv4()}.mp3`;

    const audioPath = path.join(__dirname, '../../audio', filename);

    await convertTextToSpeech(expandedText, audioPath);

    const fileContent = fs.readFileSync(audioPath);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filename,
      Body: fileContent,
      ContentType: 'audio/mpeg',
      
   };

    const data = await s3.upload(uploadParams).promise();

    fs.unlinkSync(audioPath);

    return res.status(200).json({ audioUrl: data.Location });

  } catch (error) {
    console.error('Audio generation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
