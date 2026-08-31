// app/builder/ai-summary/page.tsx
'use client';

import { useState } from 'react';
import { useResumeStore } from '../../../lib/resume-store';

export default function AISummaryStep() {
  const { resumeData, setSummary } = useResumeStore((state) => ({
    resumeData: state.resumeData,
    setSummary: state.setSummary,
  }));

  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience,
          targetRole,
        }),
      });

      const data = await res.json();
      if (data.summaries) {
        setOptions(data.summaries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">AI Professional Summary</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Target Job Role / Title</label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Frontend Engineer"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Options'}
        </button>
      </div>

      {/* Options Selection */}
      {options.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Select an AI Summary:</h3>
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => setSummary(option)}
              className={`p-4 border rounded cursor-pointer transition ${
                resumeData.summary === option ? 'border-blue-600 bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <p className="text-sm">{option}</p>
            </div>
          ))}
        </div>
      )}

      {/* Editable Final Summary */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Selected / Current Summary</label>
        <textarea
          rows={4}
          value={resumeData.summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Choose an option above or type your own summary..."
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}