'use strict';

const targets = process.env.IS_WEBPACK === "1" ? 
  "> 0.25%, not dead" :
  "maintained node versions"

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        targets
      }
    ],
    "@babel/react",
    "@babel/preset-flow"
  ],
  "plugins": [
    "@babel/transform-flow-comments",
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
