# Battery Saver App - React Native

Een complete Battery Power Saver app voor Android die je kunt builden naar een APK.

## ⚡ Features

- ✅ Battery Saver modus aan/uit schakelen
- ✅ Zwarte achtergrond in battery saver modus
- ✅ SMS & Bellen standaard actief
- ✅ Eigen apps toevoegen
- ✅ Apps selecteren voor actief gebruik
- ✅ Instellingen worden opgeslagen
- ✅ Batterij percentage weergave
- ✅ Visuele feedback voor app status

## 📱 APK Bouwen - Stap voor Stap

### Vereisten Installeren

1. **Node.js installeren** (versie 18 of hoger)
   - Download van: https://nodejs.org/
   - Check installatie: `node --version`

2. **Java Development Kit (JDK) installeren**
   - Download JDK 17: https://adoptium.net/
   - Stel JAVA_HOME environment variabele in

3. **Android Studio installeren**
   - Download: https://developer.android.com/studio
   - Tijdens installatie: selecteer "Android SDK", "Android SDK Platform", en "Android Virtual Device"

4. **Android SDK configureren**
   - Open Android Studio
   - Ga naar: Tools > SDK Manager
   - Installeer: Android SDK Platform 34, Android SDK Build-Tools 34

5. **Environment Variables instellen**
   ```
   ANDROID_HOME = C:\Users\JouwNaam\AppData\Local\Android\Sdk
   ```
   Voeg toe aan PATH:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   ```

### Project Setup

1. **Navigeer naar de project folder**
   ```bash
   cd BatterySaverApp
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Installeer CocoaPods (alleen Mac voor iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

### APK Bouwen

#### Optie 1: Debug APK (Makkelijkst - Voor testen)

```bash
cd android
./gradlew assembleDebug
```

**APK locatie:**
`android/app/build/outputs/apk/debug/app-debug.apk`

#### Optie 2: Release APK (Voor distributie)

1. **Genereer signing key** (éénmalig):
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
   - Kies een wachtwoord en onthoud dit!

2. **Configureer gradle.properties**
   Maak bestand: `android/gradle.properties`
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=jouw_wachtwoord
   MYAPP_RELEASE_KEY_PASSWORD=jouw_wachtwoord
   ```

3. **Update app/build.gradle** (add to signingConfigs):
   ```gradle
   signingConfigs {
       release {
           storeFile file(MYAPP_RELEASE_STORE_FILE)
           storePassword MYAPP_RELEASE_STORE_PASSWORD
           keyAlias MYAPP_RELEASE_KEY_ALIAS
           keyPassword MYAPP_RELEASE_KEY_PASSWORD
       }
   }
   ```

4. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

**Release APK locatie:**
`android/app/build/outputs/apk/release/app-release.apk`

### APK Installeren op Telefoon

#### Methode 1: Via USB
1. Schakel "Developer Options" in op je Android telefoon
2. Schakel "USB Debugging" aan
3. Sluit telefoon aan via USB
4. ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

#### Methode 2: Direct Transfer
1. Kopieer de APK naar je telefoon (via USB of email)
2. Open de APK op je telefoon
3. Sta "Install from unknown sources" toe
4. Installeer de app

## 🛠️ Development

### App testen tijdens ontwikkeling

1. **Start Metro bundler**:
   ```bash
   npm start
   ```

2. **Run app op Android** (in nieuw terminal venster):
   ```bash
   npm run android
   ```

### Troubleshooting

**"SDK location not found"**
- Maak bestand `android/local.properties`:
  ```
  sdk.dir=C:\\Users\\JouwNaam\\AppData\\Local\\Android\\Sdk
  ```

**"Failed to install the app"**
- Run: `cd android && ./gradlew clean`
- Probeer opnieuw

**"Unable to load script"**
- Run: `npm start -- --reset-cache`
- Build opnieuw

**Gradle build errors**
- Verwijder: `android/.gradle` folder
- Run: `cd android && ./gradlew clean`

## 📝 Code Aanpassen

### App naam wijzigen
- `android/app/src/main/res/values/strings.xml`

### App icoon wijzigen
- Vervang bestanden in: `android/app/src/main/res/mipmap-*/ic_launcher.png`

### Package naam wijzigen
1. Update `android/app/build.gradle`: `applicationId`
2. Hernoem folders in: `android/app/src/main/java/`
3. Update imports in MainActivity.java en MainApplication.java

## 🎨 Features Uitbreiden

De app gebruikt:
- **AsyncStorage** - Voor instellingen opslaan
- **React Native** - Cross-platform mobile development
- **Native modules** - Voor system toegang (kan uitgebreid worden)

Mogelijke uitbreidingen:
- Echte batterij status lezen (via native module)
- Notificaties uitzetten van geselecteerde apps
- Schema's instellen (automatisch aan/uit op tijden)
- Widget voor homescreen
- Dark mode scheduling

## 📄 Licentie

Deze app is gemaakt als voorbeeld project. Vrij te gebruiken en aan te passen.

## 🆘 Hulp Nodig?

Veelvoorkomende problemen zijn opgelost in de Troubleshooting sectie hierboven.

Voor meer info over React Native:
- Docs: https://reactnative.dev/docs/getting-started
- Android specifiek: https://reactnative.dev/docs/signed-apk-android
