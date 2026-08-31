export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  templateId: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  summary: string;
}