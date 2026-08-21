import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-useless-assignment": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      //"react-hooks/exhaustive-deps": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "react/react-in-jsx-scope": "off",
      "max-len": [1, { code: 400 }],
      "no-underscore-dangle": "error",
      "unused-imports/no-unused-imports": "error",
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars" : "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    }
  },
]);