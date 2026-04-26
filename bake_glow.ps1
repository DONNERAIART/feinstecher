Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\Sipph\Feinstecher\maschine.png")
$newImg = new-object System.Drawing.Bitmap(64, 100)
$g = [System.Drawing.Graphics]::FromImage($newImg)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$attr = new-object System.Drawing.Imaging.ImageAttributes
$matrix = new-object System.Drawing.Imaging.ColorMatrix
# Sublte Turquoise Glow: R=0.36, G=0.84, B=0.89
$matrix.Matrix00 = 0; $matrix.Matrix11 = 0; $matrix.Matrix22 = 0;
$matrix.Matrix33 = 0.08; # Lower Alpha for subtle glow
$matrix.Matrix40 = 0.36; $matrix.Matrix41 = 0.84; $matrix.Matrix42 = 0.89;
$attr.SetColorMatrix($matrix)

for ($r = 1; $r -le 4; $r++) {
    for ($a = 0; $a -lt 360; $a += 30) {
        $x = [int](8 + [Math]::Cos($a * [Math]::PI / 180) * $r)
        $y = [int](8 + [Math]::Sin($a * [Math]::PI / 180) * $r)
        $destRect = new-object System.Drawing.Rectangle($x, $y, 32, 55)
        $g.DrawImage($img, $destRect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel, $attr)
    }
}
$g.DrawImage($img, 8, 8, 32, 55)
$newImg.Save("c:\Users\Sipph\Feinstecher\tattoomachine-cursor-glow-final.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose(); $newImg.Dispose(); $g.Dispose()
