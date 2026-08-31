// app/templates/page.tsx
'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/lib/resume-store';
import { TEMPLATES } from '@/lib/templates';
import DynamicTemplateRenderer from '@/components/templates/DynamicTemplateRenderer';

// Helper to check client-side mounting without triggering React linter rules
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const isClient = useIsClient();

  const resumeData = useResumeStore((state) => state.resumeData);
  const setTemplateId = useResumeStore((state) => state.setTemplateId);

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id);
    router.push('/builder/personal-info');
  };

  // Render loading state or skeleton on server/initial pass to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Choose Your Resume Template
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Select a layout to get started. You can change your template anytime while building.
        </p>
      </div>

      {/* Grid of Templates */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {TEMPLATES.map((tmpl) => {
          const isSelected = resumeData.templateId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              className={`flex flex-col bg-white rounded-xl shadow-sm border transition duration-200 overflow-hidden hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-600 border-transparent' : 'border-slate-200'
              }`}
            >
              {/* Scaled Live Template Preview Box */}
              <div className="bg-slate-100 p-4 relative h-[380px] overflow-hidden border-b border-slate-200">
                <div className="transform scale-[0.45] origin-top h-[850px] w-[600px] mx-auto pointer-events-none select-none bg-white shadow rounded">
                  <DynamicTemplateRenderer
                    data={{
                      ...resumeData,
                      templateId: tmpl.id,
                      personalInfo: {
                        fullName: resumeData.personalInfo?.fullName || 'Jane Doe',
                        email: resumeData.personalInfo?.email || 'jane.doe@example.com',
                        phone: resumeData.personalInfo?.phone || '+1 (555) 000-0000',
                        linkedin: resumeData.personalInfo?.linkedin || 'linkedin.com/in/janedoe',
                        website: 'janedoe.dev',
                      },
                      summary:
                        resumeData.summary ||
                        'Experienced Senior Software Engineer specializing in modern frontend architecture, TypeScript, and full-stack AI integration.',
                      experience:
                        resumeData.experience?.length > 0
                          ? resumeData.experience
                          : [
                              {
                                id: 'demo-1',
                                role: 'Senior Frontend Developer',
                                company: 'TechCorp Inc.',
                                startDate: '2021',
                                endDate: 'Present',
                                description:
                                  'Led frontend architecture using Next.js and TypeScript, increasing user engagement by 35%.',
                              },
                            ],
                    }}
                  />
                </div>
              </div>

              {/* Template Information & Action Button */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{tmpl.name}</h2>
                    {tmpl.badge && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {tmpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-6">{tmpl.description}</p>
                </div>

                <button
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition ${
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? 'Continue with Selected Template' : 'Use This Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}