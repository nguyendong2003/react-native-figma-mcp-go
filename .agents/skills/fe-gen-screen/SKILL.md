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
   - Call `get_screenshot` with the screen frame's `id` to save a visual preview, allowing you to compare your generated code layout with the visual representation.

---

## 2. Design Translation Strategy (Pixel-Perfect & Responsive Policy)

When translating Figma designs, you must adhere to two concurrent goals: **1) Exact pixel/font matching** when the screen width matches the Figma canvas width, and **2) Fluid responsiveness** when the screen size varies (smaller phones or tablets).

### Pixel-Perfect Guidelines (At Figma Viewport Dimensions)
- **Reference Viewport**: Check the bounds (width/height) of the selected parent Figma frame (e.g., 375px width).
- **Exact Sizing**: Font sizes, line heights, paddings (`p-`, `px-`, `py-`), margins (`m-`, `mx-`, `my-`), border radii, and item gaps must map *exactly* to the Figma node values at this reference size.
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
   - Extract header titles, subheaders, back buttons, and progress indicators into a sub-component (e.g. `ScreenHeader.tsx`).
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
└── components/                 # UI Components
    ├── Button.tsx              # Generic shared button
    ├── InputField.tsx          # Generic shared input
    └── sign-in/                # Private pieces for sign-in page
        ├── SignInHeader.tsx    # Header texts and branding
        └── SocialSignIn.tsx    # Facebook / Google action buttons
```

---

## 4. Platform & Design Best Practices

- **ScrollView**: If a page contains forms or could overflow vertically on smaller mobile devices, use `<ScrollView className="flex-1 bg-neutral-6">` instead of a static `<View>`.
- **SafeAreaView**: Wrap screen content in `SafeAreaView` from `react-native-safe-area-context` to avoid layout overlapping with status bars or notches.
- **TextInput Handling**: Wrap inputs inside keyboard-avoiding views (`KeyboardAvoidingView`) on iOS so inputs remain visible when the keyboard is active.
- **Images**: Use Expo's optimized image component `Image` from `expo-image` for performance, caching, and blurhash support:
  ```typescript
  import { Image } from 'expo-image';
  <Image source={require('@/assets/images/logo.png')} className="w-12 h-12" />
  ```

---

## 5. Skill Integration & Dependencies

- **use-project-theme**: Use this skill to map visual shapes, color styles, and fonts retrieved from Figma to NativeWind utility classes and theme constants.
- **common-components**: Prioritize importing and extending generic elements (Buttons, InputFields) instead of coding them inline.
- **naming-conventions**: Use this skill to name screens in kebab-case under `src/app/` and split private layouts in PascalCase.
- **fix-screen-ui**: Used after screen generation to compare layout discrepancies line-by-line and correct styling or spacing errors to match the Figma design.
- **fe-review-code**: Used to verify layout compliance, responsive safety limits, and component modularity before merging.

