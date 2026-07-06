---
name: fe-perfect-pixel
description: Guides the agent on how to read a selected screen/component in Figma from figma-mcp-go and make it pixel-perfect based on the Figma design.
---

# Pixel-Perfect Frontend Alignment Skill

This skill provides comprehensive instructions for executing pixel-perfect UI alignment using the `figma-mcp-go` MCP server to match implemented screens and components exactly with the Figma design.

## 0. Command Usage: `fe-perfect-pixel <screen-name>`

When the user enters `fe-perfect-pixel <screen-name>` in the chat:

1. **Trigger Action**: Treat this as a request to inspect the currently selected frame/nodes in Figma and align `src/app/<screen-name>.tsx` (and all sub-components under `src/components/<screen-name>/` or shared `src/components/`) to be pixel-perfect.
2. **File Location**:
   - Locate the main screen orchestrator at `src/app/<screen-name>.tsx` (using lowercase kebab-case).
   - Locate screen-private components under `src/components/<screen-name>/`.
3. **Execution Flow**:
   - Call `get_selection` to fetch the selected Figma node details.
   - Run a deep comparison of properties: exact coordinates, bounding boxes, sizing, colors, text styles, line heights, paddings, and margins.
   - Call `get_screenshot` on the screen frame to save a visual preview, allowing you to perform visual audits.
   - Refactor the codebase to make it match the design down to the pixel.

---

## 1. Meticulous Figma Property Extraction

To make a screen pixel-perfect, you must extract and map the following details using Figma MCP tools:

### A. Viewport and Bounding Boxes
- **Figma Canvas Width/Height**: Identify the parent frame's width (typically `375px` or `390px`) and height. This is your baseline viewport.
- **Node Dimensions**: Extract `width` and `height` of child components (e.g. Buttons, Avatars, Cards).
- **Positioning and Alignment**:
  - Check the horizontal alignment: centered, stretched, or fixed offsets from left/right margins.
  - Check the vertical spacing: always compute the vertical gap between consecutive elements mathematically using bounding boxes: `gap = next.y - (prev.y + prev.height)`. Never estimate spacing; calculate it down to the exact pixel.
- **Image/Icon Asset Padding**: Check for transparent padding inside image/icon PNG/SVG assets (using Python scripts to find the non-transparent bounding box). If the asset has transparent padding, its visual dimensions will be smaller than its bounding box. You must adjust its layout or margins, or crop the image to ensure pixel-perfect matching.

### B. Typography Details
- **Font Specifications**: Inspect typography styles using `get_styles` or looking at the node properties. Look for:
  - `fontSize` (e.g., `24px` -> `text-title-1`)
  - `lineHeightPx` or `lineHeightPercent` (crucial to prevent text from shifting vertically or clipping)
  - `fontWeight` (e.g., `600` -> SemiBold, `500` -> Medium, `400` -> Regular)
  - `letterSpacing`

### C. Styling (Fills, Strokes, Effects)
- **Fills**: Check fill types (solid color hexes, linear/radial gradients).
- **Strokes**: Look for border colors, border widths, and stroke alignment (Inside, Outside, Center).
- **Corner Radius**: Extract exact corner radius values (`cornerRadius` or independent corners) to ensure perfectly rounded cards/inputs.
- **Effects (Shadows)**: Check shadow properties: offset `x`/`y`, blur radius, and color opacity.

---

## 2. Pixel-Perfect Translation Rules (Figma-to-Tailwind/NativeWind)

When translating Figma attributes to code, adhere strictly to the following standards:

### A. Dimensions & Spacing Mapping
- Translate pixel coordinates and distances to Tailwind spacing classes. If the spacing does not match a Tailwind default step (e.g. 18px), use Tailwind's arbitrary value syntax:
  - `18px` -> `mt-[18px]` or `gap-[18px]`
  - `32px` -> `px-8` (or `px-[32px]`)
- Let components expand horizontally (`w-full` or `self-stretch`) but apply responsive bounds (e.g., `max-w-[420px] mx-auto`) so the screen scales elegantly without losing layout proportions.
- Make reusable components dynamically accept and apply margins by checking for `mb-` or `mt-` classes in their `containerClassName` or `className` props to avoid duplicate/conflicting margins.

### B. Typography Alignment
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
  2. Or use the TypeScript `ThemeTypography` styles directly in the `style` prop (e.g., `style={ThemeTypography.title1}`).
- Never combine conflicting typography classes (e.g. `text-caption-2` which sets `Poppins-Medium` combined with `font-poppins-regular`). Use explicit standard Tailwind classes for custom styling instead of mixing conflicting utilities.
- If line-height is explicitly custom in Figma, append the arbitrary line-height class (e.g., `leading-[30px]`) to ensure correct vertical typography spacing.

### C. Color & Effect Consistency
- Do not use hardcoded hex codes. Map colors directly to the theme tokens (e.g., `#3629B7` -> `bg-primary-1`).
- Map shadow properties exactly. Use predefined shadow classes (`shadow-card-1`, `shadow-card-2`, `shadow-tab-bar`). If a custom shadow is used, configure it via tailwind.config.js or apply inline style constants derived from `ThemeEffects`.

---

## 3. Visual Verification Workflow

1. **Export Screenshots**: Call `save_screenshots` with the node/frame ID of the Figma design to write screenshots directly to disk (into allowed working folders).
2. **Compare Implementation**: Run your React Native dev server and visually inspect the screen. Use visual inspection tools to compare the actual render against the Figma screenshot.
3. **Iterative Refinement**: Adjust fine margins, line-heights, flex layouts, and padding until the code layout visually mirrors the Figma screenshot down to the exact pixel.

---

## 4. Skill Integration & Dependencies

- **fe-gen-screen**: Provides the baseline layout structure. `fe-perfect-pixel` is the subsequent step focusing on visual precision and alignment details.
- **fix-screen-ui**: Used to run quick checks on alignment checklists. `fe-perfect-pixel` provides the deeper math, pixel measurements, and screenshot comparisons.
- **use-project-theme**: Used to match Figma visual tokens to NativeWind utility classes and ThemeTypography / ThemeColors constants.
- **common-components**: Shared inputs/buttons must be configured to support custom dimensions/paddings and handle margin overrides dynamically through the `containerClassName` or `className` props.
- **naming-conventions**: Ensures that files modified/refactored follow component naming conventions.
- **fe-integrate-api**: Ensures that loading skeletons, spinners, and error alerts are also styled pixel-perfectly matching Figma.
- **fe-review-code**: The code review checklist verifies that all pixel-perfection adjustments respect responsive layouts, avoid conflicting typography classes, and calculate spacings mathematically.
