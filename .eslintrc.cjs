module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    // "no-console": ["error", { allow: ["warn", "error"] }],
    // "no-restricted-imports": [
    //   "error",
    //   {
    //     paths: [
    //       {
    //         name: "axios",
    //         message: "Please import axios from 'extends/AxiosClientProvider'.",
    //       },
    //     ],
    //   },
    // ],
  },
  settings: {
    react: { version: "detect" },
  },
};
