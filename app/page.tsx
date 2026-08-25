"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Upload, Sparkles, FileText, Download, Loader2 } from "lucide-react";
import { ResumeDocument, ResumeData } from "@/components/ResumeDocument";

// Dynamically import PDF components to bypass SSR window object errors
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [tailoredData, setTailoredData] = useState<ResumeData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a PDF resume and paste a job description.");
      return;
    }

    setLoading(true);
    setStatusMessage("Extracting text from PDF...");

    try {
      // Step A: Extract PDF Text via /api/parse
      const formData = new FormData();
      formData.append("file", file);

      const parseRes = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const parseData = await parseRes.json();
      if (!parseRes.ok) throw new Error(parseData.error || "Failed to parse PDF");

      // Step B: Send parsed text + JD to Gemini via /api/tailor
      setStatusMessage("Gemini AI is tailoring your resume...");
      const tailorRes = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: parseData.text,
          jobDescription,
        }),
      });

      const tailoredJson = await tailorRes.json();
      if (!tailorRes.ok) throw new Error(tailoredJson.error || "Failed to tailor resume");

      setTailoredData(tailoredJson);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during generation.");
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Resume Tailor
          </h1>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Powered by Gemini 2.5 Flash
        </span>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        {/* LEFT COLUMN: Input Form */}
        <div className="flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-200">1. Upload Base Resume</h2>
            <p className="text-sm text-slate-400">Select your existing resume in PDF format.</p>
            <label className="mt-3 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl p-5 cursor-pointer transition-all">
              <Upload className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-sm font-medium text-slate-300">
                {file ? file.name : "Click or drag PDF file here"}
              </span>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-semibold text-slate-200">2. Target Job Description</h2>
            <p className="text-sm text-slate-400 mb-3">Paste the job posting you are applying for.</p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job title, responsibilities, and required qualifications here..."
              className="flex-1 w-full min-h-[200px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !file || !jobDescription}
            className="w-full py-3.5 px-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{statusMessage}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Tailor Resume with Gemini</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: PDF Preview & Download */}
        <div className="flex flex-col bg-slate-900/60 p-6 rounded-2xl border border-slate-800 min-h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-200">3. Optimized Output</h2>
              <p className="text-sm text-slate-400">Preview and download your tailored PDF.</p>
            </div>
            {tailoredData && (
              <PDFDownloadLink
                document={<ResumeDocument data={tailoredData} />}
                fileName={`${tailoredData.fullName || "Tailored"}_Resume.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                {({ loading: pdfLoading }) => (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{pdfLoading ? "Preparing..." : "Download PDF"}</span>
                  </>
                )}
              </PDFDownloadLink>
            )}
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {tailoredData ? (
              <PDFViewer className="w-full h-full border-none min-h-[550px]">
                <ResumeDocument data={tailoredData} />
              </PDFViewer>
            ) : (
              <div className="text-center p-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">Your generated PDF preview will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}