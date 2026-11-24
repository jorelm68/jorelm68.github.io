'use client';

import { useSearchParams } from 'next/navigation';
import { CONNECTOR_APPS, consentLink, isAuthorizationId } from '@/lib/connectors';

export default function ConsentChooser() {
  const authorizationId = useSearchParams().get('authorization_id');

  if (!isAuthorizationId(authorizationId)) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold">This page opens by itself</h1>
        <p className="text-sm text-neutral-600">
          It appears when you connect Claude to one of my apps. Start from Claude&apos;s connector settings instead.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-2xl font-semibold">Connect Claude to which app?</h1>
      <p className="text-sm text-neutral-600">
        You will be asked to approve it on the next screen. Nothing is shared until you do.
      </p>
      <div className="flex flex-col gap-3">
        {CONNECTOR_APPS.map((app) => (
          <a
            key={app.name}
            href={consentLink(app, authorizationId)}
            className="rounded-lg border border-neutral-300 px-4 py-3 transition hover:border-neutral-900 hover:bg-neutral-50"
          >
            <span className="block font-medium">{app.name}</span>
            <span className="block text-sm text-neutral-600">{app.blurb}</span>
          </a>
        ))}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 bg-white px-5 py-10 text-neutral-900">
      {children}
    </main>
  );
}
