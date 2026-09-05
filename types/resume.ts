// 1. Template Configuration
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  badge?: string;

  // ---- Capability contract -------------------------------------------
  // Anything a builder step or a template needs to know about the chosen
  // template goes here, not hardcoded into a component. Steps read these
  // to decide what to show/require; templates can read them too if they
  // ever need to defensively enforce a limit themselves.
  requiresProfilePic: boolean;
  maxSkills: number;
  maxExperienceEntries: number;
  summaryWordLimit: number;
  experienceDescriptionWordLimit: number;
}

// 2. Personal Information
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string; // e.g. "Product Designer" — headline shown under the name
  email: string;
  mobile: string;
  linkedin: string; // We'll handle the empty string check in the UI
  profilePicUrl?: string; // Optional because not all templates need it
}

// 3. Work Experience
export interface Experience {
  id: string; // Crucial for React keys when rendering lists
  role: string; // Job title for this position, e.g. "Senior Product Designer"
  company: string; // Renamed from companyName to match usage across the app
  startDate: string;
  endDate: string;
  description: string; // This is where we'll enforce the word limit in the UI
}

// 4. Education
export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

// 5. The Core Resume Data Object
export interface ResumeData {
  templateId: string;
  personalInfo: PersonalInfo;
  summary: string; // AI generated — renamed from professionalSummary
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  tools: string[];
}

// 6. Zustand Store Definition (State + Actions)
export interface ResumeStore {
  resumeData: ResumeData;

  // Actions
  setTemplateId: (id: string) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // Experience Array Actions
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  // Education Array Actions
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Array Actions for Skills, Languages, Tools
  updateSkills: (skills: string[]) => void;
  updateLanguages: (languages: string[]) => void;
  updateTools: (tools: string[]) => void;
}