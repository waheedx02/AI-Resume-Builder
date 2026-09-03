'use client';

import { useMemo, useRef, useState } from 'react';
import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Phone, Camera, Sparkles, ArrowRight, ArrowLeft,
  Briefcase, MapPin, Check, AlertCircle, Trash2, FileText,
} from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import DynamicTemplateRenderer from '@/components/templates/DynamicTemplateRenderer';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */
const validators = {
  fullName: (v: string) => (v.trim().length < 2 ? 'Please enter your full name' : ''),
  title: (v: string) => (v.trim().length < 2 ? 'Add a professional title, e.g. "Product Designer"' : ''),
  email: (v: string) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter a valid email address' : '',
  phone: (v: string) =>
    !/^[+()\-.\s\d]{7,20}$/.test(v.trim()) ? 'Enter a valid phone number' : '',
  linkedin: (v: string) =>
    v.trim() === '' || /^linkedin\.com\/in\/[\w\-.%]+$/.test(v.trim().replace(/^https?:\/\//, ''))
      ? ''
      : 'Use format: linkedin.com/in/username',
};

type FieldKey = keyof typeof validators;

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function FieldLabel({ icon, children, hint }: { icon: React.ReactNode; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-200">
        <span className="text-[#10B981]">{icon}</span>
        {children}
      </label>
      {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
    </div>
  );
}

function InputError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-[11.5px] text-red-400 mt-1.5">
      <AlertCircle size={12} /> {message}
    </p>
  );
}

const inputBase =
  'w-full bg-slate-900/70 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2';

function inputClass(hasError?: boolean) {
  return hasError
    ? `${inputBase} border-red-500/60 focus:border-red-500 focus:ring-red-500/20`
    : `${inputBase} border-slate-700 focus:border-[#10B981] focus:ring-[#10B981]/20`;
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function PersonalInfoStep() {
  const router = useRouter();
  const isClient = useIsClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resumeData = useResumeStore((s) => s.resumeData);
  // ⚠️ Rename this selector if your store exposes a different update setter
  const setResumeData = useResumeStore((s) => s.setResumeData);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [photoError, setPhotoError] = useState('');

  const pi = resumeData?.personalInfo ?? {};

  const setField = (key: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [key]: value },
    });
  };

  const handleBlur = (key: FieldKey) => setTouched((t) => ({ ...t, [key]: true }));

  const errors = useMemo(() => {
    const out: Record<string, string> = {};
    (Object.keys(validators) as FieldKey[]).forEach((key) => {
      const msg = validators[key](String((pi as Record<string, string>)[key] ?? ''));
      if (msg) out[key] = msg;
    });
    return out;
  }, [pi]);

  const showError = (key: FieldKey) => (touched[key] ? errors[key] : undefined);

  /* ---------------------- Completion meter ------------------------ */
  const requiredFields = ['fullName', 'title', 'email', 'phone'] as const;
  const filledCount = requiredFields.filter((k) => String((pi as Record<string, string>)[k] ?? '').trim()).length;
  const linkedinFilled = String(pi.linkedin ?? '').trim().length > 0 ? 1 : 0;
  const photoFilled = String(pi.photoUrl ?? '').trim().length > 0 ? 1 : 0;
  const completion = Math.round(((filledCount + linkedinFilled + photoFilled) / 6) * 100);

  /* -------------------------- Photo -------------------------------- */
  const initials = (String(pi.fullName ?? 'Y N').trim() || 'Y N')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handlePhoto = (file?: File) => {
    setPhotoError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) return setPhotoError('Please choose an image file');
    if (file.size > 2 * 1024 * 1024) return setPhotoError('Image must be under 2 MB');
    const reader = new FileReader();
    reader.onload = () => setField('photoUrl', String(reader.result));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setField('photoUrl', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isFormValid = Object.keys(errors).length === 0;
  const canContinue = String(pi.fullName ?? '').trim().length >= 2 && String(pi.email ?? '').trim().length >= 3;

  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-pulse text-slate-400 text-sm">Loading personal info...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* ------------------------ Page header -------------------------- */}
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold rounded-full border border-[#10B981]/20">
          <Sparkles size={12} /> Step 2 of 5
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Let&apos;s start with <span className="text-[#10B981]">you</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          This goes at the top of every resume. Recruiters spend the first 6 seconds here — make it count.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ============================ FORM ============================ */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Photo + name row */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white">
              <User size={15} className="text-[#10B981]" /> Identity
            </h2>

            <div className="flex items-start gap-5">
              {/* Avatar upload */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-slate-600 hover:border-[#10B981] transition-colors bg-slate-800 flex items-center justify-center"
                >
                  {pi.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pi.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-slate-300">{initials}</span>
                  )}
                  <span className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={18} />
                  </span>
                </button>

                <div className="flex items-center gap-1">
                  {pi.photoUrl && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 size={11} /> Remove
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhoto(e.target.files?.[0])}
                />
                {photoError && <p className="text-[11px] text-red-400 text-center">{photoError}</p>}
              </div>

              {/* Name + title */}
              <div className="flex-1 space-y-4 min-w-0">
                <div>
                  <FieldLabel icon={<User size={13} />}>Full name *</FieldLabel>
                  <input
                    value={String(pi.fullName ?? '')}
                    onChange={(e) => setField('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Jordan Michaels"
                    className={inputClass(!!showError('fullName'))}
                  />
                  <InputError message={showError('fullName')} />
                </div>
                <div>
                  <FieldLabel icon={<Briefcase size={13} />} hint="Appears right under your name">
                    Professional title *
                  </FieldLabel>
                  <input
                    value={String(pi.title ?? '')}
                    onChange={(e) => setField('title', e.target.value)}
                    onBlur={() => handleBlur('title')}
                    placeholder="Product Designer"
                    className={inputClass(!!showError('title'))}
                  />
                  <InputError message={showError('title')} />
                </div>
              </div>
            </div>
          </section>

          {/* Contact section */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white">
              <Mail size={15} className="text-[#10B981]" /> Contact details
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel icon={<Mail size={13} />}>Email *</FieldLabel>
                <input
                  type="email"
                  value={String(pi.email ?? '')}
                  onChange={(e) => setField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="jordan@email.com"
                  className={inputClass(!!showError('email'))}
                />
                <InputError message={showError('email')} />
              </div>
              <div>
                <FieldLabel icon={<Phone size={13} />}>Phone *</FieldLabel>
                <input
                  type="tel"
                  value={String(pi.phone ?? '')}
                  onChange={(e) => setField('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+1 (555) 012-3456"
                  className={inputClass(!!showError('phone'))}
                />
                <InputError message={showError('phone')} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel icon={<Linkedin size={13} />} hint="Optional">
                  LinkedIn
                </FieldLabel>
                <input
                  value={String(pi.linkedin ?? '')}
                  onChange={(e) => setField('linkedin', e.target.value)}
                  onBlur={() => handleBlur('linkedin')}
                  placeholder="linkedin.com/in/jordanm"
                  className={inputClass(!!showError('linkedin'))}
                />
                <InputError message={showError('linkedin')} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel icon={<MapPin size={13} />} hint="Optional">
                  Location
                </FieldLabel>
                <input
                  value={String((pi as Record<string, string>).location ?? '')}
                  onChange={(e) => setField('location', e.target.value)}
                  placeholder="Brooklyn, NY"
                  className={inputClass(false)}
                />
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white">
              <FileText size={15} className="text-[#10B981]" /> Professional summary
              <span className="text-[11px] font-normal text-slate-500">— you can refine this later with AI</span>
            </h2>
            <textarea
              value={String(resumeData?.summary ?? '')}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              rows={4}
              maxLength={600}
              placeholder="2–3 sentences about who you are, your strongest skills, and the impact you've had…"
              className={`${inputBase} border-slate-700 focus:border-[#10B981] focus:ring-[#10B981]/20 resize-none leading-relaxed`}
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Keep it under 3 sentences for maximum impact.</span>
              <span>{String(resumeData?.summary ?? '').length}/600</span>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.push('/builder')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800/60 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all"
            >
              <ArrowLeft size={15} /> Back to templates
            </button>

            <button
              disabled={!canContinue}
              onClick={() => router.push('/builder/experience')}
              className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                canContinue
                  ? 'bg-[#10B981] text-slate-950 hover:bg-[#0EA5E9] shadow-lg shadow-[#10B981]/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue to experience <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ========================= LIVE PREVIEW ========================= */}
        <div className="lg:w-[400px] shrink-0">
          <div className="lg:sticky lg:top-8 space-y-4">
            {/* Completion card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Profile strength</span>
                <span className={`text-xs font-bold ${completion === 100 ? 'text-[#10B981]' : 'text-slate-400'}`}>
                  {completion}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#0EA5E9] transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                {[
                  { label: 'Name', done: String(pi.fullName ?? '').trim().length >= 2 },
                  { label: 'Title', done: String(pi.title ?? '').trim().length >= 2 },
                  { label: 'Email', done: String(pi.email ?? '').trim().length > 0 },
                  { label: 'Phone', done: String(pi.phone ?? '').trim().length > 0 },
                  { label: 'LinkedIn', done: String(pi.linkedin ?? '').trim().length > 0 },
                  { label: 'Photo', done: String(pi.photoUrl ?? '').trim().length > 0 },
                ].map((c) => (
                  <span
                    key={c.label}
                    className={`flex items-center gap-1 text-[10.5px] ${c.done ? 'text-[#10B981]' : 'text-slate-500'}`}
                  >
                    <Check size={10} strokeWidth={3} /> {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Live resume preview */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300">Live preview</span>
                <span className="flex items-center gap-1 text-[10px] text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" /> Auto-updating
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-white">
                <div
                  className="origin-top-left pointer-events-none select-none"
                  style={{ transform: 'scale(0.62)', width: 595 }}
                >
                  <DynamicTemplateRenderer data={{ ...resumeData, templateId: resumeData.templateId }} />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 text-center">
                Rendering your <span className="text-slate-300 font-medium">selected template</span> in real time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}