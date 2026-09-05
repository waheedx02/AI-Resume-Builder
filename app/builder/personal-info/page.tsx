'use client';

import { useRef } from 'react';
import { Sparkles, User, Upload, X } from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import { resumeTemplates } from '@/lib/templates';

export default function PersonalInfoStep() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedTemplate = resumeTemplates.find((t) => t.id === resumeData.templateId);
  const needsProfilePic = Boolean(selectedTemplate?.requiresProfilePic);

  const { personalInfo } = resumeData;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updatePersonalInfo({ profilePicUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    updatePersonalInfo({ profilePicUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      {/* ---------- Header ---------- */}
      <div className="text-center space-y-4 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold rounded-full border border-[#10B981]/20">
          <Sparkles size={12} /> Step 2 of 5
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Tell us about yourself
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          This shows up right at the top of your resume, so make it count.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* ---------- Profile picture (conditional) ---------- */}
        {needsProfilePic && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                {personalInfo?.profilePicUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={personalInfo.profilePicUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={28} className="text-slate-600" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  <Upload size={13} /> Upload photo
                </button>
                {personalInfo?.profilePicUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePic}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-slate-400 text-xs font-medium hover:bg-slate-800 transition"
                  >
                    <X size={13} /> Remove
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------- Name ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" required>
            <input
              type="text"
              value={personalInfo?.firstName ?? ''}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              placeholder="Jordan"
              className={inputClasses}
            />
          </Field>
          <Field label="Last Name" required>
            <input
              type="text"
              value={personalInfo?.lastName ?? ''}
              onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
              placeholder="Michaels"
              className={inputClasses}
            />
          </Field>
        </div>

        {/* ---------- Headline / title ---------- */}
        <Field label="Professional Title" hint="Shown under your name, e.g. Product Designer">
          <input
            type="text"
            value={personalInfo?.title ?? ''}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            placeholder="Product Designer"
            className={inputClasses}
          />
        </Field>

        {/* ---------- Email + Mobile ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input
              type="email"
              value={personalInfo?.email ?? ''}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="jordan@email.com"
              className={inputClasses}
            />
          </Field>
          <Field label="Mobile Number">
            <input
              type="tel"
              value={personalInfo?.mobile ?? ''}
              onChange={(e) => updatePersonalInfo({ mobile: e.target.value })}
              placeholder="+1 (555) 012-3456"
              className={inputClasses}
            />
          </Field>
        </div>

        {/* ---------- LinkedIn ---------- */}
        <Field label="LinkedIn" hint="Optional — leave blank to hide it from your resume">
          <input
            type="text"
            value={personalInfo?.linkedin ?? ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/jordanm"
            className={inputClasses}
          />
        </Field>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small local helpers                                                */
/* ------------------------------------------------------------------ */

const inputClasses =
  'w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10B981]/50 focus:ring-2 focus:ring-[#10B981]/20 transition';

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
        {label} {required && <span className="text-[#10B981]">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}