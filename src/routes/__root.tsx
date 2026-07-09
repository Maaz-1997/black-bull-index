import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
          404 · off the chain
        </div>
        <h1 className="mt-6 font-display text-[64px] leading-none tracking-[-0.04em] gold-shimmer">
          Not found
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">
          This page isn't on the Index. It may have moved, or it never existed.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex h-11 items-center justify-center rounded-full border border-white/[0.1] px-6 text-[13px] text-white/80 transition hover:bg-white/[0.05]"
        >
          Read a wallet
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          The chain
        </div>
        <h1 className="mt-6 font-display text-[36px] leading-tight tracking-[-0.02em] text-white/90">
          This page didn't load
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">
          Something broke in the trenches. Try again, or head back home.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#f4d78a] via-[#d8b15a] to-[#b98a2d] px-6 text-[13px] font-medium text-[#1a0f00] transition-transform hover:-translate-y-[1px]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.1] px-6 text-[13px] text-white/80 transition hover:bg-white/[0.05]"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Black Bull Index — Read the chain. Reveal the myth." },
      {
        name: "description",
        content:
          "Every wallet is a memoir written in transactions. Paste any Solana address and the Black Bull Index reveals your on-chain identity — public on-chain data, publicly ranked, no wallet connection.",
      },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "The Black Bull Index" },
      {
        property: "og:description",
        content:
          "Every wallet is a memoir written in transactions. We read the chain and reveal who you truly are.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
