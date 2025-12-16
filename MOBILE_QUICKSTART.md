# Quick Start: Running on Mobile Devices

This guide will help you quickly get the Heelix PWA running on iOS and Android devices.

## Prerequisites Checklist

- [ ] Node.js installed (v18+)
- [ ] For iOS: macOS with Xcode installed
- [ ] For Android: Android Studio installed
- [ ] Web app dependencies installed (`npm install`)

## Step-by-Step Setup

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

### 2. Initialize Capacitor (First Time Only)

```bash
npx cap init
```

Enter:
- **App name**: `Heelix PWA`
- **App ID**: `com.heelix.pwa`
- **Web dir**: `dist/apps/web`

### 3. Build Your Web App

```bash
npm run build
```

### 4. Add Platforms (First Time Only)

```bash
npx cap add ios      # macOS only
npx cap add android
```

### 5. Sync and Open

```bash
# Sync the web build to native projects
npx cap sync

# Open in native IDE
npm run mobile:ios      # Opens Xcode
npm run mobile:android  # Opens Android Studio
```

### 6. Run from IDE

- **Xcode**: Select simulator/device → Click Run (▶️)
- **Android Studio**: Select emulator/device → Click Run (▶️)

## Quick Commands Reference

```bash
# Build and sync in one command
npm run build && npx cap sync

# Open iOS (macOS only)
npm run mobile:ios

# Open Android
npm run mobile:android

# Individual commands
npx cap sync              # Sync web build to native
npx cap open ios          # Open Xcode
npx cap open android      # Open Android Studio
```

## Development Workflow

### Option 1: Build → Sync → Run (Recommended for Production)

```bash
npm run build
npx cap sync
npm run mobile:ios    # or mobile:android
```

### Option 2: Live Reload (Faster Development)

1. Start dev server:
   ```bash
   npm run serve
   ```

2. Update `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://localhost:4200',  // Your dev server URL
     cleartext: true
   }
   ```

3. Sync and run:
   ```bash
   npx cap sync
   npm run mobile:ios    # or mobile:android
   ```

Now changes will auto-reload in the native app!

## Troubleshooting

### Build Output Not Found
- Make sure you ran `npm run build` first
- Check that `dist/apps/web` exists
- Verify `webDir` in `capacitor.config.ts` matches your build output

### iOS Issues
- Make sure you're on macOS
- Xcode must be installed
- Run `cd ios && pod install` if dependencies fail

### Android Issues
- Android Studio must be installed
- SDK must be configured
- Create an AVD (Android Virtual Device) if no emulator shows up

## Next Steps

- Configure app icons and splash screens
- Test on physical devices
- Set up app store accounts
- Build release versions

For detailed information, see [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md)

