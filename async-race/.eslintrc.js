module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript", // you might need this if you're using TypeScript
    "plugin:@typescript-eslint/recommended", // good extra for TS
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // required by airbnb-typescript
    sourceType: "module",
    ecmaVersion: 2021,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // your custom rule overrides can go here
  },
};
