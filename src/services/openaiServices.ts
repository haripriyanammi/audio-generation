import dotenv from 'dotenv';
dotenv.config();

export const generateExpandedText = async (inputText: string): Promise<string> => {
  // This is a fake, mock response just for testing the flow
  return `This is a best expansion of your simple text: "${inputText}".`;
};
