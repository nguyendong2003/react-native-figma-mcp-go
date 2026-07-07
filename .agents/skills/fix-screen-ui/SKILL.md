---
name: fix-screen-ui
description: Re-checks the implemented React Native UI components against the selected Figma node design details, resolving any spacing, sizing, color, or typography discrepancies.
---

# UI Adjustment and Alignment Skill

This skill defines the workflow for comparing an existing React Native screen and its components against a selected Figma frame, identifying alignment/styling discrepancies, and automatically correcting them.

## 0. Command Usage: `fix-screen-ui <screen-name>`

When the user enters `fix-screen-ui <screen-name>` in the chat:

1. **Trigger Action**: Treat this as a request to compare and fix the layout of `src/app/<screen-name>.tsx` (and its sub-components under `src/components/<screen-name>/`) to match the selected frame in Figma.
2. **File Location**:
   - Locate the main screen at `src/app/<screen-name>.tsx` (using lowercase kebab-case).
   - Locate screen-private components under `src/components/<screen-name>/`.
3. **Execution Flow**:
   - Immediately call `get_selection` to inspect the selected Figma node's hierarchy, layout, coordinates, styles, and values.
   - Read existing component files using file viewing tools.
   - Run the audit checklist and apply fixes directly to match the design.

---

## 1. Audit and Mapping Checklist

Verify the following properties between the Figma JSON output and the React Native code:

### A. Layout & Spacing

- **Relative Coordinates**: Ensure items are aligned horizontally and vertically using flexbox properties (`justify-center`, `items-center`, `self-stretch`, `flex-row`).
- **Gaps & Margins**: Always calculate vertical gaps mathematically using bounding boxes: `gap = next.y - (prev.y + prev.height)`. Never estimate spacing; calculate it down to the exact pixel. Map pixel distances to Tailwind arbitrary spacing values (e.g. `mt-[12px]`, `gap-[20px]`).
- **Image/Icon Asset Padding**: Check for transparent padding inside image/icon PNG/SVG assets (using Python scripts to find non-transparent bounds). If the asset has transparent padding, its visual dimensions will be smaller than its bounding box. You must adjust its layout or margins, or crop the image to ensure pixel-perfect matching.
- **Sizing**: Interactive containers (inputs, buttons) should stretch appropriately (`w-full`) but respect max-width boundaries (`max-w-[420px] mx-auto`) for responsiveness.

### B. Color Styles

- Compare fills and stroke color hexes from Figma styles with our project's custom Tailwind theme tokens:
  - `#3629B7` -> `bg-primary-1` / `text-primary-1`
  - `#5655B9` -> `bg-primary-2` / `text-primary-2`
  - `#A8A3D7` -> `bg-primary-3` / `text-primary-3`
  - `#F2F1F9` -> `bg-primary-4` / `text-primary-4`
  - `#343434` -> `text-neutral-1`
  - `#898989` -> `text-neutral-2`
  - `#989898` -> `text-neutral-3`
  - `#CACACA` -> `border-neutral-4`
  - `#E0E0E0` -> `bg-neutral-5` / `border-neutral-5`
  - `#FFFFFF` -> `bg-neutral-6` / `text-neutral-6`
  - `#FF4267` -> `text-semantic-1` (Error)
  - `#0890FE` -> `text-semantic-2` (Info)

### C. Typography

- Native Platform Compatibility Warning: React Native's NativeWind parser on iOS/Android does not reliably parse custom typography classes (like `text-title-1`) configured via CSS plugins. To ensure 100% pixel-perfect fonts on all devices, you must EITHER:
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
- Never combine conflicting typography classes (e.g. `text-caption-2` which sets `Poppins-Medium` combined with `font-poppins-regular`). Use explicit standard Tailwind classes for custom styling instead of mixing conflicting utilities.

### D. Icons & Assets

- **Check Assets Folder**: Verify if any icons used in the Figma design (e.g. Face ID, fingerprint, checkmarks, eye toggles) are stored in the `assets/icons/` folder.
- **Export and Use Matching Icons**: Ensure that instead of rendering custom shapes, text-based symbols, or downloading third-party icons, you register and use the matching icon:
  - If the icon file is not available in `assets/icons/`, export it from Figma using the `save_screenshots` tool (e.g., SVG/PNG format) into `assets/icons/`.
  - Register it in the central assets management file `src/constants/assets.ts` under `IconAssets` and import/use it using standard React Native `Image`.

---

## 2. Refactoring & Verification

1. **Modify Code**: Edit the files containing layout errors using replacement tools. Ensure to keep styling logic modular.
2. **Review Code Guidelines**: Verify compliance against the `fe-review-code` guidelines (no hardcoded hex colors, appropriate platform-specific logic).
3. **Verify Visuals**: Use `save_screenshots` to write Figma screenshots to disk in the allowed working folders and visually inspect the differences.
4. **Verify Type Safety & Lints**: Run `npx tsc --noEmit` and check for compile-time errors to ensure changes are correct.

---

## 3. Skill Integration & Dependencies

- **fe-gen-screen**: Defines the screen layout structure and component decomposition standards to evaluate against.
- **use-project-theme**: Used to map direct color hex values or typography styles from Figma into NativeWind classes and project constants (including ThemeTypography / ThemeColors) during alignment corrections.
- **common-components**: Used to ensure global buttons, input fields, dividers, and loading spinners are reused and handle margin overrides dynamically rather than replaced with raw or custom CSS code during alignment changes.
- **naming-conventions**: Ensures that filenames for any refactored private components under `src/components/<screen-name>/` follow correct casing rules.
- **fe-integrate-api**: Ensures that error layouts, loading overlays, and async state feedback elements are correctly aligned and positioned matching Figma's specifications.
- **fe-perfect-pixel**: Works hand-in-hand to verify pixel-level styling, exact element margins, bounding box dimensions, and visual matching using screenshot overlays (via save_screenshots), taking the general corrections of `fix-screen-ui` a step further.
- **fe-review-code**: The final quality gate ensuring that layout fixes do not introduce duplicate components, conflicting typography classes, hardcoded values, or type errors.
