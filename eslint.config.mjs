import { fixupConfigRules } from "@eslint/compat";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";
import tseslint from "typescript-eslint";

import {
  STRICT_TYPE_AWARE_RULES,
  ignoredPaths,
  javaScriptFiles,
  toConfigArray,
  tsconfigRootDir,
  typeScriptFiles,
  withoutTypeScriptEslintPlugin,
} from "./eslint.shared.mjs";

const scopedNextCoreWebVitals = withoutTypeScriptEslintPlugin(
  fixupConfigRules(nextCoreWebVitals),
).map((config) => ({
  ...config,
  files: typeScriptFiles,
}));

const strictTypeCheckedConfigs = toConfigArray(
  tseslint.configs.strictTypeChecked,
).map((config) => ({
  ...config,
  files: typeScriptFiles,
  languageOptions: {
    ...config.languageOptions,
    parserOptions: {
      ...config.languageOptions?.parserOptions,
      projectService: true,
      tsconfigRootDir,
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      ...config.languageOptions?.globals,
    },
  },
}));

const disableTypeCheckedForJavaScript = toConfigArray(
  tseslint.configs.disableTypeChecked,
).map((config) => ({
  ...config,
  files: javaScriptFiles,
}));

export default tseslint.config(
  {
    ignores: ignoredPaths,
  },

  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },

  ...scopedNextCoreWebVitals,
  ...strictTypeCheckedConfigs,
  ...disableTypeCheckedForJavaScript,

  {
    files: typeScriptFiles,
    rules: {
      "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: true }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      ...STRICT_TYPE_AWARE_RULES,

      eqeqeq: ["error", "always"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-implicit-coercion": "error",
    },
  },

  {
    files: javaScriptFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-implicit-coercion": "error",
    },
  },

  {
    files: ["scripts/**/*.{ts,mts,cts,js,mjs,cjs}"],
    rules: {
      "no-console": "off",
    },
  },

  {
    files: ["src/**/*.test.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },

  eslintConfigPrettier,
);
