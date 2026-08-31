import { ResumeData } from '../../types/resume';

export default function Template1({ data }: { data: ResumeData }) {
  const { personalInfo, experience, summary } = data;

  return (
    <div className="p-8 bg-white text-gray-800 shadow-md min-h-[1050px] font-sans">
      {/* Header */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm text-gray-600 flex gap-4 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-700">Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-700">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-md">{exp.role}</h3>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm text-gray-600 italic">{exp.company}</p>
                <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}