'use client';

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { Check, Search, Sparkles, ChevronRight, FileText } from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import { resumeTemplates } from '@/lib/templates';
import { useBuilderStep } from '@/lib/steps';
import DynamicTemplateRenderer from '@/components/templates/DynamicTemplateRenderer';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 272;
const DOC_WIDTH = 595;
const CROP_HEIGHT = 330;
const SCALE = CARD_WIDTH / DOC_WIDTH;

const PREVIEW_DATA = {
  personalInfo: {
    firstName: 'Jordan',
    lastName: 'Michaels',
    title: 'Product Designer',
    email: 'jordan@email.com',
    mobile: '+1 (555) 012-3456',
    linkedin: 'linkedin.com/in/jordanm',
  },
  summary:
    'Product designer with 5 years shaping data-heavy tools for fast-growing teams, focused on turning complex workflows into interfaces people enjoy using.',
  experience: [
    {
      id: 'demo-1',
      role: 'Senior Product Designer',
      company: 'Northwind Labs',
      startDate: '2022',
      endDate: 'Present',
      description:
        'Led design for the core analytics dashboard, cutting time-to-insight by 35%.\nPartnered with engineering to ship a new design system used across 6 product teams.',
    },
    {
      id: 'demo-2',
      role: 'Product Designer',
      company: 'Fieldstone',
      startDate: '2019',
      endDate: '2022',
      description: 'Owned onboarding redesign that lifted activation rate by 18%.',
    },
    {
      id: 'demo-3',
      role: 'Junior Designer',
      company: 'Halberd Studio',
      startDate: '2017',
      endDate: '2019',
      description: 'Supported visual design for client web projects across 8 industries.',
    },
  ],
  education: [
    {
      id: 'demo-edu-1',
      degree: 'BFA, Interaction Design',
      institution: 'Rhode Island School of Design',
      startDate: '2015',
      endDate: '2019',
    },
  ],
  skills: ['User research', 'Design systems', 'Prototyping', 'Figma', 'Cross-functional leadership'],
  tools: ['Figma, Sketch', 'React, HTML/CSS', 'Notion, Linear'],
  languages: ['English', 'Spanish'],
};

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TemplatesStep() {
  const router = useRouter();
  const isClient = useIsClient();

  const resumeData = useResumeStore((state) => state.resumeData);
  const setTemplateId = useResumeStore((state) => state.setTemplateId);
  const { index, total } = useBuilderStep();

  const [query, setQuery] = useState('');
  const [entering, setEntering] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 50);
    return () => clearTimeout(t);
  }, []);

  /* Filter templates by search query */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resumeTemplates;
    return resumeTemplates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [query]);

  const handleSelectTemplate = useCallback((id: string) => setTemplateId(id), [setTemplateId]);

  const handleContinue = useCallback(
    (id: string) => {
      setTemplateId(id);
      router.push('/builder/personal-info');
    },
    [setTemplateId, router],
  );

  /* -------------------------------------------------------------- */
  /*  Loading skeleton                                               */
  /* -------------------------------------------------------------- */
  if (!isClient) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="h-8 w-2/3 mx-auto bg-slate-800/60 rounded-lg animate-pulse" />
          <div className="h-4 w-1/2 mx-auto bg-slate-800/40 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden"
            >
              <div className="h-[330px] bg-slate-800/30 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-full bg-slate-800/60 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-slate-800/60 rounded animate-pulse" />
                <div className="h-10 w-full bg-slate-800 rounded-xl animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  Main render                                                    */
  /* -------------------------------------------------------------- */
  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      {/* ---------- Header ---------- */}
      <div className="text-center space-y-4 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full border border-teal-400/20">
          <Sparkles size={12} /> Step {index + 1} of {total}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Pick the layout your experience deserves
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Every template is ATS-friendly and built to fit one page. Switch anytime before you export.
        </p>
      </div>

      {/* ---------- Search ---------- */}
      <div className="relative max-w-sm mx-auto mb-10">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition"
        />
      </div>

      {/* ---------- Grid ---------- */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FileText className="mx-auto mb-3 text-slate-700" size={32} />
          <p className="text-sm">No templates match &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {filtered.map((tmpl, idx) => {
            const isSelected = resumeData.templateId === tmpl.id;
            const hasUserData = Boolean(resumeData.personalInfo?.firstName || resumeData.experience?.length || resumeData.skills?.length);
            const previewData = {
              ...resumeData,
              templateId: tmpl.id,
              personalInfo: hasUserData ? resumeData.personalInfo : PREVIEW_DATA.personalInfo,
              summary: resumeData.summary || PREVIEW_DATA.summary,
              experience:
                resumeData.experience?.length > 0 ? resumeData.experience : PREVIEW_DATA.experience,
              education: resumeData.education?.length > 0 ? resumeData.education : PREVIEW_DATA.education,
              skills: resumeData.skills?.length > 0 ? resumeData.skills : PREVIEW_DATA.skills,
              tools: resumeData.tools?.length ? resumeData.tools : PREVIEW_DATA.tools,
              languages: resumeData.languages?.length ? resumeData.languages : PREVIEW_DATA.languages,
            };

            return (
              <div
                key={tmpl.id}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Select ${tmpl.name} template`}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onClick={() => handleSelectTemplate(tmpl.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectTemplate(tmpl.id);
                  }
                }}
                className={`group relative flex flex-col bg-slate-900 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 ${
                  isSelected
                    ? 'border-teal-400 ring-2 ring-teal-400/40 shadow-xl shadow-teal-400/10'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
                style={{
                  width: CARD_WIDTH,
                  animation: entering
                    ? `fadeInUp 0.5s ease ${idx * 0.08}s both`
                    : undefined,
                }}
              >
                {/* Preview crop window */}
                <div
                  className="relative bg-white overflow-hidden"
                  style={{ height: CROP_HEIGHT }}
                >
                  <div
                    className="origin-top-left pointer-events-none select-none"
                    style={{ transform: `scale(${SCALE})`, width: DOC_WIDTH }}
                  >
                    <DynamicTemplateRenderer data={previewData} />
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-[#0B132B] text-teal-400 font-bold px-2.5 py-1 rounded-full text-[11px] shadow-md flex items-center gap-1">
                      <Check size={12} strokeWidth={3} /> Selected
                    </div>
                  )}
                  {tmpl.badge && (
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-slate-200 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {tmpl.badge}
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3
                      className={`text-base font-bold mb-1 transition-colors ${
                        isSelected ? 'text-teal-400' : 'text-white group-hover:text-teal-400'
                      }`}
                    >
                      {tmpl.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContinue(tmpl.id);
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 hover:bg-[#0EA5E9] hover:text-white'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Continue' : 'Select template'}
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- Keyframes ---------- */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}