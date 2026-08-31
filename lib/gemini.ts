// lib/gemini.ts
import { GoogleGenAI } from '@google/genai';

type UserData = Record<string, unknown>;

// Initialize the GoogleGenAI instance using process.env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateProfessionalSummary(
  userData: UserData,
  targetRole: string
): Promise<string> {
  const prompt = `Generate a compelling professional summary for a ${targetRole} based on the following experience: ${JSON.stringify(
    userData
  )}. Keep it concise and impact-driven.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || '';
}