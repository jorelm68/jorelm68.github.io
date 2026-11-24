import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConsentChooser from '@/components/ConsentChooser';

// Where the shared Supabase project sends someone who is connecting Claude to one of
// my apps (Site URL + Authorization Path = this page). The request does not say which
// app it is for, so this page asks, then passes the same authorization id to that app's
// own consent screen. It never sees a sign-in, token or approval: it only links on.
export const metadata: Metadata = {
  title: 'Connect Claude',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default function ConsentPage() {
  return (
    <Suspense fallback={null}>
      <ConsentChooser />
    </Suspense>
  );
}
