# 📄 AI Resume Builder & Tailor

<p align="center">
  <b>An AI-powered resume builder that helps users create professional, ATS-optimized resumes tailored to specific job descriptions.</b>
</p>

<p align="center">
  Build your resume • Tailor it with AI • Preview it live • Download as PDF
</p>

---

## 📖 Overview

**AI Resume Builder & Tailor** is an interactive full-stack web application that uses **Google Gemini** to help users create polished, professional, and job-targeted resumes.

Users can enter their personal information and experience, select a professional resume template, provide a target job description, and let AI transform their rough information into structured, professional resume content.

The completed resume can then be **previewed in real time and downloaded as a PDF**.

Built with **Next.js, TypeScript, Google Gemini, Tailwind CSS, and React PDF**.

---

## ✨ Features

### 🎨 Multi-Template Resume Engine

Choose from professionally designed resume templates depending on your target role:

* **Modern Minimal** — Clean, structured, and ATS-friendly for corporate and technical positions.
* **Creative Sidebar** — A more visually distinctive layout for creative and design-oriented roles.

The resume generation system keeps the underlying content separate from the presentation layer, allowing templates to render the same structured resume data in different designs.

---

### 🤖 AI-Powered Resume Generation

Transform basic information and rough experience notes into polished resume content using **Google Gemini**.

The AI can generate:

* ✍️ Action-oriented bullet points
* 💼 Professional experience descriptions
* 📈 Achievement-focused statements
* 🎯 Relevant metrics and impact statements
* 🧠 Professional summaries
* 🔤 Improved wording and clarity

Instead of requiring users to write every section from scratch, the application helps turn raw information into professional resume-ready content.

---

### 🎯 Job Description Tailoring

Users can paste a target job description and use AI to tailor their resume toward the specific position.

The application analyzes the job description for:

* 🔑 Relevant technical skills
* 🏷️ Important keywords
* 💬 Soft skills
* 📋 Role-specific requirements
* 🎯 Relevant resume summary points

The generated resume content is then adapted to better align with the target position.

---

### 🧠 Structured AI Responses

The Gemini API uses **structured output schemas** to ensure AI-generated responses follow a predictable JSON structure.

This provides:

* Consistent response formatting
* More reliable application behavior
* Easier integration with the resume data model
* Safer consumption of AI-generated content

Rather than relying entirely on free-form AI responses, the application expects structured data that can be directly consumed by the resume generation system.

---

### 👁️ Live Resume Preview

Resume changes can be reviewed through a live PDF preview powered by:

**`@react-pdf/renderer`**

This allows users to see how their resume will look while building and editing it.

---

### 📥 PDF Export

Once the resume is complete, users can generate and download a **professional PDF document** directly from the application.

---

## 🔄 Application Workflow

```text
┌──────────────────────────────┐
│        User Information      │
│   Experience • Skills • etc. │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Target Job Description   │
│       Optional Input         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Google Gemini AI       │
│                              │
│ Generate • Analyze • Tailor  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Structured Resume Data   │
│            JSON              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Resume Template         │
│                              │
│ Modern Minimal / Sidebar     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Live PDF Preview        │
│     @react-pdf/renderer      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       PDF Download           │
└──────────────────────────────┘
```

---

## 🏗️ Architecture

The application follows a modern **Next.js full-stack architecture**.

```text
┌─────────────────────────────────────┐
│            React Frontend           │
│                                     │
│  Resume Builder • Forms • Preview   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          Next.js API Routes         │
│                                     │
│     Resume Generation / Tailoring   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│           Google Gemini             │
│                                     │
│    AI Generation • Job Analysis     │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│       Structured Resume Data        │
│               JSON                  │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│       Resume Document Engine        │
│        @react-pdf/renderer          │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             PDF Output              │
└─────────────────────────────────────┘
```

This architecture keeps AI processing on the server side while allowing the React frontend to provide an interactive resume-building experience.

---

## 📸 Screenshots

![AI Resume Builder](screenshots/demo.png)

---

## 🛠️ Tech Stack

| Technology                 | Purpose                                                   |
| -------------------------- | --------------------------------------------------------- |
| ⚡ **Next.js**              | Full-stack React framework and application routing        |
| ⚛️ **React**               | Interactive user interface                                |
| 🔷 **TypeScript**          | Type-safe application development                         |
| 🎨 **Tailwind CSS**        | Styling and responsive UI                                 |
| 🤖 **Google Gemini API**   | AI-powered resume generation and job-description analysis |
| 📄 **@react-pdf/renderer** | Resume PDF generation and live preview                    |
| 🖼️ **Lucide React**       | UI icons                                                  |

---

## 📁 Project Structure

```text
ai-resume-builder/
│
├── app/
│   ├── api/
│   │   └── ...                 # Backend API routes
│   │
│   ├── create/
│   │   └── ...                 # Resume creation workflow
│   │
│   ├── global.css              # Global styles
│   ├── layout.tsx              # Root application layout
│   └── page.tsx                # Landing page
│
├── components/
│   └── ResumeDocument.tsx      # PDF document and resume templates
│
├── public/
│   └── ...                     # Static assets
│
├── screenshots/
│   └── demo.png               # Application screenshot
│
├── .env.local                  # Local environment variables
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

---

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js 18+**
* **npm**, **pnpm**, **yarn**, or **bun**
* A **Google Gemini API key**

### 1. Clone the Repository

```bash
git clone https://github.com/waheedx02/AI-Resume-Builder.git

cd AI-Resume-Builder
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or use your preferred package manager:

```bash
pnpm install
```

```bash
yarn install
```

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY="your_gemini_api_key"
```

> Never commit API keys or other sensitive credentials to the repository.

### 4. Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable         | Description                                    |
| ---------------- | ---------------------------------------------- |
| `GEMINI_API_KEY` | API key used to communicate with Google Gemini |

---

## 🧠 Key Concepts Demonstrated

This project demonstrates practical experience with:

* 🤖 **Generative AI integration**
* 🧠 **Structured AI outputs**
* 🎯 **Job-description analysis and content tailoring**
* ⚡ **Next.js App Router**
* ⚛️ **React application development**
* 🔷 **TypeScript**
* 📄 **Dynamic PDF generation**
* 🎨 **Responsive UI development**
* 🧩 **Reusable resume templates**
* 🔌 **Server-side API integration**
* 🔐 **Environment variable and API-key management**
* 🏗️ **Full-stack application architecture**

---

## 🎯 Project Goals

The goal of this project is to combine **generative AI with practical career tooling** to simplify the resume creation process.

Instead of manually rewriting a resume for every job application, users can provide their existing experience and a target job description, allowing the application to generate structured, polished, and role-specific resume content.

The project also demonstrates how AI-generated structured data can be integrated into a real-world application and transformed into a professional document through a reusable PDF rendering system.

---

## 🚀 Future Improvements

Potential improvements include:

* 📊 Resume ATS scoring
* 🔍 Keyword match analysis
* 📈 Resume improvement suggestions
* 💾 Save and manage multiple resumes
* 📤 Import existing resumes
* 📋 Additional professional templates
* 🌐 Public resume sharing
* 📄 Additional export formats

---

## 📄 License

This project is available for **educational and portfolio purposes**.