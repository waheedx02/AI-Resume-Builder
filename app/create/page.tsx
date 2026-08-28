"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Download, Loader2, LayoutTemplate, User, Briefcase } from "lucide-react";
import { ResumeDocument, ResumeData } from "@/components/ResumeDocument";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<"minimal" | "creative">("minimal");
  
  // Minimal required user inputs
  const [contactInfo, setContactInfo] = useState({
    fullName: "Your Name",
    jobTitle: "Your Job Title",
    email: "your.email@example.com",
    phone: "+92 300 1234567",
    location: "City, Country",
  });

  const [rawExperience, setRawExperience] = useState(
    "Your past experience and skills notes here. Gemini will format this into bullet points for your resume."
  );

  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tailoredData, setTailoredData] = useState<ResumeData | null>(null);

  const handleGenerate = async () => {
    if (!contactInfo.fullName || !jobDescription) {
      alert("Please provide your full name and job description.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactInfo: { ...contactInfo, templateId: selectedTemplate },
          rawExperience,
          jobDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate resume");

      setTailoredData(data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Resume Builder & Tailor
          </h1>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1700px] w-full mx-auto">
        
        {/* LEFT COLUMN: Controls & Input Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 overflow-y-auto max-h-[85vh]">
          
          {/* Step 1: Select Template */}
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-blue-400" /> 1. Select PDF Design Template
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("minimal");
                  if (tailoredData) setTailoredData({ ...tailoredData, templateId: "minimal" });
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === "minimal"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-sm">Modern Minimal</div>
                <div className="text-xs text-slate-500 mt-1">Single column, high ATS rating</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("creative");
                  if (tailoredData) setTailoredData({ ...tailoredData, templateId: "creative" });
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === "creative"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-sm">Creative Sidebar</div>
                <div className="text-xs text-slate-500 mt-1">2-Column layout for visual roles</div>
              </button>
            </div>
          </div>

          {/* Step 2: Contact Details */}
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> 2. Personal & Contact Details
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                value={contactInfo.fullName}
                onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Target Job Title"
                value={contactInfo.jobTitle}
                onChange={(e) => setContactInfo({ ...contactInfo, jobTitle: e.target.value })}
                className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Step 3: Raw Notes & Target JD */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" /> 3. Experience Notes & Job Description
            </h2>
            <textarea
              placeholder="Past experience / skill notes (Gemini will format this into bullet points)..."
              value={rawExperience}
              onChange={(e) => setRawExperience(e.target.value)}
              className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs resize-none focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Paste Target Job Description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-28 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs resize-none focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Build Resume with Gemini</span>
          </button>
        </div>

        {/* RIGHT COLUMN: Real-Time PDF Output (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/60 p-6 rounded-2xl border border-slate-800 min-h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Live PDF Document Preview</h2>
            {tailoredData && (
              <PDFDownloadLink
                document={<ResumeDocument data={tailoredData} />}
                fileName={`${tailoredData.fullName || "Resume"}.pdf`}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-all"
              >
                {({ loading: pdfLoading }) => (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{pdfLoading ? "Preparing..." : "Download PDF"}</span>
                  </>
                )}
              </PDFDownloadLink>
            )}
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {tailoredData ? (
              <PDFViewer className="w-full h-full border-none min-h-[600px]">
                <ResumeDocument data={tailoredData} />
              </PDFViewer>
            ) : (
              <div className="text-center text-slate-500">
                <LayoutTemplate className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-xs">Fill in inputs and click Build Resume to generate instant preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}