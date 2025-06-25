import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["build/**/*.js"]), {
    extends: compat.extends("eslint:recommended"),

    plugins: {
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ReactElement: null,
            ReactClass: null,
            $Exact: null,
            Partial: null,
            $Keys: null,
            MouseTouchEvent: null,
        },

        parser: babelParser,
    },

    rules: {
        strict: 0,
        quotes: [1, "single"],
        curly: [1, "multi-line"],
        camelcase: 0,
        "comma-dangle": 0,
        "no-console": 2,
        "no-use-before-define": [1, "nofunc"],
        "no-underscore-dangle": 0,

        "no-unused-vars": [1, {
            ignoreRestSiblings: true,
        }],

        "new-cap": 0,
        "prefer-const": 1,
        semi: 1,
    },
}]);