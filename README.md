# React + Vite 雛型

## 初期構築

```
npm create vite@latest base-react
cd base-react
npm install
# 実行
npm run dev
```

## パスエイリアスの設定

tsconfig.json に以下を追加

```
/* import alias */
"baseUrl": "./",
"paths": { "@/*": ["src/*"] }
```

### モジュール追加

パスエイリアスを vite.config.ts に反映

```
npm i -D vite-tsconfig-paths
```

vite.config.ts を変更

```
import tsconfigPaths from "vite-tsconfig-paths";
plugins: [react(), tsconfigPaths()],
```

## テスト環境構築

### モジュール追加

```
npm i -D vitest happy-dom @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

### コマンド追加

package.json の scripts に以下を追加

```
    "test": "vitest watch",
    "coverage": "vitest run --coverage"
```

### jest-dom のインポート

プロジェクトフォルダに vitest-setup.ts を作成して、以下を記述

```
import "@testing-library/jest-dom/vitest";
```

### vite.config.ts に以下を追記

```
/// <reference types="vitest" />　　　← ファイル先頭に追加(型定義)
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {                             ← ここにtestを追加
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
  },
});
```

### tsconfig.json に以下を追記

```
    /* import alias */
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] },
    "types": ["vitest/globals"]
  },
  "include": ["src", "vitest-setup.ts"],
```

## ESLint・Prettier 構築

```
npm install eslint-plugin-react@latest --save-dev
```

### .eslintrc.cjs にルールを追加

error 'React' must be in scope when using JSX のエラー回避のため

```
  rules: {
    "react/react-in-jsx-scope": "off",
  },
```

### Prettier インストール

```
npm i -D prettier
```

### prettier.config.jsを作成

※参考URL：https://qiita.com/Junpei_Takagi/items/3983cc735e71ea3917fd

```
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
};

export default config;

```

### package.json のコマンド修正

```
"lint": "eslint src",
"lint:fix": "eslint src --fix",
"format": "prettier . --write"
```

## Husky・Lint-staged 構築（gitのpush前（commit時）に構文解析）

### インストール

```
npm i -D husky lint-staged
npx husky install
```

### package.json のコマンド修正

```
"prepare": "husky install"

"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["prettier --write","eslint --fix"]
}
```

### .huskyの直下にpre-commitを作成して、以下を記述

```
npx lint-staged
```

## StoryBook構築

### storybook初期化

```
npx storybook init --builder @storybook/builder-vite
```

### storybookを実行

```
npm run storybook
```

### package.json の修正

```
  "ignorePatterns" : [
    "!.storybook"
  ]
```

## CSSフレームワーク導入

```
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.jsを修正

```
export default {
  content: ["./index.html", "./src/**/*.{js.jsx,ts,tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### index.cssの先頭に以下を追加

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### shadcn-uiをインストール

```
npx shadcn-ui@latest init

Would you like to use TypeScript (recommended)? yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no
Write configuration to components.json. Proceed? > yes
```

### tailwind.config.jsを修正

```
export.exports = {を export default {

plugins: [require("tailwindcss-animate")], を plugins: [import("tailwindcss-animate")],
```

### UIを追加

```
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
```

## その他もモジュール

```
npm i react-hook-form zod @hookform/resolvers
```
