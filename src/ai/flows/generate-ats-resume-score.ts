// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an ATS Resume Score.
 *
 * - generateAtsResumeScore - A function that generates an ATS Resume Score based on a resume and job description.
 * - GenerateAtsResumeScoreInput - The input type for the generateAtsResumeScore function.
 * - GenerateAtsResumeScoreOutput - The return type for the generateAtsResumeScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAtsResumeScoreInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescriptionText: z.string().describe('The text content of the job description.'),
});
export type GenerateAtsResumeScoreInput = z.infer<typeof GenerateAtsResumeScoreInputSchema>;

const GenerateAtsResumeScoreOutputSchema = z.object({
  atsScore: z
    .number()
    .describe(
      'A score between 0 and 100 representing how well the resume is likely to perform in an Applicant Tracking System, based on the job description provided.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the resume received the score, including areas of strength and weakness.'
    ),
});
export type GenerateAtsResumeScoreOutput = z.infer<typeof GenerateAtsResumeScoreOutputSchema>;

export async function generateAtsResumeScore(input: GenerateAtsResumeScoreInput): Promise<GenerateAtsResumeScoreOutput> {
  return generateAtsResumeScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAtsResumeScorePrompt',
  input: {schema: GenerateAtsResumeScoreInputSchema},
  output: {schema: GenerateAtsResumeScoreOutputSchema},
  prompt: `You are an expert in evaluating resumes against job descriptions and predicting their performance in Applicant Tracking Systems (ATS). Given the following resume and job description, generate an ATS score (0-100) indicating the resume's compatibility with the job description. Also, provide a brief explanation of your reasoning for the assigned score.

Resume:
{{resumeText}}

Job Description:
{{jobDescriptionText}}`,
});

const generateAtsResumeScoreFlow = ai.defineFlow(
  {
    name: 'generateAtsResumeScoreFlow',
    inputSchema: GenerateAtsResumeScoreInputSchema,
    outputSchema: GenerateAtsResumeScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
