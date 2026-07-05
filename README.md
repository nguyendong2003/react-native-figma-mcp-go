# React Native Figma MCP Go 👋

A modern React Native / Expo application built using Expo Router and styled with Tailwind CSS (via NativeWind v4). This project showcases high-fidelity Figma-to-code translation, featuring a pixel-perfect, responsive **Sign-in Screen** and a custom reusable UI components architecture.

## 🚀 Features

*   **Figma-to-Code Translation**: Extracted visual design tokens and coordinates directly from Figma frames using the `figma-mcp-go` protocol.
*   **Design System Integration**: Fully configured color palettes, typography mappings (Poppins-based headings and body texts), and shadows.
*   **NativeWind v4 (Tailwind)**: Leverages build-time styling transformations integrated via custom Metro configurations.
*   **Modular Component Decomposition**:
    *   **Global Common Components**: Shared, state-free controls (`Button`, `InputField`).
    *   **Screen-Private Components**: Separated visual blocks (`SignInHeader`, `SignInIllustration`, `BiometricAuth`).
*   **Responsive Layouts**: Constructed with safe area notch handling, keyboard avoiding wrappers, and fluid scroll panels to adapt gracefully to different screen heights.

---

## 📁 Project Structure

```text
react-native-figma-mcp-go/
├── .agents/                    # Workspace custom agent skills (rules & behaviors)
│   └── skills/
│       ├── common-components   # Reusable controls guidelines
│       ├── fe-gen-screen       # Layout generation workflow
│       ├── fix-screen-ui       # UI adjustment & audit standards
│       └── use-project-theme   # Theme color & typography mappings
├── assets/                     # App icons and media assets
├── src/
│   ├── app/                    # File-based navigation routes
│   │   ├── _layout.tsx         # Navigation provider wrapper
│   │   ├── index.tsx           # Entry page (centered test launcher link)
│   │   └── sign-in.tsx         # Figma Sign-in orchestrator & validation logic
│   ├── components/             # Reusable UI controls
│   │   ├── Button.tsx          # Configurable button (primary / link states)
│   │   ├── InputField.tsx      # Text input (focus borders, password toggles)
│   │   └── sign-in/            # Private widgets for the Sign-in route
│   │       ├── BiometricAuth.tsx
│   │       ├── SignInHeader.tsx
│   │       └── SignInIllustration.tsx
│   ├── constants/
│   │   └── theme.ts            # Project design tokens (Colors, Typography)
│   └── global.css              # Custom Tailwind component definitions
├── metro.config.js             # NativeWind compiler bundler configuration
├── tailwind.config.js          # Tailwind design tokens mapping
└── package.json                # Project dependencies
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Metro Server
Restart your Expo server and clear the cache to ensure all Tailwind transformations apply correctly:
```bash
npx expo start --clear
```

### 3. Open the App
*   Press **`a`** to open on an Android emulator (requires Android SDK).
*   Press **`i`** to open on an iOS simulator (macOS only).
*   Press **`w`** to open in a web browser.
*   Scan the terminal QR code using **Expo Go** on your physical iOS or Android device.

---

## 🎨 Theme Details

All components reference the central theme configuration:
*   **Primary Brand Color**: `#3629B7` (`bg-primary-1` / `text-primary-1`)
*   **Neutral Text Color**: `#343434` (`text-neutral-1`)
*   **Shadow System**: Card shadows loaded via custom CSS classes (`shadow-card-1`, `shadow-card-2`).
*   **Typography**: Headings use `text-title-1` (24px Poppins) and subtitles use `text-caption-2` (12px Poppins).
