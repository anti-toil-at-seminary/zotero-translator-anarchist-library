import { defineConfig } from "eslint/config";
import zoteroTranslator from "eslint-plugin-zotero-translator";
import globals from "globals";
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

export default defineConfig([{
    extends: compat.extends("@zotero"),

    plugins: {
        "zotero-translator": zoteroTranslator,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            Zotero: "readonly",
            Z: "readonly",
            ZU: "readonly",
            attr: "readonly",
            innerText: "readonly",
            text: "readonly",
            request: "readonly",
            requestText: "readonly",
            requestJSON: "readonly",
            requestDocument: "readonly",
        },

        ecmaVersion: 2023,
        sourceType: "script",
    },

    rules: {
        "no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^testCases$|^detectWeb$|^doWeb$|^detectImport$|^doImport$|^doExport$|^detectSearch$|^doSearch$|^exports$",
        }],

        "no-redeclare": ["error", {
            builtinGlobals: true,
        }],

        "linebreak-style": ["error", "unix"],

        "lines-around-comment": ["error", {
            ignorePattern: "END TEST CASES",
        }],

        "no-restricted-globals": ["error", {
            name: "document",
            message: "Use doc instead.",
        }],
        "@/no-mixed-spaces-and-tabs": "error",
        "zotero-translator/not-executable": "error",
        "zotero-translator/header-valid-json": "error",
        "zotero-translator/header-translator-id": "error",
        "zotero-translator/header-last-updated": "warn",
        "zotero-translator/header-translator-type": "warn",
        "zotero-translator/no-for-each": "warn",
        "zotero-translator/prefer-index-of": "warn",
        "zotero-translator/robust-query-selector": "warn",
        "zotero-translator/test-cases": "error",
        "zotero-translator/translator-framework": "warn",
    },

    processor: "zotero-translator/translator",
}]);
