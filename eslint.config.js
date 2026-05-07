import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Ignotre builds del front y dependencias
  { 
    ignores: ["node_modules/**", "dist/**"]
  },
  // 2. Backend server/**
  {
    files: ["_server_/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node }
  }
},
// 3. Frontend src/**
{
    files: ["src/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser }
    }
  },
]);