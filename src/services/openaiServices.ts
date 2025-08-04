import { config } from 'dotenv';
config();

import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. EXPAND TEXT
export const generateExpandedText = async (inputText: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `
          You are a friendly voice assistant. When the user gives a word, name, or short phrase,
          you turn it into a polite, helpful sentence suitable for speaking out loud.
          For example, if the user says "Hari Priya", you might respond with:
          "Hello Hari Priya, how can I help you today?"
        `
      },
      { role: 'user', content: inputText }
    ],
    max_tokens: 100,
    temperature: 0.8 // optional: increases creativity
  });

  const expandedText = response.choices[0].message.content?.trim() || '';
  return expandedText;
};


// 2. CONVERT TEXT TO AUDIO (OpenAI TTS)
export const convertTextToSpeech = async (text: string, filePath: string): Promise<void> => {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1', // or 'tts-1-hd'
    input: text,
    voice: 'nova', // or 'alloy', 'echo', 'fable', 'onyx', 'shimmer'
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
};

