import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ResumeData, PersonalInfo, Experience } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setTemplateId: (id: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  setSummary: (summary: string) => void;
  resetForm: () => void;
}

const initialData: ResumeData = {
  templateId: 'template-1',

  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
  },

  summary: '',
  experience: [],
  education: [],
  skills: [],
  tools: [],
  languages: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialData,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setTemplateId: (id) =>
        set((state) => ({
          resumeData: { ...state.resumeData, templateId: id },
        })),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, exp],
          },
        })),

      updateExperience: (id, updatedExp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((item) =>
              item.id === id ? { ...item, ...updatedExp } : item
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((item) => item.id !== id),
          },
        })),

      setSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      resetForm: () => set({ resumeData: initialData }),
    }),
    {
      name: 'resume-builder-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);