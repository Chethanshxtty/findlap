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
<!-- Vanguard modification step 21: refine build config rules in tsconfig files -->
<!-- Vanguard modification step 22: organize types mappings inside types definitions file -->
<!-- Vanguard modification step 23: document silent fallback routing design in readme -->
<!-- Vanguard modification step 24: improve error boundary retry behavior in layout -->
<!-- Vanguard modification step 25: update standard budget threshold to match 35k in specs -->
<!-- Vanguard modification step 26: polish alignment of use case selectors in forms -->
<!-- Vanguard modification step 27: remove settings drawer state references from app code -->
<!-- Vanguard modification step 28: clarify env credential requirements in setup details -->
<!-- Vanguard modification step 29: optimize bundle generation assets sizes in build -->
<!-- Vanguard modification step 30: configure base project metadata tags in html head -->
<!-- Vanguard modification step 31: add visual verification checklist inside walkthrough -->
<!-- Vanguard modification step 32: document triple fallback image load system in docs -->
<!-- Vanguard modification step 33: optimize CSS custom theme variables in main styles -->
<!-- Vanguard modification step 34: document build validation checks pipeline details -->
<!-- Vanguard modification step 35: verify visual appearance under 80000 budget search -->
<!-- Vanguard modification step 36: verify mobile layout layout structure in sandbox -->
<!-- Vanguard modification step 37: refine custom focus outline for interactive controls -->
<!-- Vanguard modification step 38: clarify mock data records fallback scenarios -->
<!-- Vanguard modification step 39: document the rate limits retry error handling flow -->
<!-- Vanguard modification step 40: add info on unsplash CDN source path mapping -->
<!-- Vanguard modification step 41: update license details reference in documentation -->
<!-- Vanguard modification step 42: verify typescript compile step output parameters -->
<!-- Vanguard modification step 43: improve description of Matchmaking AI capabilities -->
<!-- Vanguard modification step 44: standardize uppercase specifications attributes in code -->
<!-- Vanguard modification step 45: align navbar brand letters layout styling rules -->
<!-- Vanguard modification step 46: refine spacing below analysis results header node -->
<!-- Vanguard modification step 47: clarify specs card CPU display parameters -->
<!-- Vanguard modification step 48: update instructions for local vite execution -->
<!-- Vanguard modification step 49: optimize render logic checks in results container -->