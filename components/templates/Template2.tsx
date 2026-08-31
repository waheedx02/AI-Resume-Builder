import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { ResumeData } from '../../types/resume';

export default function Template2({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary, education, skills, languages } = data;

  const initials = (personalInfo.fullName || 'Y N')
    .split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[1050px] flex text-[12.5px]">
      <aside className="w-[34%] bg-slate-800 text-slate-200 p-6 flex flex-col gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-600 mx-auto flex items-center justify-center overflow-hidden border-4 border-slate-500">
          {personalInfo.photoUrl ? (
            <Image src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" width={96} height={96} />
          ) : (
            <span className="text-2xl font-bold text-white">{initials}</span>
          )}
        </div>

        <div>
          <h2 className="text-[11px] font-bold tracking-wider text-white bg-blue-700 inline-block px-2.5 py-1 rounded mb-3">
            CONTACT ME
          </h2>
          <div className="space-y-2 text-[11.5px]">
            {personalInfo.phone && (
              <div className="flex items-center gap-2"><Phone size={12} className="text-blue-400 shrink-0" /><span className="break-all">{personalInfo.phone}</span></div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2"><Mail size={12} className="text-blue-400 shrink-0" /><span className="break-all">{personalInfo.email}</span></div>
            )}
          </div>
        </div>

        {skills?.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold tracking-wider text-white bg-blue-700 inline-block px-2.5 py-1 rounded mb-3">
              SKILLS
            </h2>
            <ul className="space-y-1 text-[11.5px] text-slate-300">
              {skills.map((s, i) => <li key={i} className="flex gap-1.5"><span className="text-blue-400">›</span>{s}</li>)}
            </ul>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold tracking-wider text-white bg-blue-700 inline-block px-2.5 py-1 rounded mb-3">
              LANGUAGES
            </h2>
            <ul className="space-y-1 text-[11.5px] text-slate-300">
              {languages.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        )}
      </aside>

      <main className="w-[66%] p-7">
        <header className="mb-6">
          <h1 className="text-[26px] font-extrabold leading-tight">
            <span className="text-slate-900">{(personalInfo.fullName || 'Your Name').split(' ')[0]} </span>
            <span className="text-blue-700">{(personalInfo.fullName || '').split(' ').slice(1).join(' ')}</span>
          </h1>
          {personalInfo.title && (
            <p className="text-slate-500 font-medium mt-0.5 tracking-wide">{personalInfo.title}</p>
          )}
        </header>

        {summary && (
          <section className="mb-6">
            <h2 className="text-[12px] font-bold tracking-wider text-white bg-slate-800 inline-block px-3 py-1 rounded mb-3">
              ABOUT ME
            </h2>
            <p className="text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[12px] font-bold tracking-wider text-white bg-slate-800 inline-block px-3 py-1 rounded mb-3">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-100 pl-3.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-blue-700 text-[11.5px] font-medium mb-1">{exp.company}</p>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-600">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold tracking-wider text-white bg-slate-800 inline-block px-3 py-1 rounded mb-3">
              EDUCATION
            </h2>
            <div className="space-y-2.5">
              {education.map((ed) => (
                <div key={ed.id} className="border-l-2 border-blue-100 pl-3.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{ed.degree}</h3>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{ed.startDate} - {ed.endDate}</span>
                  </div>
                  <p className="text-slate-500 text-[11.5px]">{ed.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}