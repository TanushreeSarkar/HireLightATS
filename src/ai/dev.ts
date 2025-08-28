import { config } from 'dotenv';
config();

import '@/ai/flows/ai-powered-skill-recommendations.ts';
import '@/ai/flows/extract-data-from-resume.ts';
import '@/ai/flows/generate-ats-resume-score.ts';
import '@/ai/flows/provide-resume-improvement-recommendations.ts';
import '@/ai/flows/chatbot-flow.ts';
