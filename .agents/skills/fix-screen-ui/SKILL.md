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
- **Gaps & Margins**: Map pixel distances from Figma (e.g., `y` offsets difference between adjacent elements) to Tailwind gaps or margins (e.g., `gap-4`, `mt-6`).
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
- Map Figma text styles to NativeWind typography classes:
  - `Title / 1` (Size 24, LineHeight 28, SemiBold) -> `text-title-1`
  - `Title / 2` (Size 20, LineHeight 28, SemiBold) -> `text-title-2`
  - `Title / 3` (Size 16, LineHeight 24, SemiBold) -> `text-title-3`
  - `Body / 1` (Size 16, LineHeight 24, Medium) -> `text-body-1`
  - `Body / 2` (Size 16, LineHeight 24, Regular) -> `text-body-2`
  - `Body / 3` (Size 14, LineHeight 21, Medium) -> `text-body-3`
  - `Caption / 1` (Size 12, LineHeight 16, SemiBold) -> `text-caption-1`
  - `Caption / 2` (Size 12, LineHeight 16, Medium) -> `text-caption-2`

---

## 2. Refactoring & Verification

1. **Modify Code**: Edit the files containing layout errors using replacement tools. Ensure to keep styling logic modular.
2. **Review Code Guidelines**: Verify compliance against the `fe-review-code` guidelines (no hardcoded hex colors, appropriate platform-specific logic).
3. **Verify Type Safety & Lints**: Run `npx tsc --noEmit` and check for compile-time errors to ensure changes are correct.

---

## 3. Skill Integration & Dependencies

- **fe-gen-screen**: Defines the screen layout structure and component decomposition standards to evaluate against.
- **use-project-theme**: Used to map direct color hex values or typography styles from Figma into NativeWind classes and project constants.
- **common-components**: Used to ensure global buttons, input fields, dividers, and loading spinners are reused rather than replaced with raw or custom CSS code during alignment changes.
- **naming-conventions**: Ensures that filenames for any refactored private components under `src/components/<screen-name>/` follow correct casing rules.
- **fe-review-code**: The final quality gate ensuring that layout fixes do not introduce duplicate components, hardcoded values, or type errors.
