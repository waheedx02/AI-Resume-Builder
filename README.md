# 📄 AI Resume Tailor & ATS Optimizer

An automated full-stack application that transforms static PDF resumes into job-tailored, ATS-optimized PDFs. Built with **Next.js App Router**, **TypeScript**, **Google Gemini 3.6 Flash**, and **@react-pdf/renderer**.

---

## 🌟 Key Features

* **⚡ Server-Side PDF Parsing:** Asynchronously extracts raw structured text from uploaded PDF resumes.
* **🧠 Gemini-Powered Optimization:** Leverages Google Gemini AI to analyze job descriptions, extract targeted keywords, rewrite experience bullet points, and re-order skills.
* **🎯 Guaranteed Structured JSON Outputs:** Uses strict JSON Schema response constraints with the Gemini API to prevent hallucination and guarantee valid payload structures.
* **📄 Dynamic PDF Rendering:** Generates vector-based, ATS-friendly PDF documents programmatically on the client/server using `@react-pdf/renderer`.
* **🎨 Modern Split-Screen UI:** Interactive real-time dashboard built with Tailwind CSS, Lucide Icons, and dynamic document previews.

---

## 🏗️ System Architecture

[ Upload PDF ] + [ Job Description ]
│
▼
[ /api/parse API Route ]
└─► Server-Side PDF Parser (pdf2json)
│
▼
[ /api/tailor API Route ]
└─► Google Gemini 3.6 Flash (Structured Output Schema)
│
▼
[ Frontend State & React PDF ]
└─► Dynamic PDF Render & Instant Download Stream

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, TypeScript)
* **Styling:** Tailwind CSS, Lucide React Icons
* **AI Model:** Google Gemini API (`gemini-3.6-flash`)
* **PDF Parsing:** `pdf2json`
* **PDF Generation:** `@react-pdf/renderer`

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and `npm` installed.

### 2. Installation
Clone the repository and install the project dependencies:

```bash
git clone [https://github.com/waheedx02/ai-resume-tailor.git](https://github.com/waheedx02/ai-resume-tailor.git)
cd ai-resume-tailor
npm install