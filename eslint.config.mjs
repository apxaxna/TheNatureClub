import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The Studio is its own package with its own lint config (and a compiled dist/).
    "sanity/**",
    // Vendored agent skills, including reference apps that aren't part of this site.
    ".agents/**",
  ]),
]);

export default eslintConfig;
