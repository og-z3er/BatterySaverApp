# 🚀 SUPER SIMPELE GITHUB UPLOAD INSTRUCTIES

## Stap 1: Installeer Git (Eenmalig)

1. **Download Git:** https://git-scm.com/download/win
2. **Installeer** met alle standaard instellingen
3. **Herstart je computer**

## Stap 2: Maak Repository op GitHub

1. Ga naar **https://github.com**
2. Klik rechtsboven op het **+** teken
3. Klik **"New repository"**
4. Vul in:
   - Repository name: `BatterySaverApp`
   - **Laat alles leeg** (geen README, geen .gitignore)
5. Klik **"Create repository"**
6. **Laat deze pagina open!**

## Stap 3: Upload met het Script

1. **Pak de ZIP uit** naar je computer
2. **Ga naar** de uitgepakte `BatterySaverApp` folder
3. **Dubbelklik** op het bestand: `UPLOAD_TO_GITHUB.bat`
4. **Typ je GitHub username** (bijv: `pietjepuk123`)
5. **Typ repository naam** (bijv: `BatterySaverApp`)
6. **Druk Enter**
7. Als het vraagt om je wachtwoord:
   - Gebruik een **Personal Access Token** (zie hieronder)

## Stap 4: GitHub Personal Access Token (Als het om wachtwoord vraagt)

Als Git om een wachtwoord vraagt, moet je een token maken:

1. Ga naar: **https://github.com/settings/tokens**
2. Klik **"Generate new token"** → **"Classic"**
3. Vul in:
   - Note: `BatterySaver Upload`
   - Expiration: `90 days`
   - Vink aan: **`repo`** (bovenste checkbox)
4. Scroll naar beneden, klik **"Generate token"**
5. **KOPIEER DE TOKEN** (begint met `ghp_...`)
6. **Plak deze** als "wachtwoord" in het CMD venster

## Stap 5: Check je Repository

1. Ga naar: `https://github.com/JOUWUSERNAME/BatterySaverApp`
2. Zie je alle bestanden? ✅ YES!
3. Klik op **"Actions"** (bovenaan)
4. Zie je **"Build Android APK"** draaien? ✅ Perfect!

## Stap 6: Download je APK

1. Wacht tot de build **GROEN** is (5-10 minuten)
2. Klik op de groene build
3. Scroll naar beneden naar **"Artifacts"**
4. Download **"app-debug"**
5. Pak de ZIP uit
6. Je hebt nu `app-debug.apk`! 🎉

---

## ❌ LUKT HET NIET?

### "Git is niet geïnstalleerd"
→ Installeer Git van: https://git-scm.com/
→ Herstart je computer
→ Probeer opnieuw

### "Permission denied"
→ Je hebt een Personal Access Token nodig (zie Stap 4)

### "Repository not found"
→ Check of je de repository hebt aangemaakt op GitHub
→ Check of je username correct is getypt

### "Build failed" op GitHub
→ Check of alle bestanden geüpload zijn
→ Refresh de pagina en probeer opnieuw

---

## 🎯 CHECKLIST

- [ ] Git geïnstalleerd
- [ ] Computer herstart na Git installatie
- [ ] Repository gemaakt op GitHub
- [ ] ZIP uitgepakt
- [ ] UPLOAD_TO_GITHUB.bat uitgevoerd
- [ ] Alle bestanden staan op GitHub
- [ ] Actions tab toont "Build Android APK"
- [ ] Build is succesvol (groen vinkje)
- [ ] APK gedownload van Artifacts

**Succes!** 🚀
