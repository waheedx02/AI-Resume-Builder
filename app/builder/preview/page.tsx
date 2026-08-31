// app/builder/preview/page.tsx
'use client';

import { useResumeStore } from '@/lib/resume-store';
import DynamicTemplateRenderer from '@/components/templates/DynamicTemplateRenderer';

export default function PreviewStep() {
  const { resumeData, setTemplateId } = useResumeStore((state) => ({
    resumeData: state.resumeData,
    setTemplateId: state.setTemplateId,
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Top Toolbar (Hidden when printing) */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded print:hidden">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Switch Template:</label>
          <select
            value={resumeData.templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="template-1">Minimalist Layout</option>
            <option value="template-2">Modern Layout</option>
          </select>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Download / Print PDF
        </button>
      </div>

      {/* Printable Resume Container */}
      <div className="border shadow-lg rounded bg-white print:border-none print:shadow-none">
        <DynamicTemplateRenderer data={resumeData} />
      </div>
    </div>
  );
}