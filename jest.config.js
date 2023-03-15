module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['node_modules/', 'backend/'],
};
