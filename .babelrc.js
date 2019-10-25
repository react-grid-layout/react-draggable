'use strict';

// If set, we put Babel in "esmMode", i.e. leave import/export intact.
// Good for webpack and for an esm build.
const esmMode = process.env.BABEL_ENV === "module";

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // Don't transpile import/export in esmMode.
        modules: esmMode ? false : "auto",
        // Also assume modern targets in esmMode.
        targets: esmMode ? "maintained node versions" : undefined
      },
    ],
    "@babel/react",
    "@babel/preset-flow"
  ],
  "plugins": [
    "@babel/plugin-transform-flow-comments",
    "@babel/plugin-proposal-class-properties",
  ],
  "env": {
    "test": {
      "plugins": [
        "espower"
      ]
    }
  }
}
