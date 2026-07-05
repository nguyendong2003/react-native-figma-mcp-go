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
   - Always accept a `className?: string` prop and append/merge it with the component's default classes to allow layout (margins, alignment, width) overrides.
   - Example:
     ```typescript
     export function Button({ className, title, ...props }: ButtonProps) {
       return (
         <Pressable className={`bg-primary-1 py-3 px-6 rounded-xl items-center ${className || ''}`} {...props}>
           <Text className="text-neutral-6 text-title-3 font-semibold">{title}</Text>
         </Pressable>
       );
     }
     ```
4. **Theme Tokens by Default**:
   - Fallback colors, borders, typography, and shadows must always default to our Figma design system tokens (`bg-primary-1`, `text-neutral-1`, `text-body-1`, `shadow-card-1`, etc.).
5. **Accessibility (a11y)**:
   - Provide standard accessibility props such as `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` (e.g. mapping `disabled` prop to `accessibilityState={{ disabled }}`).

---

## 2. Common Components Catalog

Common components must reside directly in the root of the components folder:
`src/components/<ComponentName>.tsx`

Key common components to maintain/reuse:
- **Button**: Handles primary action styling, secondary outlines, loading spinners, and disabled states.
- **InputField**: Wraps `TextInput`, labels, validation errors, and toggle icon states (like secure text eye icon).
- **LoadingSpinner**: Standard activity indicator centered inside a view, styled with `color={ThemeColors.primary[1]}`.
- **ErrorAlert**: A reusable warning banner displaying error messages styled with semantic class `bg-semantic-1/10 border-semantic-1 text-semantic-1`.
- **Divider**: A standard grey line (`bg-neutral-5`) for visual separation.

---

## 3. Skill Integration & Dependencies

- **use-project-theme**: Refer to this skill for color styles (e.g. `bg-primary-1`), text styles (e.g. `text-body-1`), and drop shadows (e.g. `shadow-card-1`) that should be set as default prop fallback values.
- **naming-conventions**: Refer to this skill for correct casing naming convention (PascalCase for component files) and folder placements.
- **fe-gen-screen**: Applied together when building screen layouts; standard buttons and text inputs should import and extend these common controls rather than coding layout overrides inline.
- **fe-review-code**: Serves as the audit gate verifying that common components are reused and extended rather than rewritten.

