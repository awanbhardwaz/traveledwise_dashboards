/**
 * AI Gemini Configuration
 * Uses Vercel AI SDK with Google Gemini provider for streaming responses.
 */

import { google } from '@ai-sdk/google';

export const geminiModel = google('gemini-1.5-pro-latest');

export const geminiFlashModel = google('gemini-1.5-flash-latest');
