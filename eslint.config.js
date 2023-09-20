import eslint from '@eslint/js';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';
import jestPluginFormatting from 'eslint-plugin-jest-formatting';
import jsoncParser from 'jsonc-eslint-parser';
import jsoncPlugin from 'eslint-plugin-jsonc';
import tsEslintParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';

const jsRules = {
  ...eslint.configs.recommended.rules,
  'array-bracket-newline': ['error', 'consistent'],
  'array-bracket-spacing': ['error', 'never'],
  'arrow-body-style': ['error', 'always'],
  'arrow-parens': 'error',
  'arrow-spacing': 'error',
  'block-scoped-var': 'error',
  'block-spacing': ['error', 'always'],
  'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
  'camelcase': 'error',
  'comma-dangle': ['error', 'only-multiline'],
  'comma-spacing': ['error', { 'before': false, 'after': true }],
  'comma-style': ['error', 'last'],
  'computed-property-spacing': ['error', 'never', { 'enforceForClassMembers': true }],
  'consistent-return': 'error',
  'curly': 'error',
  'default-case-last': 'error',
  'default-param-last': ['error'],
  'dot-location': ['error', 'property'],
  'eol-last': ['error', 'always'],
  'eqeqeq': ['error', 'always'],
  'func-call-spacing': ['error', 'never'],
  'func-style': ['error', 'declaration'],
  'function-call-argument-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'consistent'],
  'indent': ['error', 2],
  'key-spacing': 'error',
  'keyword-spacing': 'error',
  'lines-between-class-members': ['error', 'always'],
  'new-parens': 'error',
  'no-array-constructor': 'error',
  'no-confusing-arrow': 'error',
  'no-console': 'warn',
  'no-else-return': 'error',
  'no-eval': 'error',
  'no-extra-semi': 'error',
  'no-lonely-if': 'error',
  'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
  'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
  'no-return-assign': 'error',
  'no-return-await': 'error',
  'no-shadow': 'error',
  'no-tabs': 'error',
  'no-template-curly-in-string': 'error',
  'no-unneeded-ternary': 'error',
  'no-var': 'error',
  'no-warning-comments': 'error',
  'no-whitespace-before-property': 'error',
  'object-curly-newline': ['error', { 'consistent': true }],
  'object-curly-spacing': ['error', 'always'],
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  'rest-spread-spacing': ['error', 'never'],
  'semi': 'error',
  'semi-spacing': 'error',
  'semi-style': ['error', 'last'],
  'sort-imports': ['error', { 'ignoreCase': true, 'ignoreDeclarationSort': false }],
  'space-before-blocks': 'error',
  'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': 'error',
  'space-unary-ops': 'error',
  'spaced-comment': 'warn',
  'switch-colon-spacing': 'error',
  'template-curly-spacing': ['error', 'never'],
};

const tsRules = {
  ...jsRules,
  '@typescript-eslint/array-type': ['error', { 'default': 'array' }],
  '@typescript-eslint/consistent-type-assertions': ['error'],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/explicit-function-return-type': ['error'],
  '@typescript-eslint/explicit-member-accessibility': ['error'],
  '@typescript-eslint/explicit-module-boundary-types': ['error'],
  '@typescript-eslint/member-delimiter-style': ['error'],
  '@typescript-eslint/method-signature-style': ['error', 'method'],
  '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
  '@typescript-eslint/no-confusing-void-expression': ['error'],
  '@typescript-eslint/no-dynamic-delete': ['error'],
  '@typescript-eslint/no-explicit-any': ['error'],
  '@typescript-eslint/no-invalid-void-type': ['error'],
  '@typescript-eslint/no-meaningless-void-operator': ['error', { 'checkNever': true }],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
  '@typescript-eslint/no-non-null-assertion': ['error'],
  '@typescript-eslint/no-require-imports': ['error'],
  '@typescript-eslint/no-type-alias': ['error'],
  '@typescript-eslint/no-unnecessary-condition': ['error'],
  '@typescript-eslint/no-unnecessary-qualifier': ['error'],
  '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
  '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
  '@typescript-eslint/no-unsafe-argument': ['error'],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error'],
  '@typescript-eslint/prefer-for-of': ['error'],
  '@typescript-eslint/prefer-includes': ['error'],
  '@typescript-eslint/prefer-literal-enum-member': ['error', { 'allowBitwiseExpressions': true }],
  '@typescript-eslint/prefer-nullish-coalescing': ['error'],
  '@typescript-eslint/prefer-optional-chain': ['error'],
  '@typescript-eslint/prefer-readonly': ['error'],
  '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
  '@typescript-eslint/prefer-regexp-exec': ['error'],
  '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
  '@typescript-eslint/prefer-ts-expect-error': ['error'],
  '@typescript-eslint/promise-function-async': ['error'],
  '@typescript-eslint/require-array-sort-compare': ['error'],
  '@typescript-eslint/switch-exhaustiveness-check': ['error'],
  '@typescript-eslint/type-annotation-spacing': ['error'],
  '@typescript-eslint/unified-signatures': ['error'],

  'brace-style': 'off',
  '@typescript-eslint/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
  'comma-dangle': 'off',
  '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
  'comma-spacing': 'off',
  '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }],
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': ['error'],
  'func-call-spacing': 'off',
  '@typescript-eslint/func-call-spacing': ['error', 'never'],
  'indent': 'off',
  '@typescript-eslint/indent': ['error', 2],
  'keyword-spacing': 'off',
  '@typescript-eslint/keyword-spacing': ['error'],
  'lines-between-class-members': 'off',
  '@typescript-eslint/lines-between-class-members': ['error'],
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': ['error'],
  'no-extra-semi': 'off',
  '@typescript-eslint/no-extra-semi': ['error'],
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error'],
  'object-curly-spacing': 'off',
  '@typescript-eslint/object-curly-spacing': ['error', 'always'],
  'quotes': 'off',
  '@typescript-eslint/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  'semi': 'off',
  '@typescript-eslint/semi': ['error'],
  'space-before-function-paren': 'off',
  '@typescript-eslint/space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
  'space-infix-ops': 'off',
  '@typescript-eslint/space-infix-ops': ['error', { 'int32Hint': false }],

  ...unicornPlugin.configs.recommended.rules,
  'unicorn/catch-error-name': ['error', { 'name': 'e' }],
  'unicorn/no-null': ['off'],
  'unicorn/numeric-separators-style': ['error', { 'onlyIfContainsSeparator': true }],
  'unicorn/prevent-abbreviations': ['off'],
  'unicorn/switch-case-braces': ['error', 'avoid'],
};

export default [
  {
    files: [
      '**/*.cjs',
      '**/*.js',
    ],
    ignores: [
      'dist/**',
      'docs/**',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...jsRules,
    }
  },
  {
    files: [
      '**/*.json',
    ],
    ignores: [
      'coverage/**',
      'dist/**',
    ],
    languageOptions: {
      parser: jsoncParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      ...jsoncPlugin.configs['recommended-with-json'].rules,
      'jsonc/array-bracket-newline': ['error', 'consistent'],
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': 'error',
      'jsonc/object-curly-newline': ['error', { 'consistent': true }],
      'jsonc/object-curly-spacing': ['error', 'always'],
    }
  },
  {
    files: [
      'src/**/*.ts',
    ],
    ignores: [
      'dist/**',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig-eslint.json',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...tsRules,
    }
  },
  {
    files: [
      'tests/**/*.ts',
    ],
    ignores: [
      'dist/**',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.jest,
        ...globals.node,
      },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig-jest.json',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      jest: jestPlugin,
      'jest-formatting': jestPluginFormatting,
      unicorn: unicornPlugin,
    },
    rules: {
      ...tsRules,
      'no-sparse-arrays': 'off',

      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,
      'jest/consistent-test-it': ['error', { 'fn': 'test' }],
      'jest/no-duplicate-hooks': 'error',
      'jest/no-if': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/prefer-called-with': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/require-hook': 'error',
      'jest/require-to-throw-message': 'error',
      'jest/require-top-level-describe': 'error',

      'jest-formatting/padding-around-before-all-blocks': 1,
      'jest-formatting/padding-around-after-all-blocks': 1,
      'jest-formatting/padding-around-before-each-blocks': 1,
      'jest-formatting/padding-around-after-each-blocks': 1,
      'jest-formatting/padding-around-describe-blocks': 1,
      'jest-formatting/padding-around-test-blocks': 1,
    }
  },
];