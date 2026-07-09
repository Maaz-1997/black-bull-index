$pngPath = 'd:\docs\black-bull-index\scripts\bull-480.png'
$bytes = [System.IO.File]::ReadAllBytes($pngPath)
$b64 = [System.Convert]::ToBase64String($bytes)
$outTs = 'd:\docs\black-bull-index\src\lib\bull-asset.ts'
$header = @"
// AUTO-GENERATED. The black-gold bull emblem as a base64 data URI, downscaled to 480px wide
// (from src/assets/black-bull.png) for embedding in Satori-rendered share cards.
// Server-only: import this ONLY from the /api/og, /api/pfp, /api/banner route handlers so the
// raster never enters the client bundle. Regenerate via scripts/make-bull-asset.ps1 + emit-bull-ts.ps1.
export const BULL_DATA_URI =
  "data:image/png;base64,$b64";
"@
[System.IO.File]::WriteAllText($outTs, $header)
Write-Output ("Wrote {0} ({1} base64 chars)" -f $outTs, $b64.Length)
