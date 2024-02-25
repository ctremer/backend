/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    }
};

module.exports = config;