# Capacitor Setup for Mobile Apps

This React app is built as a Progressive Web App (PWA) using Ionic React. To package it as native iOS and Android apps, we use Capacitor.

## Why Capacitor?

Capacitor allows you to:
- Package your web build as native iOS and Android apps
- Access native device features (camera, geolocation, notifications, etc.)
- Deploy to App Store and Google Play Store
- Keep your web codebase separate from mobile-specific code
- Use the same codebase for web, iOS, and Android

## Prerequisites

- Node.js (v18 or higher)
- For iOS: macOS with Xcode installed
- For Android: Android Studio installed
- Java Development Kit (JDK) for Android

## Installation

1. Install Capacitor core and CLI:
```bash
npm install @capacitor/core @capacitor/cli
```

2. Install platform-specific packages:
```bash
# For iOS (macOS only)
npm install @capacitor/ios

# For Android
npm install @capacitor/android
```

## Initialize Capacitor

Run the initialization command:
```bash
npx cap init
```

When prompted, enter:
- **App name**: Heelix PWA
- **App ID**: `com.heelix.pwa` (or your preferred bundle ID)
- **Web dir**: `dist/apps/web` (this is where Vite builds the app)

This will create a `capacitor.config.ts` file in the root directory.

## Build Configuration

Update the `capacitor.config.ts` file to match your build output:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heelix.pwa',
  appName: 'Heelix PWA',
  webDir: 'dist/apps/web',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

## Add Platforms

After building your web app for the first time:

```bash
# Build the web app
npm run build
# or
nx build web

# Add iOS platform (macOS only)
npx cap add ios

# Add Android platform
npx cap add android
```

## Development Workflow

### 1. Build the Web App

Always build the web app before syncing to native projects:

```bash
npm run build
# or
nx build web
```

### 2. Sync Web Build to Native Projects

After each build, sync the web assets to the native projects:

```bash
npx cap sync
```

This command:
- Copies the web build to native projects
- Updates native dependencies
- Updates native project files

### 3. Run on Devices

#### iOS (macOS only)

```bash
npx cap open ios
```

This opens the project in Xcode. Then:
1. Select a simulator or connected device
2. Click the Run button (▶️) or press `Cmd + R`
3. The app will build and launch

**For physical iOS device:**
- Connect your iPhone/iPad via USB
- In Xcode, select your device from the device list
- You may need to configure code signing in Xcode

#### Android

```bash
npx cap open android
```

This opens the project in Android Studio. Then:
1. Wait for Gradle sync to complete
2. Select an emulator or connected device
3. Click the Run button (▶️) or press `Shift + F10`
4. The app will build and launch

**For physical Android device:**
- Enable Developer Options and USB Debugging on your device
- Connect via USB
- Select your device from the device list in Android Studio

## Live Reload During Development

For faster development, you can use Capacitor's live reload feature:

1. Start your dev server:
```bash
npm run serve
# or
nx serve web
```

2. Update `capacitor.config.ts` to point to your dev server:
```typescript
server: {
  url: 'http://localhost:4200', // or your dev server URL
  cleartext: true
}
```

3. Sync and run:
```bash
npx cap sync
npx cap open ios  # or android
```

Now changes in your web app will automatically reload in the native app!

## Production Build

For production builds:

1. Build the web app:
```bash
npm run build
```

2. Sync to native:
```bash
npx cap sync
```

3. Open in native IDE and build:
```bash
npx cap open ios    # Build in Xcode
npx cap open android # Build in Android Studio
```

## Adding Native Features

To use native device features, install Capacitor plugins:

```bash
# Camera
npm install @capacitor/camera

# Geolocation
npm install @capacitor/geolocation

# Push Notifications
npm install @capacitor/push-notifications

# And many more...
```

Then use them in your React components:

```typescript
import { Camera } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: 'base64'
  });
};
```

## Important Notes

1. **PWA First**: The app works as a PWA in browsers. Capacitor wraps it for native app stores.
2. **Build Process**: Always run `npm run build` before `npx cap sync`
3. **Platform-Specific Code**: Use Capacitor's platform detection if needed:
   ```typescript
   import { Capacitor } from '@capacitor/core';
   
   if (Capacitor.isNativePlatform()) {
     // Native-specific code
   }
   ```
4. **Ionic Components**: Since you're using Ionic React, you can use Ionic's native-styled components that work great on mobile.

## Troubleshooting

### iOS Issues
- **Code Signing**: Configure signing in Xcode under Signing & Capabilities
- **CocoaPods**: Run `cd ios && pod install` if dependencies aren't installing
- **Simulator**: Make sure you have iOS simulators installed in Xcode

### Android Issues
- **Gradle Sync**: If Android Studio shows sync errors, try `File > Invalidate Caches / Restart`
- **SDK**: Make sure Android SDK is properly installed and configured
- **Emulator**: Create an Android Virtual Device (AVD) in Android Studio

### Build Issues
- **Path Issues**: Make sure `webDir` in `capacitor.config.ts` matches your actual build output
- **Missing Files**: Run `npx cap sync` again after building
- **Permissions**: Some native features require permissions configured in native projects

## Next Steps

1. Test on simulators/emulators
2. Test on physical devices
3. Configure app icons and splash screens
4. Set up app store accounts
5. Build release versions for distribution

For more information, visit: https://capacitorjs.com/docs

