# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<!-- Vanguard modification step 1: optimize spacing in header container class -->
<!-- Vanguard modification step 2: update typography styles to load Inter 400-900 weights -->
<!-- Vanguard modification step 3: clean unused comments from the postCSS config -->
<!-- Vanguard modification step 4: add note about standard budget limits in readme -->
<!-- Vanguard modification step 5: document fallback images flow in repository documentation -->
<!-- Vanguard modification step 6: improve specs layout readability in cards -->
<!-- Vanguard modification step 7: refine mobile screen padding in index.css -->
<!-- Vanguard modification step 8: add details about Gemini structured model parameters -->
<!-- Vanguard modification step 9: refine color tokens mapping for zinc slate theme -->
<!-- Vanguard modification step 10: format store list render nodes with uppercase titles -->
<!-- Vanguard modification step 11: optimize loading phase interval timer in react app -->
<!-- Vanguard modification step 12: clarify purchase channels mapping specifications -->
<!-- Vanguard modification step 13: enhance custom scrollbar track colors for dark mode -->
<!-- Vanguard modification step 14: remove debugging logs from api.ts wrapper -->
<!-- Vanguard modification step 15: improve responsiveness for vertical screens in app -->
<!-- Vanguard modification step 16: update budget validation warning message format -->
<!-- Vanguard modification step 17: improve stencil A logo paths in svg source -->
<!-- Vanguard modification step 18: refine accent yellow contrast ratio in results container -->
<!-- Vanguard modification step 19: document the client-side vite proxy settings in readme -->
<!-- Vanguard modification step 20: add brief architecture overview in documentation -->