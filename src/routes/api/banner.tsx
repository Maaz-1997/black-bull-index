import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@cf-wasm/og";
import { BannerImage, parseCardParams, buildFallbackSvg } from "@/lib/og-card";
import { BULL_DATA_URI } from "@/lib/bull-asset";

// 1500×500 X header banner PNG. Server-only; falls back to a static SVG on render failure.
export const Route = createFileRoute("/api/banner")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = parseCardParams(new URL(request.url).searchParams);
        try {
          return await ImageResponse.async(<BannerImage {...params} bull={BULL_DATA_URI} />, {
            width: 1500,
            height: 500,
            format: "png",
            fonts: [],
            headers: {
              "content-type": "image/png",
              "cache-control": "public, max-age=3600, s-maxage=86400",
            },
          });
        } catch (err) {
          console.error("banner: render failed", err);
          return new Response(buildFallbackSvg(params), {
            headers: { "content-type": "image/svg+xml; charset=utf-8" },
          });
        }
      },
    },
  },
});
