import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";

export default [
  {
    ignores: ["coverage/*", "dist/*", "node_modules/*"],
    files: ["src/**/*.{js,ts,tsx,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.strict.rules,
      ...tseslint.configs.stylistic.rules,
    },
  },
  {
    files: ["tests/**/*", "**/*.test.{js,ts,tsx}"],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
        ...globals.browser,
      },
    },
  },
];
