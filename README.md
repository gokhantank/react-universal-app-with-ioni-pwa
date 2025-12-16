# Heelix React App with Ionic PWA

This is a React application built with React Router v7 and Ionic PWA support, matching the functionality of the Angular version.

## Features

- **React Router v7**: Modern routing with React Router v7 features:
  - `createBrowserRouter` and `RouterProvider` for declarative routing
  - Nested routes with `Outlet` component
  - Lazy loading with React.lazy and Suspense for code splitting
  - Error boundaries at route level
  - Data loaders support (ready for async data fetching)
  - `NavLink` component for active route styling
- **Ionic PWA**: Progressive Web App support with Ionic React
- **Pages**: Dashboard and Factor Analysis pages
- **Components**: Shared components library with Card, Gauge, ProgressBar, Navigation, and TakeActionModal
- **PWA Support**: Service worker, manifest, and icons configured for iOS and Android

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run serve
# or
nx serve web
```

The app will be available at `http://localhost:4200` (or the port shown in the terminal).

### Build

```bash
npm run build
# or
nx build web
```

The production build will be in `dist/apps/web`.

### PWA Features

The app is configured as a Progressive Web App with:
- Service worker for offline support
- Web manifest for installability
- Icons for iOS and Android
- Standalone display mode

### Running on Mobile Devices (iOS & Android)

To run the app as native iOS and Android apps using Capacitor:

1. **Install Capacitor dependencies:**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/ios @capacitor/android
   ```

2. **Initialize Capacitor** (if not already done):
   ```bash
   npx cap init
   ```
   - App name: `Heelix PWA`
   - App ID: `com.heelix.pwa`
   - Web dir: `dist/apps/web`

3. **Add platforms:**
   ```bash
   npm run build
   npx cap add ios      # macOS only
   npx cap add android
   ```

4. **Build and sync:**
   ```bash
   npm run build
   npx cap sync
   ```

5. **Open in native IDEs:**
   ```bash
   npm run mobile:ios      # Opens Xcode (macOS only)
   npm run mobile:android  # Opens Android Studio
   ```

   Or use individual commands:
   ```bash
   npx cap open ios
   npx cap open android
   ```

6. **Run from Xcode/Android Studio:**
   - Select a simulator/emulator or connected device
   - Click the Run button
   - The app will build and launch

**For detailed setup instructions, see [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md)**

### Project Structure

```
heelix-react-app-with-ionic-pwa/
├── apps/
│   └── web/              # Main web application
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/    # Dashboard and Factor Analysis pages
│       │   │   └── App.tsx   # Main app component
│       │   └── main.tsx      # Entry point
│       └── public/        # Static assets
├── libs/
│   └── shared/           # Shared components and utilities
│       ├── components/   # Reusable components
│       └── utils/        # Shared utilities
└── package.json
```

## Pages

### Dashboard
- Team selection dropdown
- Vibe score gauge
- Score history chart
- KPIs display
- Key performance metrics with progress bars
- Take action modal

### Factor Analysis
- Team selection dropdown
- Factor grid with progress indicators
- Visual representation of team factors

## Components

### Shared Components
- **Card**: Container component with styling
- **Gauge**: Vibe score gauge visualization
- **ProgressBar**: Progress indicator with custom colors
- **Navigation**: Top navigation bar with routing
- **TakeActionModal**: Modal for taking actions

## Technologies

- React 18
- React Router v7 with modern features:
  - Consolidated `react-router` package (no separate `react-router-dom`)
  - `createBrowserRouter` for route configuration
  - `RouterProvider` for app-level routing
  - `Outlet` for nested route rendering
  - `NavLink` for navigation with active states
  - Support for loaders and actions (data APIs)
  - Error boundaries at route level
- Ionic React
- TypeScript
- Vite
- Nx (monorepo)
- Vite PWA Plugin

## Why This Architecture

This architecture was chosen to match the Angular version while leveraging modern React patterns and tooling. Here's the rationale behind the key decisions:

### React Router v7
- **Modern routing patterns**: React Router v7 provides a declarative, type-safe approach to routing with excellent developer experience
- **Data APIs**: Built-in support for loaders and actions enables efficient data fetching at the route level
- **Code splitting**: Lazy loading is seamlessly integrated, reducing initial bundle size
- **Error handling**: Route-level error boundaries provide granular error management
- **Future-proof**: Using the latest routing patterns ensures the codebase stays current

### React + TypeScript
- **Type safety**: TypeScript provides compile-time error checking and better IDE support
- **Component reusability**: React's component model makes it easy to share code across the application
- **Ecosystem**: Large ecosystem of libraries and tools
- **Performance**: React's virtual DOM and modern rendering optimizations provide good performance

### Ionic React
- **UI components**: Provides a set of mobile-optimized UI components that work well across platforms
- **PWA support**: Built-in PWA features and mobile-friendly styling
- **Consistency**: Ensures consistent UI/UX across web and mobile platforms

### Vite + Nx
- **Fast builds**: Vite's esbuild-based bundling provides extremely fast development and build times
- **Monorepo support**: Nx enables code sharing and efficient builds across multiple projects
- **Developer experience**: Hot module replacement and fast refresh improve development workflow

### Capacitor (Mobile Wrapper)
Capacitor is used here primarily because it was part of the original Angular version's architecture. While it serves the purpose of wrapping the web app for native distribution, it has several limitations:

**Limitations:**
- **Additional complexity**: Requires maintaining native iOS and Android projects alongside the web codebase
- **Build overhead**: Each platform requires separate builds and syncing, adding steps to the development workflow
- **Native project management**: Developers need familiarity with Xcode and Android Studio
- **Dependency on web build**: Native apps are essentially web views, which can have performance implications compared to truly native apps
- **Platform-specific issues**: Some web features may not work identically in the native wrapper

**Why it's used here:**
- Matches the existing Angular version's architecture
- Allows code sharing between web and mobile from a single codebase
- Provides a path to app store distribution without rewriting the entire application

**Alternatives to consider:**
- For better native performance: React Native or native iOS/Android development
- For simpler mobile deployment: Focus on PWA-only approach with better mobile web optimization
- For cross-platform: Flutter or other frameworks that compile to native code

### PWA-First Approach
The architecture prioritizes the web/PWA experience, which provides:
- **Single codebase**: One codebase for web and mobile web
- **Easy deployment**: No app store approval process for web version
- **Offline support**: Service workers enable offline functionality
- **Installability**: Users can install the PWA directly from the browser

## React Router v7 Features Implemented

### 1. **Modern Router Setup**
   - Uses `createBrowserRouter` instead of `<BrowserRouter>`
   - `RouterProvider` wraps the entire app
   - Route configuration is declarative and type-safe

### 2. **Nested Routes with Layout**
   - `Layout` component uses `<Outlet />` to render child routes
   - Navigation is shared across all pages
   - Clean separation of layout and page content

### 3. **Lazy Loading**
   - Pages are lazy-loaded using `React.lazy()`
   - `Suspense` boundaries provide loading states
   - Code splitting reduces initial bundle size

### 4. **Error Boundaries**
   - Route-level error handling with `errorElement`
   - Custom `ErrorBoundary` component
   - Graceful error display for better UX

### 5. **Navigation**
   - `NavLink` component with active state management
   - Uses `isActive` callback for styling
   - Consolidated imports from `react-router` package

### 6. **Ready for Data APIs**
   - Route configuration supports `loader` functions
   - Ready to add async data fetching when needed
   - Example loader code is commented in `App.tsx`

## Mobile App Development

### Quick Start
See [MOBILE_QUICKSTART.md](./MOBILE_QUICKSTART.md) for a quick guide to running on iOS/Android.

### Full Setup Guide
See [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md) for detailed Capacitor setup instructions.

### Available Scripts
- `npm run mobile:ios` - Build, sync, and open iOS project
- `npm run mobile:android` - Build, sync, and open Android project
- `npm run cap:sync` - Sync web build to native projects
- `npm run cap:open:ios` - Open iOS project in Xcode
- `npm run cap:open:android` - Open Android project in Android Studio

## Notes

- The logo.svg file has been copied from the Angular version to `apps/web/public/assets/logo.svg`
- PWA icons should be added to `apps/web/public/assets/icons/` in the following sizes:
  - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- If React Router v7 is not available, you may need to adjust the version in `package.json` to use React Router v6 (latest stable)
- For mobile apps, install Capacitor dependencies: `npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android`

## Matching Angular Version

This React app matches the functionality and structure of the Angular version located at:
`../heelix-angular-app-with-ionic-pwa/`

All pages, components, navigation, and features have been ported to React while maintaining the same user experience.
