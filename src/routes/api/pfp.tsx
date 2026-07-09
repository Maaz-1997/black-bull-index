import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@cf-wasm/og";
import { PfpImage, parseCardParams, buildFallbackSvg } from "@/lib/og-card";

// 1000×1000 PFP (avatar) PNG. Server-only; falls back to a static SVG on render failure.
export const Route = createFileRoute("/api/pfp")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = parseCardParams(new URL(request.url).searchParams);
        try {
          return await ImageResponse.async(<PfpImage {...params} />, {
            width: 1000,
            height: 1000,
            format: "png",
            fonts: [],
            headers: {
              "content-type": "image/png",
              "cache-control": "public, max-age=3600, s-maxage=86400",
            },
          });
        } catch (err) {
          console.error("pfp: render failed", err);
          return new Response(buildFallbackSvg(params), {
            headers: { "content-type": "image/svg+xml; charset=utf-8" },
          });
        }
      },
    },
  },
});
