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
        You are a friendly AI voice assistant.
        - Your job is to turn short inputs into meaningful spoken sentences.
        - If the user gives a name, greet them.
        - If the user gives a topic like "weather" or "time", respond as if you're assisting.
        - Be polite, short, and conversational.

        Examples:
        - Input: "Hari Priya" → "Hello Hari Priya, how can I assist you today?"
        - Input: "weather" → "The weather looks great today. Would you like a full forecast?"
        - Input: "hello" → "Hi there! How can I help you?"
        `
      },
      { role: 'user', content: inputText }
    ],
    max_tokens: 100,
    temperature: 0.9
  });

  const expandedText = response.choices[0].message.content?.trim() || '';
  return expandedText;
};



// 2. CONVERT TEXT TO AUDIO (OpenAI TTS)
export const convertTextToSpeech = async (
  text: string,
  filePath: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'nova' // default
): Promise<void> => {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    input: text,
    voice: voice,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
};

