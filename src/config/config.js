import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  model: 'x-ai/grok-4.1-fast:free',
  maxFileSize: 5 * 1024 * 1024,
  allowedFormats: ['srt', 'vtt']
};
