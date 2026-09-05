'use client';

import { usePathname } from 'next/navigation';

export interface BuilderStep {
  id: number;
  name: string;
  path: string;
}

// Single source of truth for the builder flow. Add a step here once and
// every page (layout stepper, step badges, Back/Continue logic) picks it
// up automatically — nothing else should hardcode step names or counts.
//
// Note: "Education" also collects languages, and "Skills" also collects
// tools — each is one form with two related sections, not a separate step.
export const BUILDER_STEPS: BuilderStep[] = [
  { id: 1, name: 'Template', path: '/builder/templates' },
  { id: 2, name: 'Personal Info', path: '/builder/personal-info' },
  { id: 3, name: 'Experience', path: '/builder/experience' },
  { id: 4, name: 'Education', path: '/builder/education' },
  { id: 5, name: 'Skills', path: '/builder/skills' },
  { id: 6, name: 'AI Summary', path: '/builder/ai-summary' },
  { id: 7, name: 'Preview', path: '/builder/preview' },
];

// Lets any step page read its own position/name/total without hardcoding
// "Step X of Y" text that can drift out of sync when steps change.
export function useBuilderStep() {
  const pathname = usePathname();
  const index = BUILDER_STEPS.findIndex((step) => step.path === pathname);
  const safeIndex = index === -1 ? 0 : index;

  return {
    index: safeIndex,
    step: BUILDER_STEPS[safeIndex],
    total: BUILDER_STEPS.length,
  };
}