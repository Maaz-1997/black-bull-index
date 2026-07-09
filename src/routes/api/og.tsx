import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@cf-wasm/og";
import { CardImage, parseCardParams, buildFallbackSvg } from "@/lib/og-card";

// Shareable card image (1200×630 PNG) — the ad that unfurls on X. Rendered from query params so a
// crawler never triggers an analysis. Deterministic; on any render failure returns a static SVG
// fallback rather than a broken image. Server-only (Nitro/workerd); @cf-wasm/og stays off the client.
export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = parseCardParams(new URL(request.url).searchParams);
        try {
          return await ImageResponse.async(<CardImage {...params} />, {
            width: 1200,
            height: 630,
            format: "png",
            // Empty array → @cf-wasm/og uses its bundled Noto Sans as the default.
            fonts: [],
            headers: {
              "content-type": "image/png",
              "cache-control": "public, max-age=3600, s-maxage=86400",
            },
          });
        } catch (err) {
          console.error("og: PNG render failed, serving SVG fallback", err);
          return new Response(buildFallbackSvg(params), {
            headers: { "content-type": "image/svg+xml; charset=utf-8" },
          });
        }
      },
    },
  },
});
