import eslint from '@eslint/js';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';
import jestPluginFormatting from 'eslint-plugin-jest-formatting';
import jsoncParser from 'jsonc-eslint-parser';
import jsoncPlugin from 'eslint-plugin-jsonc';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import unicornPlugin from 'eslint-plugin-unicorn';

const jsRules = {
  ...eslint.configs.recommended.rules,
  'arrow-body-style': ['error', 'always'],
  'block-scoped-var': 'error',
  'camelcase': 'error',
  'consistent-return': 'error',
  'curly': 'error',
  'default-case-last': 'error',
  'default-param-last': ['error'],
  'eqeqeq': ['error', 'always'],
  'func-style': ['error', 'declaration'],
  'no-array-constructor': 'error',
  'no-console': 'warn',
  'no-else-return': 'error',
  'no-eval': 'error',
  'no-lonely-if': 'error',
  'no-return-assign': 'error',
  'no-return-await': 'error',
  'no-shadow': 'error',
  'no-template-curly-in-string': 'error',
  'no-unneeded-ternary': 'error',
  'no-var': 'error',
  'no-warning-comments': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'sort-imports': ['error', { 'ignoreCase': true, 'ignoreDeclarationSort': false }],
};

const tsRules = {
  ...jsRules,
  '@typescript-eslint/array-type': ['error', { 'default': 'array' }],
  '@typescript-eslint/consistent-type-assertions': ['error'],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': ['error'],
  '@typescript-eslint/explicit-function-return-type': ['error'],
  '@typescript-eslint/explicit-member-accessibility': ['error'],
  '@typescript-eslint/explicit-module-boundary-types': ['error'],

  '@typescript-eslint/method-signature-style': ['error', 'method'],
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': ['error'],
  '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
  '@typescript-eslint/no-confusing-void-expression': ['error'],
  '@typescript-eslint/no-dynamic-delete': ['error'],
  '@typescript-eslint/no-explicit-any': ['error'],
  '@typescript-eslint/no-invalid-void-type': ['error'],
  '@typescript-eslint/no-meaningless-void-operator': ['error', { 'checkNever': true }],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
  '@typescript-eslint/no-non-null-assertion': ['error'],
  '@typescript-eslint/no-require-imports': ['error'],
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error'],
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

  ...unicornPlugin.configs.recommended.rules,
  'unicorn/catch-error-name': ['error', { 'name': 'e' }],
  'unicorn/no-null': ['off'],
  'unicorn/numeric-separators-style': ['error', { 'onlyIfContainsSeparator': true }],
  'unicorn/prevent-abbreviations': ['off'],
  'unicorn/switch-case-braces': ['error', 'avoid'],
};

const styleRules = {
  '@stylistic/array-bracket-newline': ['error', 'consistent'],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/arrow-parens': 'error',
  '@stylistic/arrow-spacing': 'error',
  '@stylistic/block-spacing': ['error', 'always'],
  '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
  '@stylistic/comma-dangle': ['error', 'only-multiline'],
  '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
  '@stylistic/comma-style': ['error', 'last'],
  '@stylistic/computed-property-spacing': ['error', 'never', { 'enforceForClassMembers': true }],
  '@stylistic/dot-location': ['error', 'property'],
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/func-call-spacing': ['error', 'never'],
  '@stylistic/function-call-argument-newline': ['error', 'consistent'],
  '@stylistic/function-paren-newline': ['error', 'consistent'],
  '@stylistic/indent': ['error', 2],
  '@stylistic/key-spacing': 'error',
  '@stylistic/keyword-spacing': 'error',
  '@stylistic/lines-between-class-members': ['error', 'always'],
  '@stylistic/member-delimiter-style': ['error'],
  '@stylistic/new-parens': 'error',
  '@stylistic/no-confusing-arrow': 'error',
  '@stylistic/no-extra-semi': 'error',
  '@stylistic/no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
  '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/object-curly-newline': ['error', { 'consistent': true }],
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/semi': 'error',
  '@stylistic/semi-spacing': 'error',
  '@stylistic/semi-style': ['error', 'last'],
  '@stylistic/space-before-blocks': 'error',
  '@stylistic/space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
  '@stylistic/space-unary-ops': 'error',
  '@stylistic/spaced-comment': 'warn',
  '@stylistic/switch-colon-spacing': 'error',
  '@stylistic/template-curly-spacing': ['error', 'never'],
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
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...jsRules,
      ...styleRules,
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
      ...jsoncPlugin.configs['flat/recommended-with-json'].rules,
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
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig-eslint.json',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylisticPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...tsRules,
      ...styleRules,
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
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig-jest.json',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylisticPlugin,
      jest: jestPlugin,
      'jest-formatting': jestPluginFormatting,
      unicorn: unicornPlugin,
    },
    rules: {
      ...tsRules,
      ...styleRules,

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
