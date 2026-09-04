import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// Adjust the import path if your types folder is located elsewhere
import { ResumeStore, ResumeData } from '../types/resume'; 

// Define the initial empty state outside the store for cleaner code
const initialResumeData: ResumeData = {
  templateId: '',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    linkedin: '',
    profilePicUrl: '',
  },
  professionalSummary: '',
  experience: [],
  skills: [],
  languages: [],
  tools: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,

      // --- Template Actions ---
      setTemplateId: (id) =>
        set((state) => ({
          resumeData: { ...state.resumeData, templateId: id },
        })),

      // --- Personal Info Actions ---
      updatePersonalInfo: (data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...data },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, professionalSummary: summary },
        })),

      // --- Experience Array Actions ---
      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),

      updateExperience: (id, updatedExp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updatedExp } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      // --- Simple Array Actions ---
      updateSkills: (skills) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills },
        })),

      updateLanguages: (languages) =>
        set((state) => ({
          resumeData: { ...state.resumeData, languages },
        })),

      updateTools: (tools) =>
        set((state) => ({
          resumeData: { ...state.resumeData, tools },
        })),
    }),
    {
      name: 'resume-builder-storage', // This is the key used in localStorage
    }
  )
);