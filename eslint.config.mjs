import globals from 'globals';
import pluginJs from '@eslint/js';
import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
        process: 'readonly',
        apiEndPoint: 'readonly',
        logger: 'readonly',
        __dirname: 'readonly',
        error: 'readonly',
      },
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // High-level custom rules
      indent: ['error', 2], // Enforce 2-space indentation
      quotes: ['error', 'single'], // Use single quotes
      semi: ['error', 'always'], // Enforce semicolons
      'no-console': 'warn', // Warn about console.log usage
      eqeqeq: ['error', 'always'], // Enforce strict equality (===)
      curly: ['error', 'all'], // Enforce consistent curly brace usage
      'no-unused-vars': ['error', { args: 'none' }], // Disallow unused variables
      'no-var': 'error', // Disallow var, prefer const/let
      'prefer-const': 'error', // Prefer const for variables that are not reassigned
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce spacing around arrow function arrows
      'space-before-function-paren': ['error', 'never'], // No space before function parentheses
      'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline object literals
    },
  },
]);
