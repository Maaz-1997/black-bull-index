// Client-only: turn the static OG card PNG into a short, looping GIF with a molten-gold sweep,
// then download it so the user can attach it to a tweet as media (X animates uploaded media, not
// link-preview og:image). Loaded via dynamic import so gifenc/canvas stay out of the reveal bundle.
import { GIFEncoder, quantize, applyPalette } from "gifenc";

const FRAMES = 16;
const FRAME_DELAY_MS = 70;
const TARGET_WIDTH = 600; // downscale for a reasonable GIF size

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // same-origin card; keeps the canvas untainted
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("card image failed to load"));
    img.src = src;
  });
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function downloadAnimatedCard(pngUrl: string, filename: string): Promise<void> {
  const img = await loadImage(pngUrl);
  const w = TARGET_WIDTH;
  const h = Math.max(1, Math.round((img.height / img.width) * w)) || 315;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas context unavailable");

  const gif = GIFEncoder();

  for (let i = 0; i < FRAMES; i++) {
    const p = i / FRAMES;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    // Diagonal gold shimmer sweeping left→right across the loop.
    const x = -w + p * (2 * w);
    const grad = ctx.createLinearGradient(x, 0, x + w * 0.55, h);
    grad.addColorStop(0, "rgba(244,215,138,0)");
    grad.addColorStop(0.5, "rgba(244,215,138,0.22)");
    grad.addColorStop(1, "rgba(244,215,138,0)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";

    const { data } = ctx.getImageData(0, 0, w, h);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, w, h, { palette, delay: FRAME_DELAY_MS });
  }

  gif.finish();
  triggerDownload(new Blob([gif.bytes()], { type: "image/gif" }), filename);
}
