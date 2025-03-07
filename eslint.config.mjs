// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    extends: [vitest.configs.recommended],
    // update this to match your test files
    files: ['**/*.{spec,test}.{js,ts}'],
  },
  {
    rules: {
      'no-prototype-builtins': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'error',
      // 'no-unused-vars': 'warn',
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
)
