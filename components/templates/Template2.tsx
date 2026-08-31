import { ResumeData } from '../../types/resume';

export default function Template2({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary } = data;

  return (
    <div className="p-8 bg-white text-slate-800 shadow-md min-h-[1050px] font-serif">
      {/* Centered Modern Header */}
      <header className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-slate-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          {[personalInfo.email, personalInfo.phone, personalInfo.linkedin].filter(Boolean).join(' • ')}
        </p>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-md font-bold uppercase tracking-wider text-slate-900 mb-2">Professional Profile</h2>
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-md font-bold uppercase tracking-wider text-slate-900 mb-3">Work History</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-200 pl-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.role} <span className="font-normal text-slate-500">at {exp.company}</span></h3>
                  <span className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm mt-1 text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}