import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume text and job description are required." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
      You are an expert AI resume builder and ATS optimization specialist.
      Analyze the provided Base Resume Text and Target Job Description.
      
      Task:
      1. Extract candidate's full name.
      2. Rewrite the professional summary to target the job description.
      3. Identify and list top matching technical and soft skills.
      4. Create structured bullet points highlighting relevant achievements.

      Base Resume:
      ${resumeText}

      Job Description:
      ${jobDescription}
    `;

    // Updated model parameter
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            fullName: { type: "STRING" },
            summary: { type: "STRING" },
            skills: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
            experience: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  company: { type: "STRING" },
                  role: { type: "STRING" },
                  bullets: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                  },
                },
                required: ["company", "role", "bullets"],
              },
            },
          },
          required: ["fullName", "summary", "skills", "experience"],
        },
      },
    });

    const responseText = response.text || "{}";
    const tailoredData = JSON.parse(responseText);

    return NextResponse.json(tailoredData);
  } catch (error: any) {
    console.error("Gemini Tailoring Detailed Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate tailored resume using Gemini" },
      { status: 500 }
    );
  }
}