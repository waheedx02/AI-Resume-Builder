'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useResumeStore } from '@/lib/resume-store';

const STEPS = [
  { id: 1, name: 'Template', path: '/builder/templates' },
  { id: 2, name: 'Personal Info', path: '/builder/personal-info' },
  { id: 3, name: 'Experience', path: '/builder/experience' },
  { id: 4, name: 'AI Summary', path: '/builder/ai-summary' },
  { id: 5, name: 'Preview', path: '/builder/preview' },
];

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const resumeData = useResumeStore((state) => state.resumeData);

  const currentStepIndex = STEPS.findIndex((step) => step.path === pathname);
  const activeStep = currentStepIndex !== -1 ? currentStepIndex : 0;

  // Validation checks per step
  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Step 1: Template selection (always valid once a template is picked)
        return Boolean(resumeData.templateId);
      case 1: // Step 2: Personal Info
        return Boolean(
          resumeData.personalInfo?.firstName &&
          resumeData.personalInfo?.lastName &&
          resumeData.personalInfo?.email
        );
      case 2: // Step 3: Experience
        return resumeData.experience?.length > 0;
      case 3: // Step 4: AI Summary
        return Boolean(resumeData.summary);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      router.push(STEPS[currentStepIndex + 1].path);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      router.push(STEPS[currentStepIndex - 1].path);
    }
  };

  const isNextDisabled = !isStepValid(currentStepIndex);

  return (
    <div className="min-h-screen bg-[#0B132B] text-white flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-[#0B132B]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#10B981] text-slate-900 font-bold flex items-center justify-center text-lg">
              R
            </span>
            <span className="text-xl font-bold tracking-tight">
              Resu<span className="text-[#10B981]">Mate</span>
            </span>
          </Link>

          {/* Stepper Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      isActive
                        ? 'bg-[#10B981]/10 border-[#10B981] text-[#10B981]'
                        : isCompleted
                        ? 'border-slate-700 bg-slate-800/50 text-slate-300'
                        : 'border-slate-800 text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isActive
                          ? 'bg-[#10B981] text-slate-900 font-bold'
                          : isCompleted
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {step.id}
                    </span>
                    {step.name}
                  </div>
                  {idx < STEPS.length - 1 && <span className="text-slate-700 text-xs">/</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Progress Line */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-[#10B981] h-1 transition-all duration-300"
            style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Step Page Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6">{children}</main>

      {/* Sticky Bottom Navigation Controls */}
      <footer className="border-t border-slate-800 bg-[#0F172A] py-4 px-6 sticky bottom-0 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStepIndex <= 0}
            className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <span className="text-xs text-slate-400">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>

          <button
            onClick={handleNext}
            disabled={isNextDisabled || currentStepIndex >= STEPS.length - 1}
            className="px-6 py-2.5 rounded-lg bg-[#10B981] text-slate-950 hover:bg-[#0EA5E9] transition text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </footer>
    </div>
  );
}