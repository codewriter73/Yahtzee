module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  plugins: ['testing-library'],
  rules: {
    'linebreak-style': 0,
    'no-restricted-exports': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.jsx',
          '**/*.cy.js',
          'cypress.config.ts',
        ],
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
