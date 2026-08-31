export interface PersonalInfo {
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string; // one bullet per line, split on "\n"
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  templateId: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  tools?: string[];
  languages?: string[];
}