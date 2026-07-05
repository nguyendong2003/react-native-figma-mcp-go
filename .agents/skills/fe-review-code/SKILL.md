---
name: fe-review-code
description: Guidelines and checklists for reviewing frontend code quality, performance optimizations, style compliance, and Expo/React Native conventions.
---

# Frontend Code Review Guidelines

This skill defines the criteria and checklist items for conducting code reviews in this workspace. All code edits, new components, and refactorings must be evaluated against these principles.

## 1. Design System & Style Compliance

- **No Magic Colors or Styles**: Ensure there are no hardcoded hex codes (like `#3f51b5`) or ad-hoc styles in components. They must use either:
  - Theme utility classes (e.g., `bg-primary-1`, `text-neutral-3`, `shadow-card-1`).
  - Core constants (e.g., `ThemeColors.primary[1]`, `ThemeTypography.title2`).
- **No Redundant Component Code**: Check if the code recreates generic elements (such as standard buttons, text inputs, spinners, or alert banners) from scratch. Ensure they import and extend the generic component versions from `src/components/` as mandated by the `common-components` skill.
- **Responsive Layout Check**: Check that layouts do not use fixed width/height containers unless explicitly required (e.g. icons, avatars). Use flexbox classes (`flex-1`, `w-full`, `gap-4`) to ensure fluidity across devices.
- **Import Order**:

  1. React and React Native core imports.
  2. Expo packages (e.g. `expo-router`, `expo-image`).
  3. Third-party npm packages.
  4. Absolute imports (`@/components/...`, `@/constants/...`).
  5. Relative imports (`../`, `./`).

---

## 2. TypeScript and Type Safety

- **No Implicit/Explicit `any`**: Ensure all props, variables, functions, and API responses are typed properly. Use interfaces or type aliases.
- **Proper Prop Mappings**: Custom UI components must define a clear prop interface (e.g. `interface ButtonProps`). If extending native components, use `ComponentProps` (e.g. `React.ComponentProps<typeof Pressable>`).

---

## 3. React Performance & Optimization

- **Avoid Unnecessary Re-renders**:
  - Do not create inline Arrow Functions inside rendering loops or lists unless trivial. Use `useCallback` when passing callbacks to performance-sensitive child components (like custom list items).
  - Use `useMemo` for heavy data transformation or filtering.
- **Correct Key Usage**: Lists rendered with `.map()` or inside `<FlatList>` must use a stable, unique ID as the `key`. Never use the array index (`index`) as a key if the list items can be reordered, deleted, or inserted dynamically.
- **Async & Cleanup Rules**: Ensure all async actions inside `useEffect` check if the component is still mounted before setting state, and always return a cleanup function to unsubscribe from listeners, clear timeouts/intervals, or abort fetch requests.

---

## 4. Expo & React Native Best Practices

- **SafeArea & Notch Handling**: Verify screen elements do not overlap with notches or status bars. Screens must be wrapped in `<SafeAreaView>` or use safe area insets hook (`useSafeAreaInsets()`).
- **Keyboard Handling**: Form pages must use `<KeyboardAvoidingView>` (configured with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}`) to avoid text inputs being hidden behind the keyboard.
- **Platform Conditions**: Look out for OS-specific issues. Use `Platform.OS === 'ios'` or `Platform.select()` if styles or behaviors vary significantly between platforms.

---

## 5. Skill Integration & Dependencies

This review skill acts as the final quality gate that orchestrates and validates compliance with all other workspace skills:
- **naming-conventions**: Audit casing rules (PascalCase vs. camelCase) and verify Git branch/commit conventions.
- **use-project-theme**: Enforce complete design token coverage and reject any hardcoded hex codes.
- **common-components**: Enforce the reuse of shared buttons, inputs, dividers, and alert boxes, preventing custom duplicates.
- **fe-gen-screen**: Check component decomposition, responsive behavior limits, scroll container safety, and safe area handling.
- **fe-integrate-api**: Check asynchronous loading hook lifecycles, memory leak checks, and strict TS interfaces.

