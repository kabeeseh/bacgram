import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends({
    rules: {
      "@typescript-eslint/no-unused-vars": false,
      "@typescript-eslint/no-require-imports": false,
      "@typescript-eslint/no-explicit-any": false,
      "@typescript-eslint/no-var-requires": false,
      "@typescript-eslint/no-unnecessary-type-constraint": false,
      "@typescript-eslint/no-wrapper-object-types": false,
    }
  }),
];

export default eslintConfig;
