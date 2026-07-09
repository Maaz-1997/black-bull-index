Add-Type -AssemblyName System.Drawing
$srcPath = 'd:\docs\black-bull-index\src\assets\black-bull.png'
$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Output ("SRC W={0} H={1} Fmt={2}" -f $src.Width, $src.Height, $src.PixelFormat)

# Target width for card embedding; keep aspect ratio, preserve transparency.
$targetW = 480
$targetH = [int][math]::Round($src.Height * ($targetW / $src.Width))
$bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($src, 0, 0, $targetW, $targetH)
$outPath = 'd:\docs\black-bull-index\scripts\bull-480.png'
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$len = (Get-Item $outPath).Length
Write-Output ("OUT W={0} H={1} Bytes={2}" -f $targetW, $targetH, $len)
