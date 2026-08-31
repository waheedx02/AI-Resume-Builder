'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles } from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import { TEMPLATES } from '@/lib/templates';
import DynamicTemplateRenderer from '@/components/templates/DynamicTemplateRenderer';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const PREVIEW_DATA = {
  personalInfo: {
    fullName: 'Jordan Michaels',
    title: 'Product Designer',
    email: 'jordan@email.com',
    phone: '+1 (555) 012-3456',
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
    { id: 'demo-edu-1', degree: 'BFA, Interaction Design', institution: 'Rhode Island School of Design', startDate: '2015', endDate: '2019' },
  ],
  skills: ['User research', 'Design systems', 'Prototyping', 'Figma', 'Cross-functional leadership'],
  tools: ['Figma, Sketch', 'React, HTML/CSS', 'Notion, Linear'],
  languages: ['English', 'Spanish'],
};

const CARD_WIDTH = 272;
const DOC_WIDTH = 595;
const SCALE = CARD_WIDTH / DOC_WIDTH;
const CROP_HEIGHT = 330;

export default function TemplatesStep() {
  const router = useRouter();
  const isClient = useIsClient();

  const resumeData = useResumeStore((state) => state.resumeData);
  const setTemplateId = useResumeStore((state) => state.setTemplateId);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-pulse text-slate-400 text-sm">Loading template gallery...</div>
      </div>
    );
  }

  const handleSelectTemplate = (id: string) => setTemplateId(id);
  const handleContinue = (id: string) => {
    setTemplateId(id);
    router.push('/builder/personal-info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold rounded-full border border-[#10B981]/20">
          <Sparkles size={12} /> Step 1 of 5
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Pick the layout your experience deserves
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Every template is ATS-friendly and built to fit one page. Switch anytime before you export.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {TEMPLATES.map((tmpl) => {
          const isSelected = resumeData.templateId === tmpl.id;
          const hasUserData = Boolean(resumeData.personalInfo?.fullName);

          return (
            <div
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl.id)}
              style={{ width: CARD_WIDTH }}
              className={`group relative flex flex-col bg-slate-900 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'border-[#10B981] ring-2 ring-[#10B981]/40 shadow-xl shadow-[#10B981]/10'
                  : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Crop window: fixed height, overflow-hidden — the resume fills it edge to edge */}
              <div className="relative bg-white overflow-hidden" style={{ height: CROP_HEIGHT }}>
                <div
                  className="origin-top-left pointer-events-none select-none"
                  style={{ transform: `scale(${SCALE})`, width: DOC_WIDTH }}
                >
                  <DynamicTemplateRenderer
                    data={{
                      ...resumeData,
                      templateId: tmpl.id,
                      personalInfo: hasUserData ? resumeData.personalInfo : PREVIEW_DATA.personalInfo,
                      summary: resumeData.summary || PREVIEW_DATA.summary,
                      experience: resumeData.experience?.length > 0 ? resumeData.experience : PREVIEW_DATA.experience,
                      education: resumeData.education?.length > 0 ? resumeData.education : PREVIEW_DATA.education,
                      skills: resumeData.skills?.length > 0 ? resumeData.skills : PREVIEW_DATA.skills,
                      tools: resumeData.tools?.length ? resumeData.tools : PREVIEW_DATA.tools,
                      languages: resumeData.languages?.length ? resumeData.languages : PREVIEW_DATA.languages,
                    }}
                  />
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#10B981] text-slate-950 font-bold px-2.5 py-1 rounded-full text-[11px] shadow-md flex items-center gap-1">
                    <Check size={12} strokeWidth={3} /> Selected
                  </div>
                )}
                {tmpl.badge && (
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-slate-200 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {tmpl.badge}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#10B981] transition mb-1">{tmpl.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleContinue(tmpl.id); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#10B981] text-slate-950 hover:bg-[#0EA5E9]'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isSelected ? 'Continue with this template' : 'Select template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}