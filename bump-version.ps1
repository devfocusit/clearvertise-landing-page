# PowerShell script to bump version numbers for cache busting
param(
    [string]$newVersion = $null
)

# Generate timestamp-based version if not provided
if (-not $newVersion) {
    $timestamp = Get-Date -Format "yyyyMMdd.HHmm"
    $newVersion = "1.0.$timestamp"
}

Write-Host "Bumping version to: $newVersion" -ForegroundColor Green

# Update index.html
$indexPath = "src/index.html"
if (Test-Path $indexPath) {
    $content = Get-Content $indexPath -Raw
    $content = $content -replace 'css/main\.css\?v=[^"]*', "css/main.css?v=$newVersion"
    $content = $content -replace 'css/responsive\.css\?v=[^"]*', "css/responsive.css?v=$newVersion" 
    $content = $content -replace 'js/main\.js\?v=[^"]*', "js/main.js?v=$newVersion"
    Set-Content $indexPath $content -NoNewline
    Write-Host "Updated $indexPath" -ForegroundColor Yellow
}

# Update other HTML files if they exist
$htmlFiles = @("src/about.html", "src/features.html", "src/contact.html")
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace 'css/main\.css\?v=[^"]*', "css/main.css?v=$newVersion"
        $content = $content -replace 'css/responsive\.css\?v=[^"]*', "css/responsive.css?v=$newVersion"
        $content = $content -replace 'js/main\.js\?v=[^"]*', "js/main.js?v=$newVersion"
        Set-Content $file $content -NoNewline
        Write-Host "Updated $file" -ForegroundColor Yellow
    }
}

Write-Host "Version bump complete! New version: $newVersion" -ForegroundColor Green
Write-Host "Don't forget to commit and push your changes." -ForegroundColor Cyan
