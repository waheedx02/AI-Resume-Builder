import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { contactInfo, rawExperience, jobDescription } = await req.json();

    if (!contactInfo?.fullName || !jobDescription) {
      return NextResponse.json(
        { error: "Full Name and Job Description are required." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      You are an elite executive resume writer.
      Generate a professional ATS resume using the provided Candidate Info and Target Job Description.

      Candidate Info:
      - Full Name: ${contactInfo.fullName}
      - Targeted Job Title: ${contactInfo.jobTitle || "Professional"}
      - Raw Past Experience/Background Notes: ${rawExperience || "Extensive experience in the field"}

      Target Job Description:
      ${jobDescription}

      Tasks:
      1. Write an impactful 3-sentence summary tailored directly to the target job description.
      2. Extract 8-12 top technical and soft skills requested in the job description that match the candidate's background.
      3. Format work experience into structured companies/roles with 3 powerful, bullet points using strong action verbs and quantitative metrics.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            summary: { type: "STRING" },
            skills: { type: "ARRAY", items: { type: "STRING" } },
            experience: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  company: { type: "STRING" },
                  role: { type: "STRING" },
                  bullets: { type: "ARRAY", items: { type: "STRING" } },
                },
                required: ["company", "role", "bullets"],
              },
            },
          },
          required: ["summary", "skills", "experience"],
        },
      },
    });

    const aiResult = JSON.parse(response.text || "{}");

    // Merge AI generated fields with direct user contact data
    const fullResumeData = {
      ...contactInfo,
      ...aiResult,
    };

    return NextResponse.json(fullResumeData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return NextResponse.json({ error: error?.message || "Generation failed" }, { status: 500 });
  }
}