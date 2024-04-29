module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-prettier"],
  overrides: [
    {
      files: ["src/**/*.{css}"],
    },
  ],
  rules: {
    "selector-class-pattern": null,
    "prettier/prettier": true,
  },
  ignoreFiles: ["node_modules/*"],
}
