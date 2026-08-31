// app/builder/personal-info/page.tsx
'use client';

import { useResumeStore } from '@/lib/resume-store';

export default function PersonalInfoStep() {
  // Pulling state properties individually creates stable references
  const personalInfo = useResumeStore((state) => state.resumeData.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={personalInfo?.fullName || ''}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            className="w-full p-2 border rounded border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={personalInfo?.email || ''}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="w-full p-2 border rounded border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="text"
            placeholder="+1 (555) 000-0000"
            value={personalInfo?.phone || ''}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className="w-full p-2 border rounded border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile</label>
          <input
            type="text"
            placeholder="linkedin.com/in/johndoe"
            value={personalInfo?.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            className="w-full p-2 border rounded border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}