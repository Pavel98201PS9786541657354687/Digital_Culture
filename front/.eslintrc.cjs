module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "simple-import-sort", "prettier"],
  ignorePatterns: ["App.tsx", "main.tsx", "vite.config.ts"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        bracketSameLine: true,
        width: 50,
        endOfLine: "auto",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react", "^@?\w"],
          ["^(@|components)(/.*|$)"],
          ["^\u0000"],
          ["^\.\.(?!/?$)", "^\.\./?$"],
          ["^\./(?=.*/)(?!/?$)", "^\.(?!/?$)", "^\./?$"],
          ["^.+\.?(css)$"],
        ],
      },
    ],
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/ban-types": "off",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-namespace": "off",
  },
};
