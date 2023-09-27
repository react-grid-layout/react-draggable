'use strict';

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead"
      },
    ],
    "@babel/react",
    "@babel/preset-flow"
  ],
  "plugins": [
    "@babel/plugin-transform-flow-comments",
    "@babel/plugin-transform-class-properties",
    "transform-inline-environment-variables"
  ]
}
