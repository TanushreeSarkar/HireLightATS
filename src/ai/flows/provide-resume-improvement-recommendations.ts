'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered recommendations on how to improve a resume based on a given job description.
 *
 * - provideResumeImprovementRecommendations - A function that takes a resume and job description as input and returns improvement recommendations.
 * - ProvideResumeImprovementRecommendationsInput - The input type for the provideResumeImprovementRecommendations function.
 * - ProvideResumeImprovementRecommendationsOutput - The return type for the provideResumeImprovementRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideResumeImprovementRecommendationsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume.'),
  jobDescriptionText: z
    .string()
    .describe('The text content of the job description.'),
});
export type ProvideResumeImprovementRecommendationsInput = z.infer<
  typeof ProvideResumeImprovementRecommendationsInputSchema
>;

const ProvideResumeImprovementRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('AI-powered recommendations on how to improve the resume.'),
});
export type ProvideResumeImprovementRecommendationsOutput = z.infer<
  typeof ProvideResumeImprovementRecommendationsOutputSchema
>;

export async function provideResumeImprovementRecommendations(
  input: ProvideResumeImprovementRecommendationsInput
): Promise<ProvideResumeImprovementRecommendationsOutput> {
  return provideResumeImprovementRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideResumeImprovementRecommendationsPrompt',
  input: {
    schema: ProvideResumeImprovementRecommendationsInputSchema,
  },
  output: {
    schema: ProvideResumeImprovementRecommendationsOutputSchema,
  },
  prompt: `You are an AI resume expert. Provide recommendations on how to improve the resume based on the job description to increase the chances of getting an interview.

Resume:
{{resumeText}}

Job Description:
{{jobDescriptionText}}`,
});

const provideResumeImprovementRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideResumeImprovementRecommendationsFlow',
    inputSchema: ProvideResumeImprovementRecommendationsInputSchema,
    outputSchema: ProvideResumeImprovementRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
