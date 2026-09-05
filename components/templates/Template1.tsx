import { Mail, Phone, CircleUserRound } from 'lucide-react';

import { ResumeData } from '../../types/resume';

/* ------------------------------------------------------------------ */
/*  Reusable section heading — keeps every section visually aligned    */
/* ------------------------------------------------------------------ */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-900 mb-2.5">
      <span className="h-[3px] w-5 rounded-full bg-blue-700" />
      {children}
      <span className="flex-1 border-t border-blue-200" />
    </h2>
  );
}

export default function Template1({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary, education, skills, tools, languages } = data;

  const fullName = [personalInfo?.firstName, personalInfo?.lastName]
    .filter(Boolean)
    .join(' ');

  const contactItems = [
    personalInfo?.mobile && { icon: <Phone size={11} />, text: personalInfo.mobile },
    personalInfo?.email && { icon: <Mail size={11} />, text: personalInfo.email },
    personalInfo?.linkedin && { icon: <CircleUserRound size={11} />, text: personalInfo.linkedin },
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[1050px] p-9 text-[13px] leading-relaxed">
      {/* ---------------------------- Header ---------------------------- */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[27px] font-bold text-slate-900 leading-tight tracking-tight">
              {fullName || 'Your Name'}
            </h1>
            {personalInfo?.title && (
              <p className="text-blue-700 font-semibold text-[14px] mt-0.5 tracking-wide uppercase text-[12px]">
                {personalInfo.title}
              </p>
            )}
          </div>

          {contactItems.length > 0 && (
            <div className="text-right text-[11px] text-slate-600 space-y-1 pt-1">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center justify-end gap-1.5">
                  <span className="text-blue-700">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accent rule under the header */}
        <div className="mt-4 flex items-center">
          <span className="h-[3px] w-16 rounded-full bg-blue-700" />
          <span className="flex-1 border-t border-slate-200" />
        </div>
      </header>

      {/* --------------------------- Summary ---------------------------- */}
      {summary && (
        <section className="mb-5">
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-slate-700 text-[12.5px] leading-relaxed">{summary}</p>
        </section>
      )}

      {/* ------------------------- Experience --------------------------- */}
      {experience?.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-4">
                {/* Timeline dot + line */}
                <span className="absolute left-0 top-[6px] h-[7px] w-[7px] rounded-full bg-blue-700" />
                <span className="absolute left-[3px] top-[16px] bottom-0 w-px bg-blue-100" />

                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-[13px]">
                    {exp.role} <span className="text-slate-500 font-normal">· {exp.company}</span>
                  </h3>
                  <span className="text-[10.5px] text-slate-500 whitespace-nowrap font-medium">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>

                {exp.description && (
                  <ul className="mt-1 space-y-0.5 text-slate-700">
                    {exp.description
                      .split('\n')
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-blue-600 mt-[2px]">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* -------------------------- Education --------------------------- */}
      {education?.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-2">
            {education.map((ed) => (
              <div key={ed.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900">{ed.degree}</span>
                  <span className="text-slate-600"> — {ed.institution}</span>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                  {ed.startDate} – {ed.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------- Skills ---------------------------- */}
      {skills?.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span
                key={i}
                className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-[3px] text-[11px] font-medium text-blue-900"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ----------------------- Tools & Laugauges --------------------------- */}
      {(tools?.length ?? 0) > 0 && (
        <section className="mb-5">
          <SectionTitle>Tools & Technologies</SectionTitle>
          <p className="text-slate-700">{tools?.join(" · ")}</p>
        </section>
      )}

      {(languages?.length ?? 0) > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-slate-700">{languages?.join(" · ")}</p>
        </section>
      )}
    </div>
  );
}