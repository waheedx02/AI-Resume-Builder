import { Mail, Phone } from 'lucide-react';
import { ResumeData } from '../../types/resume';

export default function Template1({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary, education, skills, tools, languages } = data;

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[1050px] p-9 text-[13px] leading-relaxed">
      <header className="flex items-start justify-between border-b border-slate-200 pb-4 mb-5">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900 leading-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p className="text-blue-700 font-medium text-[14px] mt-0.5">{personalInfo.title}</p>
          )}
        </div>
        <div className="text-right text-[11.5px] text-slate-600 space-y-1 pt-1">
          {personalInfo.phone && (
            <div className="flex items-center justify-end gap-1.5">
              <span>{personalInfo.phone}</span><Phone size={12} className="text-blue-700" />
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center justify-end gap-1.5">
              <span>{personalInfo.email}</span><Mail size={12} className="text-blue-700" />
            </div>
          )}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-slate-700">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900">
                    {exp.role} <span className="font-normal text-slate-500">| {exp.company}</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700">
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            SKILLS
          </h2>
          <ul className="list-disc list-outside ml-4 grid grid-cols-2 gap-x-6 gap-y-0.5 text-slate-700">
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      )}

      {tools && tools.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            TOOLS & TECHNOLOGIES
          </h2>
          <ul className="list-disc list-outside ml-4 grid grid-cols-2 gap-x-6 gap-y-0.5 text-slate-700">
            {tools.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            EDUCATION
          </h2>
          <div className="space-y-1.5">
            {education.map((ed) => (
              <div key={ed.id} className="flex justify-between">
                <div>
                  <span className="font-semibold text-slate-900">{ed.degree}</span>
                  <span className="text-slate-600"> — {ed.institution}</span>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                  {ed.startDate} - {ed.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-[13px] font-bold tracking-wide text-blue-800 border-b-2 border-blue-800/20 pb-1 mb-2.5">
            LANGUAGES
          </h2>
          <p className="text-slate-700">{languages.join('  •  ')}</p>
        </section>
      )}
    </div>
  );
}