import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { personalInfo, experience, targetRole } = await req.json();

    const prompt = `
    You are an expert resume writer. Generate 3 distinct options for a professional summary tailored for a "${targetRole || personalInfo.fullName || 'Professional'}" role.
    
    User Context:
    - Target Role / Title: ${targetRole || 'Not specified'}
    - Work Experience: ${JSON.stringify(experience, null, 2)}
    
    Requirements:
    1. Provide 3 different options (e.g., Option 1: Results-Driven, Option 2: Technical Focus, Option 3: Concise/Executive).
    2. Format the response strictly as a JSON array of strings: ["Summary 1...", "Summary 2...", "Summary 3..."]
    3. Do not include markdown headers or extra commentary, return raw JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const summaries = JSON.parse(response.text || '[]');
    return NextResponse.json({ summaries });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}