'use client';

import { ProgressProvider } from '@bprogress/next/app';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider
      height="3px"
      color="#2DD4BF"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}