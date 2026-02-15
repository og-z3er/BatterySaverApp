# 📱 Battery Saver App - Installatie Instructies

## 🚀 Snelstart - APK Maken in 5 Stappen

### Stap 1: Software Installeren

Download en installeer de volgende programma's:

1. **Node.js** (versie 18 of hoger)
   - Link: https://nodejs.org/
   - Download de LTS versie
   - Na installatie, check in Command Prompt: `node --version`

2. **Java JDK 17**
   - Link: https://adoptium.net/
   - Download "JDK 17 (LTS)"
   - Installeer met standaard instellingen

3. **Android Studio**
   - Link: https://developer.android.com/studio
   - Download de laatste versie
   - Tijdens installatie: vink ALLES aan!

### Stap 2: Android Studio Configureren

1. Open Android Studio
2. Klik op "More Actions" > "SDK Manager"
3. In het tabblad "SDK Platforms":
   - ✅ Vink "Android 14.0 (UpsideDownCake)" aan
   - ✅ Vink "Show Package Details" aan rechtsonder
   - ✅ Vink "Android SDK Platform 34" aan
   
4. In het tabblad "SDK Tools":
   - ✅ Android SDK Build-Tools 34
   - ✅ Android SDK Command-line Tools
   - ✅ Android SDK Platform-Tools
   - ✅ Android Emulator
   
5. Klik "Apply" en wacht tot alles geïnstalleerd is

### Stap 3: Environment Variables Instellen (Windows)

1. Druk op Windows toets + zoek "environment"
2. Klik "Edit the system environment variables"
3. Klik "Environment Variables..." onderaan
4. Bij "System variables", klik "New":
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\JOUWNAAM\AppData\Local\Android\Sdk`
     (vervang JOUWNAAM met je Windows gebruikersnaam)

5. Zoek "Path" in System variables, klik "Edit", en voeg toe:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`

6. Klik overal "OK"
7. **Herstart je computer!**

### Stap 4: Project Installeren

1. Open Command Prompt (CMD)
2. Navigeer naar de BatterySaverApp folder:
   ```
   cd C:\pad\naar\BatterySaverApp
   ```

3. Installeer alle dependencies:
   ```
   npm install
   ```
   (Dit duurt 5-10 minuten)

### Stap 5: APK Bouwen

#### Voor Testen (Debug APK):

Open Command Prompt in de BatterySaverApp folder:

```bash
cd android
gradlew assembleDebug
```

**De APK vind je hier:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

#### Voor Productie (Release APK):

Eerst een signing key maken (éénmalig):

```bash
cd android\app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Vul de gevraagde informatie in en **onthoud je wachtwoord!**

Dan bouwen:

```bash
cd ..
gradlew assembleRelease
```

**De APK vind je hier:**
```
android\app\build\outputs\apk\release\app-release.apk
```

## 📲 APK Installeren op je Telefoon

### Methode 1: Direct vanaf PC

1. Sluit je Android telefoon aan via USB
2. Op je telefoon: 
   - Ga naar Instellingen > Over telefoon
   - Tik 7x op "Build number" (Developer mode aan)
   - Ga terug > Developer Options > USB Debugging AAN
3. Kopieer de APK naar je telefoon
4. Open de APK op je telefoon en installeer

### Methode 2: Via ADB (Geavanceerd)

```bash
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

## ⚠️ Problemen Oplossen

### "SDK location not found"

Maak een nieuw bestand: `android\local.properties`

Met deze inhoud (pas het pad aan):
```
sdk.dir=C:\\Users\\JOUWNAAM\\AppData\\Local\\Android\\Sdk
```

### "Command not found: gradlew"

Je bent waarschijnlijk niet in de juiste folder. Zorg dat je in de `android` folder zit:
```bash
cd android
```

Voor Windows gebruik: `gradlew.bat` in plaats van `./gradlew`

### "Java not found"

1. Controleer of JDK geïnstalleerd is
2. Stel JAVA_HOME in:
   - Vind je JDK locatie (bijv: `C:\Program Files\Eclipse Adoptium\jdk-17.0.8.7-hotspot`)
   - Voeg toe als environment variable: JAVA_HOME
   - Herstart je computer

### Build duurt heel lang of crashed

In `android\gradle.properties`, voeg toe:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
org.gradle.daemon=true
org.gradle.parallel=true
```

### "Execution failed for task ':app:mergeDebugResources'"

```bash
cd android
gradlew clean
gradlew assembleDebug
```

## 🎯 Checklist voor APK Maken

- [ ] Node.js geïnstalleerd (check: `node --version`)
- [ ] Java JDK geïnstalleerd (check: `java -version`)
- [ ] Android Studio geïnstalleerd
- [ ] Android SDK Platform 34 geïnstalleerd
- [ ] ANDROID_HOME environment variable ingesteld
- [ ] Computer herstart na environment variables
- [ ] In BatterySaverApp folder: `npm install` gedaan
- [ ] In android folder: `gradlew assembleDebug` uitgevoerd
- [ ] APK gevonden in android\app\build\outputs\apk\debug\

## 📞 Extra Hulp

Als je er niet uitkomt:

1. Check of alle stappen exact gevolgd zijn
2. Herstart je computer na het instellen van environment variables
3. Probeer `gradlew clean` en dan opnieuw bouwen
4. Kijk in de README.md voor meer troubleshooting tips

## 🎉 Gelukt?

Als je de APK hebt gemaakt:
1. Kopieer hem naar je telefoon
2. Installeer de app
3. Geniet van je eigen Battery Saver app!

De app slaat je instellingen automatisch op, dus je kunt direct beginnen met apps selecteren.
