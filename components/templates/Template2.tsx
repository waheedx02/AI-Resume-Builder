import Image from 'next/image';
import { Mail, Phone, CircleUserRound } from 'lucide-react';
import { ResumeData } from '../../types/resume';

/* ------------------------------------------------------------------ */
/*  Sidebar section heading — small, tracked-out, with accent bar      */
/* ------------------------------------------------------------------ */
function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300 mb-2.5">
      <span className="h-[2px] w-4 rounded-full bg-blue-400" />
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section heading for the right column                          */
/* ------------------------------------------------------------------ */
function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-800 mb-2.5">
      <span className="h-[3px] w-5 rounded-full bg-blue-700" />
      {children}
    </h2>
  );
}

export default function Template2({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary, education, skills, languages } = data;

  const safeLanguages = languages ?? [];

  const firstName = personalInfo?.firstName || 'Your';
  const lastName = personalInfo?.lastName || 'Name';

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

  const contactItems = [
    personalInfo?.mobile && { icon: <Phone size={12} />, text: personalInfo.mobile },
    personalInfo?.email && { icon: <Mail size={12} />, text: personalInfo.email },
    personalInfo?.linkedin && { icon: <CircleUserRound size={12} />, text: personalInfo.linkedin },
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[1050px] flex">
      {/* -------------------------- Sidebar --------------------------- */}
      <aside className="w-[34%] bg-slate-800 text-slate-200 p-7 flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-slate-600 border-4 border-blue-600 overflow-hidden flex items-center justify-center">
            {personalInfo?.profilePicUrl ? (
              <Image
                src={personalInfo.profilePicUrl}
                alt={`${firstName} ${lastName}`.trim() || 'Profile photo'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white">{initials}</span>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Resume</p>
        </div>

        {/* Contact */}
        {contactItems.length > 0 && (
          <div>
            <SidebarHeading>Contact</SidebarHeading>
            <div className="space-y-2 text-[11.5px]">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 break-all">
                  <span className="text-blue-400 shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <SidebarHeading>Skills</SidebarHeading>
            <ul className="space-y-1.5 text-[11.5px] text-slate-300">
              {skills.map((s, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-blue-400">›</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {safeLanguages.length > 0 && (
          <div>
            <SidebarHeading>Languages</SidebarHeading>

            <ul className="space-y-1 text-[11.5px] text-slate-300">
              {safeLanguages.map((l, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-blue-400">›</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* -------------------------- Main ------------------------------ */}
      <main className="w-[66%] p-7 space-y-6">
        {/* Header */}
        <header className="mb-2">
          <h1 className="text-[26px] font-extrabold leading-tight text-slate-900">
            <span className="text-slate-900">{firstName}</span>{' '}
            <span className="text-blue-700">{lastName}</span>
          </h1>
          {personalInfo?.title && (
            <p className="text-slate-500 font-medium mt-0.5 tracking-wide">{personalInfo.title}</p>
          )}
          <div className="mt-3 flex items-center">
            <span className="h-[3px] w-16 rounded-full bg-blue-700" />
            <span className="flex-1 border-t border-slate-200" />
          </div>
        </header>

        {/* About */}
        {summary && (
          <section className="mb-6">
            <MainHeading>About Me</MainHeading>
            <p className="text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="mb-6">
            <MainHeading>Experience</MainHeading>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-100 pl-3.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-700 text-[11.5px] font-medium">{exp.company}</p>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section className="mb-6">
            <MainHeading>Education</MainHeading>
            <div className="space-y-2.5">
              {education.map((ed) => (
                <div key={ed.id} className="border-l-2 border-blue-100 pl-3.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{ed.degree}</h3>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {ed.startDate} – {ed.endDate}
                    </span>
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