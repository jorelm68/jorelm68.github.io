'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CONNECTOR_APPS, consentLink, isAuthorizationId, type ConnectorApp } from '@/lib/connectors';
import { NonozempicMark, NonozempicWordmark, ParlineMark, ParlineWordmark } from '@/components/BrandMarks';

export default function ConsentChooser() {
  const authorizationId = useSearchParams().get('authorization_id');

  if (!isAuthorizationId(authorizationId)) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold tracking-tight">This page opens by itself</h1>
        <p className="text-[15px] leading-relaxed text-neutral-600">
          It appears when you connect Claude to one of my apps. Start from Claude&apos;s connector settings instead.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Connect Claude</p>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-balance">
          Which app should Claude connect to?
        </h1>
        <p className="text-[15px] leading-relaxed text-neutral-600">
          Pick one. You approve the connection on the next screen, and nothing is shared until you do.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {CONNECTOR_APPS.map((app) => (
          <AppCard key={app.name} app={app} href={consentLink(app, authorizationId)} />
        ))}
      </div>

      <p className="text-center text-xs text-neutral-500">
        You can revoke access any time from inside each app.
      </p>
    </Shell>
  );
}

function AppCard({ app, href }: { app: ConnectorApp; href: string }) {
  const parline = app.brand === 'parline';
  return (
    <a
      href={href}
      style={{ ['--accent' as string]: app.accent }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />
      <span className="shrink-0 pl-1.5">{parline ? <ParlineMark size={52} /> : <NonozempicMark size={52} />}</span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="sr-only">{app.name}</span>
        {parline ? <ParlineWordmark /> : <NonozempicWordmark />}
        <span className="text-sm text-neutral-600">{app.blurb}</span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-5 shrink-0 text-neutral-400 transition duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </a>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 px-5 py-10 text-neutral-900">
      <div className="flex w-full max-w-md flex-col gap-7 rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-xl shadow-neutral-900/5 backdrop-blur sm:p-8">
        {children}
      </div>
    </main>
  );
}
