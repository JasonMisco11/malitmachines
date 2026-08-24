$content = Get-Content -Raw "C:\Users\JasonAs\.gemini\antigravity\brain\2fed4e38-88e7-4db1-97bb-db4fc7d42a2b\.system_generated\steps\268\content.md"

$pattern = '(?i)(?:src|data-original)=["''](//image\.made-in-china\.com/[^"'']*\.(?:jpg|jpeg|png|webp))["'']'
$matches = [regex]::Matches($content, $pattern)
$urls = $matches | ForEach-Object { "https:" + $_.Groups[1].Value } | Select-Object -Unique

Write-Host "Found $($urls.Count) images."

$destDir = "public\images\machines"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$i = 1
foreach ($url in $urls) {
    # Attempt to fetch high quality by replacing thumbnail size strings
    $hqUrl = $url -replace '/2f0j00/', '/4f0j00/'
    
    $ext = [System.IO.Path]::GetExtension($url)
    if (-not $ext) { $ext = ".jpg" }
    
    $outFile = Join-Path $destDir ("interlock_machine_$i$ext")
    Write-Host "Downloading $hqUrl"
    
    try {
        Invoke-WebRequest -Uri $hqUrl -OutFile $outFile -UseBasicParsing
    } catch {
        try {
            Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing
        } catch {
            Write-Host "Failed to download $url"
        }
    }
    $i++
}
Write-Host "Done!"
