'use server';
/**
 * @fileOverview A simple chatbot flow for answering user questions about the app.
 *
 * - getChatbotResponse - A function that handles chatbot queries.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s question for the chatbot.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a helpful assistant for an application called "HireLight".

Your purpose is to assist users by answering their questions about the application.

Here's some information about HireLight:
- **What it does:** HireLight is an AI-powered tool that helps users optimize their resumes for Applicant Tracking Systems (ATS). Users can upload their resume and a job description, and the app provides an ATS score, improvement recommendations, and suggests missing skills.
- **How to get started:** To start, a user should go to the "Upload" page from the sidebar navigation. There, they can upload their resume file and the job description they are targeting. After uploading, they click the "Analyze" button to get their report.
- **Feedback and Support:** Users can provide feedback or ask for support by sending an email to support@hirelight.app.

Based on this information, please answer the user's query. Be friendly, concise, and helpful.

User query:
{{query}}
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
