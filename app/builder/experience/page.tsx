'use client';

import { Sparkles, Plus, Trash2, Briefcase, AlertCircle } from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import { resumeTemplates } from '@/lib/templates';
import { useBuilderStep } from '@/lib/steps';
import { countWords } from '@/lib/text';
import type { Experience } from '@/types/resume';

function makeEmptyExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  };
}

export default function ExperienceStep() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const { index, total } = useBuilderStep();

  const selectedTemplate = resumeTemplates.find((t) => t.id === resumeData.templateId);
  // Fall back to generous defaults if somehow no template is selected yet,
  // so this page never hard-crashes — though the layout should prevent
  // reaching this step without one.
  const maxExperienceEntries = selectedTemplate?.maxExperienceEntries ?? 4;
  const descriptionWordLimit = selectedTemplate?.experienceDescriptionWordLimit ?? 30;

  const experience = resumeData.experience ?? [];
  const atMax = experience.length >= maxExperienceEntries;

  const handleAdd = () => {
    if (atMax) return;
    addExperience(makeEmptyExperience());
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      {/* ---------- Header ---------- */}
      <div className="text-center space-y-4 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full border border-teal-400/20">
          <Sparkles size={12} /> Step {index + 1} of {total}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Your work experience
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Add up to {maxExperienceEntries} roles, most recent first. Keep each bullet tight —
          it keeps your chosen template on a single page.
        </p>
      </div>

      {/* ---------- Empty state ---------- */}
      {experience.length === 0 && (
        <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl py-14 text-center text-slate-500 mb-6">
          <Briefcase className="mx-auto mb-3 text-slate-700" size={28} />
          <p className="text-sm">No experience added yet.</p>
        </div>
      )}

      {/* ---------- Experience entries ---------- */}
      <div className="space-y-5">
        {experience.map((exp, i) => {
          const wordCount = countWords(exp.description);
          const overLimit = wordCount > descriptionWordLimit;

          return (
            <div
              key={exp.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Role {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Job Title" required>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    placeholder="Senior Product Designer"
                    className={inputClasses}
                  />
                </Field>
                <Field label="Company" required>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Northwind Labs"
                    className={inputClasses}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Start Date">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    placeholder="2022"
                    className={inputClasses}
                  />
                </Field>
                <Field label="End Date" hint="Use “Present” if this is your current role">
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    placeholder="Present"
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field
                label="Description"
                hint="One achievement per line. Bullet points render automatically."
              >
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder={'Led design for the core analytics dashboard, cutting time-to-insight by 35%.\nPartnered with engineering to ship a new design system.'}
                  rows={3}
                  aria-invalid={overLimit}
                  className={`${inputClasses} resize-none ${
                    overLimit ? 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' : ''
                  }`}
                />
                <div className="flex items-center justify-between mt-1">
                  {overLimit ? (
                    <p className="flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle size={12} />
                      {wordCount - descriptionWordLimit} words over the limit — trim it to continue.
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    className={`text-[11px] ${overLimit ? 'text-red-400' : 'text-slate-500'}`}
                  >
                    {wordCount}/{descriptionWordLimit} words
                  </p>
                </div>
              </Field>
            </div>
          );
        })}
      </div>

      {/* ---------- Add button ---------- */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleAdd}
          disabled={atMax}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 text-slate-300 text-sm font-semibold hover:border-teal-400/50 hover:text-teal-400 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:text-slate-300"
        >
          <Plus size={15} /> Add another role
        </button>
        {atMax && (
          <p className="text-[11px] text-slate-500 text-center mt-2">
            You&rsquo;ve reached the {maxExperienceEntries}-role limit for this template.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small local helpers                                                */
/* ------------------------------------------------------------------ */

const inputClasses =
  'w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
        {label} {required && <span className="text-teal-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}