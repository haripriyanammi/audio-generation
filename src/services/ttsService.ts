// @ts-ignore
const gTTS = require('gtts');
import fs from 'fs';

export const convertTextToSpeech = (text: string, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(text, 'en');

    gtts.save(filePath, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
