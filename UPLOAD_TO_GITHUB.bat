@echo off
echo ========================================
echo   Battery Saver App - GitHub Upload
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo FOUT: Git is niet geinstalleerd!
    echo.
    echo Download Git van: https://git-scm.com/
    echo Installeer Git en probeer opnieuw.
    pause
    exit /b 1
)

echo Git gevonden! Starten...
echo.

REM Get GitHub username and repo name
set /p USERNAME="Voer je GitHub username in: "
set /p REPONAME="Voer repository naam in (bijv: BatterySaverApp): "

echo.
echo Bezig met uploaden naar: https://github.com/%USERNAME%/%REPONAME%
echo.

REM Initialize Git if not already initialized
if not exist .git (
    echo Initialiseren Git repository...
    git init
    git branch -M main
)

REM Add all files
echo Bestanden toevoegen...
git add .

REM Commit
echo Commit maken...
git commit -m "Battery Saver App - Initial commit"

REM Add remote
echo Remote toevoegen...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/%REPONAME%.git

REM Push to GitHub
echo Uploaden naar GitHub...
git push -u origin main --force

echo.
echo ========================================
echo   KLAAR!
echo ========================================
echo.
echo Ga naar: https://github.com/%USERNAME%/%REPONAME%
echo Klik op "Actions" om je APK te zien builden!
echo.
pause
