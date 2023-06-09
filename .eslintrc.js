module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  ignorePatterns: ['src/__snapshots/*', '*.css'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 0,
  },
};
