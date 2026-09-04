// 1. Template Configuration
export interface TemplateConfig {
  id: string;
  name: string;
  requiresProfilePic: boolean;
}

// 2. Personal Information
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  linkedin: string; // We'll handle the empty string check in the UI
  profilePicUrl?: string; // Optional because not all templates need it
}

// 3. Work Experience
export interface Experience {
  id: string; // Crucial for React keys when rendering lists
  companyName: string;
  startDate: string;
  endDate: string;
  description: string; // This is where we'll enforce the word limit in the UI
}

// 4. The Core Resume Data Object
export interface ResumeData {
  templateId: string;
  personalInfo: PersonalInfo;
  professionalSummary: string; // AI generated
  experience: Experience[];
  skills: string[];
  languages: string[];
  tools: string[];
}

// 5. Zustand Store Definition (State + Actions)
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
  
  // Array Actions for Skills, Languages, Tools
  updateSkills: (skills: string[]) => void;
  updateLanguages: (languages: string[]) => void;
  updateTools: (tools: string[]) => void;
}