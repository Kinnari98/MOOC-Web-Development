// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "warn", // Varoittaa puuttuvista PropTypes-tiedoista
    "react/jsx-uses-react": "warn",
    "react/display-name": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
