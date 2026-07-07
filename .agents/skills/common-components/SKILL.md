---
name: common-components
description: Guidelines for building, organizing, and reusing generic common UI components to maintain modularity and consistency.
---

# Common Components Guidelines

This skill provides standards for creating, organizing, and utilizing reusable common UI components (e.g., custom Buttons, Input Fields, Loading Indicators, and Alerts) to prevent duplicate layouts and maintain consistency.

## 1. Architectural Rules for Common Components

A component is considered "common" if it is designed for global reuse across multiple screens. They must abide by the following rules:

1. **Zero Business Logic & Screen Dependencies**:
   - Must NOT import screen-specific states, navigation parameters, contexts, or API query functions.
   - Must be purely driven by passed props (e.g., `value`, `onChangeText`, `onPress`, `isLoading`).
2. **TypeScript Integrity**:
   - Always define a clear TypeScript prop interface (e.g., `interface ButtonProps`).
   - If extending standard elements (like `Pressable` or `TextInput`), extend their native prop types:
     ```typescript
     import { PressableProps } from 'react-native';
     interface ButtonProps extends PressableProps {
       title: string;
       isLoading?: boolean;
     }
     ```
3. ** forwarding `className` (NativeWind)**:
    - Always accept a `className?: string` or `containerClassName?: string` prop and append/merge it with the component's default classes to allow layout (margins, alignment, width) overrides.
    - **Dynamic Margin Overrides**: Reusable components must handle margin overrides gracefully. If the passed `containerClassName` or `className` contains a margin class (e.g. `mb-`, `mt-`, `my-`), the component must suppress its default spacing (e.g. `mb-4`) to prevent double-spacing or layout gaps. Implement this dynamically in the component code:
      `const marginClass = containerClassName.includes('mb-') ? '' : 'mb-4';`
4. **Theme Tokens by Default**:
    - Fallback colors, borders, typography, and shadows must always default to our Figma design system tokens, mapped using standard inline Tailwind classes (e.g. `text-[16px] leading-[24px] font-poppins-medium`) or TypeScript constants (`ThemeColors`, `ThemeTypography`) to prevent compiler issues on native platforms.
5. **Accessibility (a11y)**:
    - Provide standard accessibility props such as `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` (e.g. mapping `disabled` prop to `accessibilityState={{ disabled }}`).
6. **Use Local Icon Assets**:
    - If a common component needs to render icons (such as checkmarks, secure/password visibility icons, brand logos, or biometrics), it must search the `assets/icons/` folder, register it in the central assets management file `src/constants/assets.ts`, and import/use the registered asset via `Image` from `react-native` (with `resizeMode="contain"`), rather than using inline `require` statements, third-party SVG/vector icon libraries, or `expo-image`.
    - **Exporting Missing Icons**: If the icon is not available in `assets/icons/`, locate its node ID in Figma and export it using the `save_screenshots` tool (using SVG or PNG format) into `assets/icons/`. Register it in `src/constants/assets.ts` under `IconAssets` and import/use it via `Image`.

---

## 2. Common Components Catalog

Common components must reside directly in the root of the components folder:
`src/components/<ComponentName>.tsx`

Key common components to maintain/reuse:

- **Button**: Handles primary action styling, secondary outlines, ghost layouts (white background, red active/grey disabled text), round/circular active/disabled icon containers, loading spinners, and disabled states. Uses standard Tailwind classes `text-[16px] leading-[24px] font-poppins-medium` by default.
- **InputField**: Wraps `TextInput`, labels, active focused borders, validation errors, and toggle icon states. Handles `containerClassName` dynamic margin override to allow margins like `mb-0` or `mb-[20px]`.
- **BiometricAuth**: Fingerprint/biometric trigger of size 64x64 (`w-16 h-16`), which must have `rounded-full` to ensure circular press states and handle margins dynamically.
- **ExchangeInputField**: Input field combining numeric text entry on the left, a vertical divider line, a currency text label, and dropdown chevron on the right.
- **Avatar**: Circular profile image component that defaults to a standard vector silhouette when no source image is provided.
- **CardBank**: Card displaying Credit/Debit details with specific presets for Visa (blue background, Visa logo), Mastercard (gold/yellow background, Mastercard logo), Multi (a layered visual stack of cards), and Add-new (dashed border placeholder).
- **CardBeneficiary**: Vertical user card (100x120) with a 60x60 circular avatar, supporting standard user info and add-new beneficiary styles.
- **CategoryCard**: Square category or action button (e.g. "Transfer via card number") containing an icon and a text label. Supports primary (blue-purple background) and secondary (white background) states.
- **AmountPreset**: Rectangular amount selection button (100x60) for quick transaction amount selection (e.g. "$10"), supporting default and active states.
- **ChatBubble**: Standard message container highlighting left-aligned received bubbles (light gray/purple bg) and right-aligned sent bubbles (primary purple bg).
- **TransactionRow**: List item showcasing transactions with a left icon in a blue-purple rounded square, title, status subtitle, positive/negative transaction amounts, and separator borders.
- **InfoRow**: Configuration/settings list row showing a label on the left, a value on the right, and a right chevron indicator.
- **LanguageRow**: Language selection list item displaying a country flag, language name, and checkmark indicator when selected.
- **BillCard**: Ticket-style receipt card featuring left/right edge circular cutouts, itemized fee breakdowns, and a bold semantic-red total amount.
- **ChartCard**: Card containing balance details and a weekly bar chart with stacked progress columns (red and blue-purple segments inside a pink track).
- **NavigationBar**: Screen header navigation bar supporting white (white background, dark text) and black (primary purple background, white text) themes, back buttons (using the `arrowDownSignToNavigate` icon), and right-hand actions. Uses standard Tailwind classes `text-[20px] leading-[28px] font-poppins-semibold` by default.
- **TabBar**: Bottom navigation bar featuring dynamic pill-shaped active tabs and simple icon inactive tabs.
- **LoadingSpinner**: Standard activity indicator centered inside a view, styled with `color={ThemeColors.primary[1]}`.
- **ErrorAlert**: A reusable warning banner displaying error messages styled with semantic class `bg-semantic-1/10 border-semantic-1 text-semantic-1`.
- **Divider**: A standard grey line (`bg-neutral-5`) for visual separation.

---

## 3. Skill Integration & Dependencies

- **use-project-theme**: Refer to this skill for color styles (e.g. `bg-primary-1`), text styles (e.g. `text-body-1`), and drop shadows (e.g. `shadow-card-1`) that should be set as default prop fallback values using standard Tailwind classes or theme constants.
- **naming-conventions**: Refer to this skill for correct casing naming convention (PascalCase for component files) and folder placements.
- **fe-gen-screen**: Applied together when building screen layouts; standard buttons and text inputs should import and extend these common controls rather than coding layout overrides inline.
- **fe-integrate-api**: Used to integrate backend-independent common components (such as loader overlays, error banners, or custom form elements) into real API request-response lifecycles, showing loaders or error text correctly.
- **fix-screen-ui**: Used to ensure global buttons, input fields, dividers, and loading spinners are reused rather than replaced with raw or custom CSS code during alignment changes, handling dynamic margin overrides.
- **fe-perfect-pixel**: Refer to this skill to ensure that when shared components are customized or overridden via `className`, they respect the precise pixel-perfect design dimensions and mathematical spacings without breaking responsive layouts.
- **fe-review-code**: Serves as the audit gate verifying that common components are reused and extended rather than rewritten, and margins are handled dynamically.
