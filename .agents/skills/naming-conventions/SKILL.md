---
name: naming-conventions
description: Guidelines for naming files, functions, variables, components, Git branches, and commits to maintain a clean codebase.
---

# Code & Git Naming Conventions

This skill provides naming standards for code symbols, filesystem organization, and Git history. All new files, variables, functions, and Git records must follow these rules.

## 1. Filesystem Naming Conventions

- **Expo Router Screens & Layouts**: Use `kebab-case` or specific router symbols (e.g., `index.tsx`, `_layout.tsx`, `sign-in.tsx`, `profile-settings.tsx`).
- **Reusable Components**: Use `PascalCase` matching the component name. 
  - Generic global components must be placed directly in `src/components/` (e.g. `src/components/Button.tsx`).
  - Screen-private components must be nested under the screen name subfolder (e.g. `src/components/login/LoginHeader.tsx`).
  - Refer to the `common-components` skill for implementation constraints.
- **Hooks**: Use `camelCase` starting with `use` (e.g., `useTheme.ts`, `useAuth.ts`, `useDebounce.ts`).
- **Constants, Utils & Types**: Use `camelCase` or `kebab-case` depending on size (e.g., `theme.ts`, `apiClient.ts`, `validationUtils.ts`, `types.ts`).


---

## 2. Code Symbols Naming Conventions

- **React Components**: Use `PascalCase` (e.g., `export function PrimaryButton()`).
- **Variables & Functions**: Use `camelCase` (e.g., `const isLoading = false;`, `function handlePress()`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `export const MAX_CONTENT_WIDTH = 800;`).
- **TypeScript Types & Interfaces**: Use `PascalCase` (e.g., `interface ButtonProps`, `type ThemeColor = 'primary' | 'neutral'`).
- **Boolean Variables**: Always prefix with `is`, `has`, `should`, `can`, or `did` (e.g., `isLoading`, `hasError`, `shouldRender`, `canSubmit`, `didUpdate`).
- **Event Handler Functions**:
  - Prop callbacks: prefix with `on` (e.g., `onPress`, `onSubmit`, `onChangeText`).
  - Handler implementations: prefix with `handle` (e.g., `handlePress`, `handleSubmit`, `handleTextChange`).

---

## 3. Git Naming Conventions

### Branch Naming
Always name branches using the following prefix-based format:
`<type>/<short-description-kebab-case>`

- **feat/**: New features (e.g., `feat/email-sign-in`, `feat/profile-screen`).
- **fix/**: Bug fixes (e.g., `fix/layout-overflow`, `fix/api-headers`).
- **refactor/**: Code reorganizing or quality improvements (e.g., `refactor/reusable-cards`).
- **chore/**: Infrastructure, configs, dependency updates (e.g., `chore/tailwind-setup`, `chore/bump-expo`).
- **docs/**: Documentation changes only (e.g., `docs/api-readme`).

### Commit Messages
Write commit messages in the **Conventional Commits** format. Write the description in the **imperative mood** ("add", "fix", "change" instead of "added", "fixed", "changes").

Format:
`<type>(<scope>): <short description in present tense>`

- **feat**: A new feature (e.g., `feat(auth): add google sign-in button`).
- **fix**: A bug fix (e.g., `fix(theme): fix card drop shadow offset on iOS`).
- **refactor**: Code modification that doesn't fix a bug or add a feature (e.g., `refactor(components): extract button style components`).
- **chore**: Build process, configs, or auxiliary tools/libraries changes (e.g., `chore(deps): update nativewind to 4.2.6`).
- **docs**: Documentation edits (e.g., `docs(readme): add mcp plugin connection instructions`).
- **style**: Changes that do not affect the meaning of the code (e.g., formatting, missing semi-colons).

---

## 4. Skill Integration & Dependencies

- **common-components**: Sets the folder organization rules: generic components belong directly under `src/components/`, while screen-private components are grouped by screen name.
- **fe-gen-screen**: Determines screen file paths under `src/app/` (using lowercase kebab-case) and private screen components under `src/components/<screen-name>/`.
- **use-project-theme**: Determines naming structure for styling variables, custom Tailwind configuration extensions, and Theme constants.
- **fe-integrate-api**: Controls file and symbol naming rules for query hooks, API client utils, and type models.
- **fix-screen-ui**: Ensures that filenames for any refactored private components under `src/components/<screen-name>/` follow correct casing rules.
- **fe-perfect-pixel**: Ensures that any component files, assets, or constants added during pixel-perfect alignment follow naming and folder conventions.
- **fe-review-code**: Used to audit file structure, naming casing, and Git branch/commit logs before closing tasks.


