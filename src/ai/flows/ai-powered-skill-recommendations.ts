'use server';
/**
 * @fileOverview AI-powered skill recommendation flow.
 *
 * This flow suggests missing skills to improve a resume.
 * - getSkillRecommendations - A function that handles the skill recommendation process.
 * - SkillRecommendationsInput - The input type for the getSkillRecommendations function.
 * - SkillRecommendationsOutput - The return type for the getSkillRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillRecommendationsInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescriptionText: z.string().describe('The text content of the job description.'),
  userPreferences: z.string().optional().describe('User preferences such as roles, skills, and industries.'),
});
export type SkillRecommendationsInput = z.infer<typeof SkillRecommendationsInputSchema>;

const SkillRecommendationsOutputSchema = z.object({
  recommendedSkills: z.array(z.string()).describe('A list of recommended skills to improve the resume.'),
  reasoning: z.string().describe('The AI reasoning behind the skill recommendations.'),
});
export type SkillRecommendationsOutput = z.infer<typeof SkillRecommendationsOutputSchema>;

export async function getSkillRecommendations(input: SkillRecommendationsInput): Promise<SkillRecommendationsOutput> {
  return skillRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillRecommendationsPrompt',
  input: {schema: SkillRecommendationsInputSchema},
  output: {schema: SkillRecommendationsOutputSchema},
  prompt: `You are an AI-powered resume improvement tool. Your task is to analyze a user's resume and a job description, and suggest skills the user might be missing to improve their chances of getting the job.

Consider the user's resume, the job description, and any user preferences provided. Provide a list of skills that the user should consider adding to their resume to better match the job description. Explain your reasoning for each skill recommendation.

Resume:
{{resumeText}}

Job Description:
{{jobDescriptionText}}

User Preferences:
{{#if userPreferences}}
{{userPreferences}}
{{else}}
None
{{/if}}
`,
});

const skillRecommendationsFlow = ai.defineFlow(
  {
    name: 'skillRecommendationsFlow',
    inputSchema: SkillRecommendationsInputSchema,
    outputSchema: SkillRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
