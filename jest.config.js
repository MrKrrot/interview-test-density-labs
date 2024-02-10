module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  detectOpenHandles: true,
  moduleNameMapper: {
    '@config': '<rootDir>/src/config',
    '@controllers': '<rootDir>/src/controllers',
    '@middlewares': '<rootDir>/src/middlewares',
    '@models': '<rootDir>/src/models',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@routes': '<rootDir>/src/routes',
    '@services': '<rootDir>/src/services',
    '@utils': '<rootDir>/src/utils',
    '@validations': '<rootDir>/src/validations'
  }
}
