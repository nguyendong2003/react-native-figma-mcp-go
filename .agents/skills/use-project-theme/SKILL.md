---
name: use-project-theme
description: Guides the agent on how to apply the project's Figma-derived styling theme (colors, typography, shadows) using NativeWind utility classes or the ThemeConstants.
---

# Figma Design System Theme Integration

This skill outlines the design tokens retrieved from Figma and instructs the agent how to style React Native screens consistently using NativeWind/Tailwind CSS and TypeScript theme definitions.

## 1. Theme Colors

Use these colors for backgrounds, borders, texts, fills, etc.

### NativeWind Classes

- **Primary Palette**:
  - `bg-primary-1` / `text-primary-1` / `border-primary-1` (Base brand color: `#3629B7`)
  - `bg-primary-2` / `text-primary-2` / `border-primary-2` (Medium-light brand: `#5655B9`)
  - `bg-primary-3` / `text-primary-3` / `border-primary-3` (Light brand: `#A8A3D7`)
  - `bg-primary-4` / `text-primary-4` / `border-primary-4` (Light background brand tint: `#F2F1F9`)
- **Neutral Palette**:
  - `bg-neutral-1` / `text-neutral-1` / `border-neutral-1` (Dark text/headings: `#343434`)
  - `bg-neutral-2` / `text-neutral-2` / `border-neutral-2` (Subheadings/medium dark: `#898989`)
  - `bg-neutral-3` / `text-neutral-3` / `border-neutral-3` (Body text/secondary: `#989898`)
  - `bg-neutral-4` / `text-neutral-4` / `border-neutral-4` (Borders/dividers/disabled: `#CACACA`)
  - `bg-neutral-5` / `text-neutral-5` / `border-neutral-5` (Light borders/inactive backgrounds: `#E0E0E0`)
  - `bg-neutral-6` / `text-neutral-6` / `border-neutral-6` (White: `#FFFFFF`)
- **Semantic Palette**:
  - `bg-semantic-1` / `text-semantic-1` (Red - Error / Danger: `#FF4267`)
  - `bg-semantic-2` / `text-semantic-2` (Blue - Info / Links: `#0890FE`)
  - `bg-semantic-3` / `text-semantic-3` (Yellow - Warning: `#FFAF2A`)
  - `bg-semantic-4` / `text-semantic-4` (Green - Success: `#52D5BA`)
  - `bg-semantic-5` / `text-semantic-5` (Orange - Alert / Attention: `#FB6B18`)

### TypeScript Constant Fallback

Import `ThemeColors` from `@/constants/theme` for inline styles or prop passing:

```typescript
import { ThemeColors } from '@/constants/theme';
// Example: ThemeColors.primary[1] -> '#3629B7'
```

---

## 2. Typography

Always apply the preconfigured typography styles to maintain font consistency (all texts use the Poppins font).

### NativeWind Style Classes

Apply these direct classes instead of setting font sizes, weights, and leading independently:

- `text-title-1` (Poppins SemiBold, Size: 24px, Line Height: 28px)
- `text-title-2` (Poppins SemiBold, Size: 20px, Line Height: 28px)
- `text-title-3` (Poppins SemiBold, Size: 16px, Line Height: 24px)
- `text-body-1` (Poppins Medium, Size: 16px, Line Height: 24px)
- `text-body-2` (Poppins Regular, Size: 16px, Line Height: 24px)
- `text-body-3` (Poppins Medium, Size: 14px, Line Height: 21px)
- `text-caption-1` (Poppins SemiBold, Size: 12px, Line Height: 16px)
- `text-caption-2` (Poppins Medium, Size: 12px, Line Height: 16px)

### TypeScript Constant Fallback

Import `ThemeTypography` from `@/constants/theme`:

```typescript
import { ThemeTypography } from '@/constants/theme';
// Example: <Text style={ThemeTypography.title1}>Hello</Text>
```

---

## 3. Shadows / Effects

Use these shadows to style cards, overlays, and bottom tab bars.

### NativeWind Shadow Classes

- `shadow-card-1` (Blur: 30, Y: 4, Color: `#3629B7` @ 7% opacity) - standard cards
- `shadow-card-2` (Blur: 30, Y: 5, Color: `#000000` @ 5% opacity) - secondary cards
- `shadow-tab-bar` (Blur: 30, Y: -5, Color: `#3629B7` @ 7% opacity) - elevated bottom navigation bar

### TypeScript Constant Fallback

Import `ThemeEffects` from `@/constants/theme`:

```typescript
import { ThemeEffects } from '@/constants/theme';
// Example: <View style={[ThemeEffects.card1, { backgroundColor: '#fff' }]}>...</View>
```

---

## 4. Coding Instructions for Screen Generation

When building screens:

1. **Always use these styles** rather than ad-hoc hex codes or default tailwind sizes (like `text-2xl`, `bg-blue-500`, `shadow-md`).
2. Make sure `import '@/global.css';` is present in any entry routing or index screen so that Tailwind compiled stylesheets are correctly imported in the React Native runtime.
3. Import `ThemeColors`, `ThemeTypography`, and `ThemeEffects` from `@/constants/theme` when NativeWind className syntax is insufficient (e.g. for custom animations or React Native components expecting native styling).
4. **Use Common Components**: When applying these colors, typography, or effects on standard elements (like buttons or cards), always utilize the shared UI elements detailed in the `common-components` skill.
5. **Use Local Icon Assets**: When translating screens or custom components that utilize icons from the Figma design (e.g. Face ID, fingerprint, checkmarks), check the `assets/icons/` directory. If a matching icon file exists, register it in the central assets management file `src/constants/assets.ts` and import it using standard React Native `Image` (with `resizeMode="contain"` and `className`) instead of `expo-image` (so that NativeWind `className` classes are fully recognized), and avoid using inline `require` statements, styling custom graphics, or utilizing external vector icon libraries.

---

## 5. Skill Integration & Dependencies

- **common-components**: Shared UI controls must consume this theme by default so that all brand buttons, input fields, loader spinners, and alert borders match the Figma design system out of the box.
- **fe-gen-screen**: Provides the Tailwind class name mappings and style structures to use during design-to-code translation.
- **fix-screen-ui**: Used to map direct color hex values or typography styles from Figma into NativeWind classes and project constants during alignment corrections.
- **fe-review-code**: Used as the auditing standard to eliminate hardcoded hex codes or ad-hoc margins.
