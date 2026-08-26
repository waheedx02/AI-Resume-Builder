# 📄 AI Resume Builder & Tailor

An interactive full-stack web application that allows users to pick professional PDF templates and generate job-targeted, ATS-optimized resumes in seconds. Built with **Next.js App Router**, **TypeScript**, **Google Gemini 3.6 Flash**, and **@react-pdf/renderer**.

---

## 🌟 Key Features

* **🎨 Multi-Template Engine:** Choose between distinct vector-rendered PDF layouts (*Modern Minimal* for standard/corporate ATS compliance and *Creative Sidebar* for visual/design roles).
* **⚡ Minimal Input, Maximum AI Impact:** Requires only basic contact details and rough experience notes—Gemini automatically crafts polished, action-oriented bullet points with metrics.
* **🧠 Targeted Job Description Tailoring:** Analyzes target job postings to automatically extract top relevant technical skills, soft competencies, and summary statements.
* **🎯 Guaranteed JSON Schema Enforcement:** Uses strict output schemas with the Gemini API to guarantee valid, structure-safe response payloads every time.
* **👁️ Live Vector PDF Preview:** Instant side-by-side dynamic PDF preview and instant client-side download powered by `@react-pdf/renderer`.

---

## 📸 Screenshot

![AI-Resume-Builder](screenshots/demo.png)

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, TypeScript)
* **Styling:** Tailwind CSS, Lucide React Icons
* **AI Model:** Google Gemini API (`gemini-3.6-flash`)
* **PDF Rendering:** `@react-pdf/renderer`

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and `npm` installed.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone [https://github.com/your-username/ai-resume-builder.git](https://github.com/your-username/ai-resume-builder.git)
cd ai-resume-builder
npm install