# ZythoFront : React + TypeScript + Vite

## Context 
Suite à la mise en place d'une API REST pour manipuler les données sur les bières, nous passons à la création d'une interface utilisateur intuitive et attrayante. Cette interface sera la vitrine de notre application et proposera une expérience fluide et agréable pour les amateurs de bières.

## Fonctionnalitées
L'application dispose :
- d'une page "Bières" : 
  - ✅ avec le catalogue de l'ensemble des bières artisanales disponible
  - ✅ possibilité de filtrer par : nom, origine et type de bière
  - ✅ la possibilité de voir le détail de chaque bière 
  - ✅ Possibilité d'éditer une bière si user authentifié comme "admin"

- Un répertoire de brasseries :
  - ✅ avec la liste de l'ensemble des brasseries existante
  - ✅ fiche detail de chaque brasserie disponible + l'ensemble des bières associées à cette dernière 
  - ✅ possibilité de filtrer par : nom et pays

- Un système d'authentification avec 2 rôles : user ou admin.
  - email: "admin@gmail.com", password: "123456789", role: 'admin'
  - email: "user@gmail.com", password: "123456789", role: 'user'


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
