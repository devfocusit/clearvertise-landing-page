@echo off
echo Bumping version for cache busting...
powershell -ExecutionPolicy Bypass -File bump-version.ps1
echo.
echo Version bump complete! 
echo Remember to commit and push your changes.
pause
