---
name: fe-integrate-api
description: Guidelines for integrating REST APIs, managing async states, writing TypeScript typings, and handling request errors gracefully.
---

# Frontend API Integration Guidelines

This skill documents the rules and patterns for connecting React Native/Expo components to backend REST APIs, managing state, handling failures, and implementing secure storage.

## 1. Network Client & Request Setup

- **Centralized Client**: Avoid writing bare `fetch` or `axios` calls directly inside screens. Use a configured client/wrapper (e.g., an `apiClient.ts` utility) that automatically resolves the Base URL, sets `Content-Type: application/json`, and attaches Authorization bearer tokens.
- **Environment Variables**: Configure your API base URL using Expo environment variables (`process.env.EXPO_PUBLIC_API_URL`) rather than hardcoding IP addresses or domains.
- **Authentication**: Store bearer tokens securely using `expo-secure-store` rather than standard `AsyncStorage`, as standard storage is not encrypted.
  ```typescript
  import * as SecureStore from 'expo-secure-store';
  
  export async function saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  ```

---

## 2. TypeScript Typing Standards

- **Strict Models**: Always write explicit interfaces for request payloads and response bodies. Never use `any` or `unknown` as the final data type.
  ```typescript
  export interface UserProfileResponse {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  }

  export interface UpdateProfileRequest {
    fullName: string;
    avatarUrl?: string;
  }
  ```
- **Read-Only / Immutable Typings**: If appropriate, make response objects read-only to prevent accidental client-side mutation.

---

## 3. Asynchronous State Management

When fetching or mutating data, always handle the three core states: **Loading**, **Success**, and **Error**.

### Basic Hook Pattern
If fetching directly in a hook, ensure a clean state lifecycle:
```typescript
import { useState, useEffect } from 'react';

export function useFetchData<T>(apiFunc: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    setLoading(true);
    apiFunc()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Something went wrong');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiFunc]);

  return { data, loading, error };
}
```

---

## 4. Error Handling & Visual Feedback

- **User-Friendly Error Extraction**: Map raw network errors (like status code 400 or 500) into friendly messages (e.g. "Network error, please check your internet connection" or "Incorrect email or password").
- **Graceful Failures**: Wrap page integrations in try/catch. Never let a failed API request freeze the UI or crash the application.
- **Error & Loading Visuals**: 
  - Standardize error display by utilizing the shared `ErrorAlert` common component (detailed in the `common-components` skill) rather than coding raw, ad-hoc red views.
  - Standardize API loader overlays by rendering the shared `LoadingSpinner` common component.
  - Standard error elements are styled with semantic classes: error messages use `text-semantic-1` (Red/Error color), and alert boxes use `bg-semantic-1/10 border border-semantic-1 text-semantic-1`.

---

## 5. Skill Integration & Dependencies

- **common-components**: Use the `LoadingSpinner` and `ErrorAlert` generic components to represent asynchronous query states.
- **naming-conventions**: Standardize naming for request/response interfaces, event handlers (prefixed with `handle`), and hook files.
- **use-project-theme**: Use semantic theme colors (`text-semantic-1`) for inline validation feedback or warning banners.
- **fe-review-code**: Used to audit asynchronous state lifecycles, verify strict TypeScript typings, and review secure token storage.


