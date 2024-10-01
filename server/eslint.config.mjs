import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-constant-condition': 'error',
      curly: 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-redeclare': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'callback-return': 'warn',
      'handle-callback-err': 'error',
      'no-path-concat': 'error',
    },
  },
  pluginJs.configs.recommended,
];
