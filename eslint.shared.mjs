import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export const typeScriptFiles = [
  "*.config.ts",
  "*.d.ts",
  "src/**/*.{ts,mts,cts,tsx}",
  "tests/**/*.{ts,mts,cts,tsx}",
];

export const javaScriptFiles = [
  "eslint.shared.mjs",
  "*.config.{js,mjs,cjs}",
  "scripts/**/*.{js,mjs,cjs}",
];

export const ignoredPaths = [
  ".eslintcache",
  ".eslintcache-fast",
  ".knipcache",
  ".next/**",
  ".playwright-cli/**",
  ".serena/**",
  ".vercel/**",
  ".vscode/**",
  "*.log",
  "*.tsbuildinfo",
  "coverage/**",
  "dist/**",
  "node_modules/**",
  "out/**",
  "playwright-report/**",
  "test-results/**",
];

export const STRICT_TYPE_AWARE_RULES = {
  "@typescript-eslint/strict-boolean-expressions": "error",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/prefer-optional-chain": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/return-await": "error",
};

export const STRICT_TYPE_AWARE_RULE_IDS = Object.freeze(
  Object.keys(STRICT_TYPE_AWARE_RULES),
);

export const toConfigArray = (configOrConfigs) =>
  Array.isArray(configOrConfigs) ? configOrConfigs : [configOrConfigs];

export const withoutTypeScriptEslintPlugin = (configOrConfigs) =>
  toConfigArray(configOrConfigs).filter(
    (config) => config.plugins?.["@typescript-eslint"] === undefined,
  );
