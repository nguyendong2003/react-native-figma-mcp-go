---
name: fe-gen-screen
description: Guides the agent on generating pixel-perfect React Native screens from Figma designs using custom theme classes and component decomposition.
---

# Frontend Screen Generation from Design

This skill defines the workflow and guidelines for converting Figma design nodes into clean, modular, and pixel-perfect React Native screens using `figma-mcp-go` MCP tools, NativeWind, and our project theme.

## 0. Command Usage: `fe-gen-screen <screen-name>`

When the user inputs `fe-gen-screen <screen-name>` in the chat:

1. **Trigger Action**: Instantly treat this as a request to convert the currently selected component/screen in Figma into a React Native screen.
2. **File Location**:
   - Resolve the file name as `src/app/<screen-name>.tsx` (convert `<screen-name>` to lowercase kebab-case, matching the `naming-conventions` skill).
3. **Execution Flow**:
   - Immediately call `get_selection` to fetch the selected Figma node hierarchy.
   - Proceed with layout translation, styling, component splitting, and code validation.

---

## 1. Using Figma MCP Tools to Extract Designs

When tasked with generating a screen or component, use the following `figma-mcp-go` tools:

1. **Check Active Selection**:
   - Call `get_selection` to fetch the details of the node(s) the user has selected in Figma.
   - This returns the parent boundaries, type, styles, and children nodes.
2. **Fetch Deep Details**:
   - If you need details on a specific child node that wasn't fully expanded, call `get_node` with the node's `id`.
3. **Analyze Colors, Text & Effects**:
   - Call `get_styles` to inspect document paint, typography, or drop shadow style sheets.
4. **Visual Reference**:
    - Call `save_screenshots` with the screen frame's `id` to save a visual preview directly to disk in the allowed working folders, allowing you to compare your generated code layout with the visual representation.

---

## 2. Design Translation Strategy (Pixel-Perfect & Responsive Policy)

When translating Figma designs, you must adhere to two concurrent goals: **1) Exact pixel/font matching** when the screen width matches the Figma canvas width, and **2) Fluid responsiveness** when the screen size varies (smaller phones or tablets).

### Pixel-Perfect Guidelines (At Figma Viewport Dimensions)

- **Reference Viewport**: Check the bounds (width/height) of the selected parent Figma frame (e.g., 375px width).
- **Exact Sizing**: Font sizes, line heights, paddings (`p-`, `px-`, `py-`), margins (`m-`, `mx-`, `my-`), border radii, and item gaps must map _exactly_ to the Figma node values at this reference size.
- **Mathematical Spacing**: Always calculate vertical spacing mathematically from bounding boxes: `gap = next.y - (prev.y + prev.height)`. Never estimate spacing; calculate it down to the exact pixel.
- **Image/Icon Asset Padding**: Check for transparent padding inside image/icon PNG/SVG assets (using Python scripts to find the non-transparent bounding box). If the asset has transparent padding, its visual dimensions will be smaller than its bounding box. You must adjust its layout or margins, or crop the image to ensure pixel-perfect matching.
- **Matching Colors & Effects**: Fills, text colors, borders, and shadows must use the exact theme equivalents (e.g., `bg-primary-1`, `text-neutral-1`, `shadow-card-1`).

### Responsive Adaptation Guidelines (For Other Device Dimensions)

- **Use Flexbox**: Never use absolute positioning for main screen elements (e.g. avoiding `absolute top-[140px] left-[32px]`). Use flex containers (`flex-1`, `justify-between`, `items-center`, `gap-4`) to allow elements to flow and adjust naturally.
- **Stretching & Max Width**: Let interactive elements (buttons, inputs, cards) stretch (`w-full`, `self-stretch`) but apply a max-width limit (e.g. `max-w-md`, `max-w-[420px]`) centered via `mx-auto` so the design remains balanced on tablets or desktop screens.
- **Container Heights**: Avoid fixed heights on containers holding text to prevent text clipping when screen fonts scale. Use `h-auto` or let content size itself via vertical padding.
- **ScrollView Wrapper**: Always wrap pages in a scroll container (like `ScrollView`) if content height can exceed smaller device screens, ensuring nothing is cut off.

---

## 3. Mandatory Component Splitting & Code Organization

**Rule**: You must NEVER output a screen as a single, bloated file. Every screen must be decomposed into logical sub-components.

### Splitting Criteria:

1. **Forms & Input Fields**:
   - Do not write inputs inline in the screen layout.
   - Extract inputs into modular files (e.g. `InputField.tsx` or `PasswordInput.tsx`). This allows the input to manage its own focus, password toggle state, and validation errors without re-rendering the whole page.
2. **Header & Footer Areas**:
   - Screen headers (back buttons, screen title, themes) must not be rendered inline on the screen. Instead, define them via Expo Router `Stack.Screen` options (`title`, `headerTheme`) in the layout navigator, allowing the global `<NavigationBar />` custom header to render automatically.
   - Extract actions and social sign-in lists (e.g. `SocialActions.tsx`).
3. **Interactivity & Length**:
   - Any visual element with its own internal state or taking up more than 40 lines of code must be extracted.
4. **Shared vs. Private Components**:
   - **Shared Components**: Place globally reusable components (e.g., custom generic `Button.tsx`, standard `InputField.tsx`) directly under `src/components/`. Refer to the `common-components` skill for guidelines.
   - **Screen-Private Components**: Place screen-specific component parts under `src/components/<screen-name>/` (e.g., `src/components/login/LoginHeader.tsx`).
5. **Prioritize Common Components Reuse**:
   - Before writing any buttons, custom input fields, loaders, alerts, or dividers, check the common catalog in `src/components/`. Import and use these common components (passing customization props/classNames) rather than reinventing or writing them inline.

### Main Screen File Responsibility (under `src/app/`):

The screen file under `src/app/` acts strictly as an orchestrator:

- Contains parent layouts (e.g., `<SafeAreaView>`, `<KeyboardAvoidingView>`, `<ScrollView>`).
- Controls overall layout spacing and sections.
- Manages high-level screen states (loading hooks, network integration, form submit callbacks).
- Feeds data and event handler callbacks down to the sub-components.

### Folder Layout Example:

```
src/
├── app/                        # Main Screen Pages
│   └── sign-in.tsx             # State orchestrator & layout composer
│   └── _layout.tsx             # Route config & global stack navigator
└── components/                 # UI Components
    ├── Button.tsx              # Generic shared button
    ├── InputField.tsx          # Generic shared input
    ├── NavigationBar.tsx       # Generic shared navigation bar
    └── sign-in/                # Private pieces for sign-in page
        ├── SignInIllustration.tsx # Padlock graphics and circles
        └── BiometricAuth.tsx   # Biometric verification trigger
```

---

## 4. Platform & Design Best Practices

- **ScrollView**: If a page contains forms or could overflow vertically on smaller mobile devices, use `<ScrollView className="flex-1 bg-neutral-6">` instead of a static `<View>`.
- **StatusBar & SafeAreaView**: Screens must not render a manual `<StatusBar />` or pad the top safe area if they utilize a navigator-managed header. The global `<NavigationBar />` automatically injects notch-safe top padding and sets the status bar style dynamically (`light` for dark `'black'` headerTheme, `dark` for light `'white'` headerTheme). Screen pages should simply wrap their layouts in `<SafeAreaView edges={['left', 'right', 'bottom']}>` to safeguard bottom and horizontal boundaries.
- **TypeScript Type Safety**: All generated screen and component code must be strictly typed. Using `any` or `as any` type assertions is strictly prohibited. If third-party properties require flexible types, define specific type unions, index signatures, or generic interfaces instead of using `any`.
- **TextInput Handling**: Wrap inputs inside keyboard-avoiding views (`KeyboardAvoidingView`) on iOS so inputs remain visible when the keyboard is active.
- **Images**: Use standard React Native `Image` from `'react-native'` instead of `expo-image` to ensure that NativeWind `className` styling is recognized natively without extra configuration:
  ```typescript
  import { ImageAssets } from '@/constants/assets';
  import { Image } from 'react-native';
  <Image source={ImageAssets.logoGlow} className="w-12 h-12" resizeMode="contain" />
  ```
- **Icons**: When a Figma design uses specific icons (e.g., Face ID, fingerprint, checkmarks, etc.), check if the corresponding asset file exists in the `assets/icons/` folder.
  - If a matching icon file exists (e.g., `assets/icons/faceid.png`, `assets/icons/fingerprint.png`), you **must** register it inside the central assets management file `src/constants/assets.ts` and import it (using standard React Native `Image` for rendering) rather than using inline `require` statements, custom shapes, or downloading external files.
  - **Exporting Missing Icons**: If the icon is not available in `assets/icons/`, locate its node ID in Figma and export it using the `save_screenshots` tool (using SVG or PNG format and setting the output path inside `assets/icons/`). Once saved, register the new icon in `src/constants/assets.ts` under `IconAssets` and import it.
- **Typography Native Compatibility**: React Native's NativeWind parser on iOS/Android does not reliably parse custom typography classes (like `text-title-1`) configured via CSS plugins. To ensure 100% pixel-perfect fonts on all devices, you must EITHER:
  1. Apply standard Tailwind classes mapping font-size, line-height, and font-family explicitly:
     - `text-title-1` -> `text-[24px] leading-[28px] font-poppins-semibold`
     - `text-title-2` -> `text-[20px] leading-[28px] font-poppins-semibold`
     - `text-title-3` -> `text-[16px] leading-[24px] font-poppins-semibold`
     - `text-body-1` -> `text-[16px] leading-[24px] font-poppins-medium`
     - `text-body-2` -> `text-[16px] leading-[24px] font-poppins-regular`
     - `text-body-3` -> `text-[14px] leading-[21px] font-poppins-medium`
     - `text-caption-1` -> `text-[12px] leading-[16px] font-poppins-semibold`
     - `text-caption-2` -> `text-[12px] leading-[16px] font-poppins-medium`
  2. Or use the TypeScript `ThemeTypography` styles directly in the `style` prop (e.g. `style={ThemeTypography.title1}`).
  Never combine conflicting typography classes (e.g. `text-caption-2` which sets `Poppins-Medium` combined with `font-poppins-regular`). Use explicit standard Tailwind classes for custom styling instead of mixing conflicting utilities.

---

## 5. Skill Integration & Dependencies

- **use-project-theme**: Use this skill to map visual shapes, color styles, and fonts retrieved from Figma to NativeWind utility classes and theme constants (including ThemeTypography / ThemeColors).
- **common-components**: Prioritize importing and extending generic elements (Buttons, InputFields) instead of coding them inline. Make sure they dynamically handle margin overrides from `containerClassName`.
- **naming-conventions**: Use this skill to name screens in kebab-case under `src/app/` and split private layouts in PascalCase.
- **fe-integrate-api**: Used to structure layouts to support loader components, handle network error displays, and integrate form action callbacks.
- **fix-screen-ui**: Used after screen generation to compare layout discrepancies line-by-line and correct styling or spacing errors to match the Figma design.
- **fe-perfect-pixel**: Used after initial screen layout generation to fine-tune spacing, typography, dimensions, padding, colors, and borders to match the design down to the exact pixel using mathematical gaps and image padding checks.
- **fe-review-code**: Used to verify layout compliance, responsive safety limits, component modularity, type safety, and typography classes before merging.

