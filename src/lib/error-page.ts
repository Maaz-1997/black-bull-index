export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.6 system-ui, -apple-system, sans-serif; background: #050505; color: #eaeaea; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      .eyebrow { font: 11px/1 ui-monospace, monospace; letter-spacing: 0.4em; text-transform: uppercase; color: #8a8a8a; }
      h1 { font-size: 1.5rem; margin: 1.25rem 0 0.5rem; color: #f2f2f2; }
      p { color: #9a9a9a; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.65rem 1.4rem; border-radius: 999px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: linear-gradient(180deg, #f4d78a, #d8b15a 55%, #b98a2d); color: #1a0f00; font-weight: 500; }
      .secondary { background: transparent; color: #d0d0d0; border-color: rgba(255,255,255,0.12); }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="eyebrow">The chain</div>
      <h1>This page didn't load</h1>
      <p>Something broke in the trenches. Try again, or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
