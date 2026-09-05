import { TemplateConfig } from '../types/resume';

export const resumeTemplates: TemplateConfig[] = [
  {
    id: 'template-1',
    name: 'Modern Professional',
    description: 'A sleek, single-column design suited for software engineers and tech professionals.',
    badge: 'Popular',
    requiresProfilePic: false,
    // Single column, skills render as wrapping badges — most space-efficient
    // layout of the two, so it can afford slightly higher caps.
    maxSkills: 10,
    maxExperienceEntries: 4,
    summaryWordLimit: 45,
    experienceDescriptionWordLimit: 30,
  },
  {
    id: 'template-2',
    name: 'Clean Minimalist',
    description: 'A elegant, bold header style designed for managers, marketers, and lead roles.',
    badge: 'New',
    requiresProfilePic: true,
    // Sidebar layout: skills render as a vertical list (one per line, not
    // wrapping badges) and the sidebar also carries the avatar, contact
    // block, and languages — so it runs out of vertical room faster.
    maxSkills: 6,
    maxExperienceEntries: 3,
    summaryWordLimit: 40,
    experienceDescriptionWordLimit: 25,
  },
];

// Helper function to easily grab a template's rules by its ID
export const getTemplateConfig = (id: string): TemplateConfig | undefined => {
  return resumeTemplates.find(template => template.id === id);
};