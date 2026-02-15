# 🚀 HOE UPLOAD JE DIT NAAR GITHUB

## Methode 1: Via GitHub Website (Makkelijkst!)

### STAP 1: Pak de ZIP uit
1. Download de `BatterySaverApp_English_BlueWhite.zip`
2. Pak uit naar een folder op je computer

### STAP 2: Maak Repository op GitHub
1. Ga naar https://github.com
2. Log in
3. Klik rechtsboven op het **+** teken
4. Klik **"New repository"**
5. Vul in:
   - Repository name: `BatterySaverApp`
   - Description: `Battery Power Saver App for Android`
   - Zet op **Public**
6. Klik **"Create repository"**

### STAP 3: Upload Files
1. Op de nieuwe repository pagina, klik **"uploading an existing file"**
2. Sleep ALLE bestanden en folders uit de uitgepakte BatterySaverApp folder
   - App.js
   - package.json
   - android/ folder
   - .github/ folder
   - ALLES!
3. Scroll naar beneden
4. Typ bij "Commit changes": `Initial commit`
5. Klik **"Commit changes"**

### STAP 4: Wacht op Build
1. Klik bovenaan op **"Actions"** tab
2. Je ziet nu "Build Android APK" draaien (geel rondje)
3. Wacht 5-10 minuten (het bouwt nu je APK!)
4. Als het klaar is zie je een groen vinkje ✓

### STAP 5: Download je APK!
1. Klik op de groene build
2. Scroll naar beneden naar "Artifacts"
3. Download **"app-debug"**
4. Pak de ZIP uit
5. Je hebt nu `app-debug.apk`!

---

## Methode 2: Via Git Command Line (Voor gevorderden)

### Je hebt nodig:
- Git geïnstalleerd (https://git-scm.com/)

### Commando's:

```bash
# Ga naar de uitgepakte BatterySaverApp folder
cd pad/naar/BatterySaverApp

# Initialiseer Git
git init

# Voeg alle bestanden toe
git add .

# Maak eerste commit
git commit -m "Initial commit"

# Koppel aan je GitHub repository
git remote add origin https://github.com/JOUWUSERNAME/BatterySaverApp.git

# Push naar GitHub
git push -u origin main
```

Vervang `JOUWUSERNAME` met je GitHub gebruikersnaam!

---

## Methode 3: Via GitHub Desktop (Visueel & Makkelijk)

1. Download GitHub Desktop: https://desktop.github.com/
2. Installeer en log in
3. Klik **"Add"** → **"Add Existing Repository"**
4. Selecteer de uitgepakte BatterySaverApp folder
5. Klik **"Publish repository"**
6. Klik **"Publish"**
7. Ga naar GitHub.com → je repository
8. Klik op **"Actions"** om de build te zien

---

## ❓ Wat gebeurt er na uploaden?

GitHub Actions (de automatische workflow) doet dit:
1. ✅ Installeert Node.js en Java
2. ✅ Installeert alle dependencies (`npm install`)
3. ✅ Bouwt de Android APK
4. ✅ Upload de APK als "artifact"
5. ✅ Je kunt de APK downloaden!

## 🎯 Problemen?

### "Build failed"
- Check of ALLE bestanden geüpload zijn
- Vooral de `android/` folder
- En de `.github/` folder

### "No workflows found"
- Zorg dat `.github/workflows/build-apk.yml` bestaat
- Misschien moet je de folder hernoemen van `_github` naar `.github`

### "Can't find Actions tab"
- Klik bovenaan je repository pagina
- Zie je: Code | Issues | Pull requests | **Actions**
- Staat het er niet? Check of repository op Public staat

---

## 📱 APK op je telefoon installeren

1. Download `app-debug.apk` van GitHub
2. Stuur naar je telefoon (via email, USB, etc.)
3. Open de APK op je telefoon
4. Sta "Installeer van onbekende bronnen" toe
5. Installeer!

---

## 🔄 Wijzigingen maken

Als je later iets wilt aanpassen:
1. Wijzig de code
2. Upload opnieuw naar GitHub (of push met Git)
3. GitHub bouwt automatisch een nieuwe APK!

---

**Succes! Als je er niet uitkomt, laat het me weten bij welke stap je vastloopt!** 🚀
