module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_', args: 'none' }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-multi-spaces': 'error',
    'react/prop-types': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/jsx-no-target-blank': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
