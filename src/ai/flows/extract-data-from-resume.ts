'use server';
/**
 * @fileOverview This file defines a Genkit flow for extracting data from a resume.
 *
 * It includes the flow definition, input and output schemas, and a wrapper function.
 *
 * - `extractDataFromResume`: A function that takes a resume data URI as input and returns the extracted data.
 * - `ExtractDataFromResumeInput`: The input type for the `extractDataFromResume` function.
 * - `ExtractDataFromResumeOutput`: The output type for the `extractDataFromResume` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDataFromResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'A resume file as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* e.g., data:application/pdf;base64,... */
    ),
});
export type ExtractDataFromResumeInput = z.infer<typeof ExtractDataFromResumeInputSchema>;

const ExtractDataFromResumeOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  experience: z.array(z.string()).describe('A list of work experiences extracted from the resume.'),
  education: z.array(z.string()).describe('A list of educational qualifications extracted from the resume.'),
});
export type ExtractDataFromResumeOutput = z.infer<typeof ExtractDataFromResumeOutputSchema>;

export async function extractDataFromResume(
  input: ExtractDataFromResumeInput
): Promise<ExtractDataFromResumeOutput> {
  return extractDataFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDataFromResumePrompt',
  input: {schema: ExtractDataFromResumeInputSchema},
  output: {schema: ExtractDataFromResumeOutputSchema},
  prompt: `You are an expert resume parser. Extract the key information from the resume provided.

    Specifically, extract the skills, work experience, and education from the resume.

    Return the information in a structured JSON format.

    Resume: {{media url=resumeDataUri}}`,
});

const extractDataFromResumeFlow = ai.defineFlow(
  {
    name: 'extractDataFromResumeFlow',
    inputSchema: ExtractDataFromResumeInputSchema,
    outputSchema: ExtractDataFromResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
