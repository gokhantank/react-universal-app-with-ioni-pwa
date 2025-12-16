import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heelix.pwa',
  appName: 'Heelix PWA',
  webDir: 'dist/apps/web',
  server: {
    androidScheme: 'https',
    // Uncomment for live reload during development
    // url: 'http://localhost:4200',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;

