import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Configuración base de ESLint
  eslint.configs.recommended,

  // Configuración para TypeScript
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
