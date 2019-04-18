module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
    },
    rules: {
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["warn", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }],

      "no-restricted-globals": "off",
      "no-mixed-operators": "off",
      "no-plusplus": "off",

      "react/jsx-filename-extension": ["error", { "extensions": [".js"] }],
      "react/no-unescaped-entities": ["error", {"forbid": [">", "}"]}],

    }
};
