/*
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 * @noflow
 */
'use strict';

/* eslint prefer-object-spread/prefer-object-spread: 0 */
/* eslint-disable max-len */

module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  // https://github.com/sindresorhus/globals/blob/master/globals.json
  env: {
    es6: true,
    node: true,
  },

  rules: {
    // Possible Errors (http://eslint.org/docs/rules/#possible-errors)
    'no-await-in-loop': 1,
    'no-cond-assign': 1,
    'no-console': 1,
    'no-constant-condition': [1, {checkLoops: false}],
    'no-control-regex': 1,
    'no-debugger': 1,
    'no-dupe-args': 1,
    'no-dupe-keys': 1,
    'no-duplicate-case': 1,
    'no-empty-character-class': 1,
    'no-empty': [1, {allowEmptyCatch: true}],
    'no-ex-assign': 1,
    'no-extra-boolean-cast': 1,
    'no-extra-parens': 0,
    'no-extra-semi': 1,
    'no-func-assign': 1,
    'no-inner-declarations': 1,
    'no-invalid-regexp': 1,
    'no-irregular-whitespace': 1,
    'no-obj-calls': 1,
    'no-prototype-builtins': 0,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 1,
    'no-template-curly-in-string': 0,
    'no-unexpected-multiline': 1,
    'no-unreachable': 1,
    'no-unsafe-finally': 1,
    'no-unsafe-negation': 1,
    'use-isnan': 1,
    'valid-jsdoc': 0,
    'valid-typeof': 1,

    // Best Practices (http://eslint.org/docs/rules/#best-practices)
    'accessor-pairs': 1,
    'array-callback-return': 0,
    'block-scoped-var': 0,
    'class-methods-use-this': 0,
    'complexity': 0,
    'consistent-return': 0,
    'curly': 1,
    'default-case': 0,
    'dot-location': [1, 'property'],
    'dot-notation': 1,
    'eqeqeq': [1, 'allow-null'],
    'guard-for-in': 0,
    'no-alert': 1,
    'no-caller': 1,
    'no-case-declarations': 0,
    'no-div-regex': 1,
    'no-else-return': 0,
    'no-empty-function': 0,
    'no-empty-pattern': 1,
    'no-eq-null': 0,
    'no-eval': 1,
    'no-extend-native': 1,
    'no-extra-bind': 1,
    'no-extra-label': 1,
    'no-fallthrough': 1,
    'no-floating-decimal': 1,
    'no-global-assign': 1,
    'no-implicit-coercion': 1,
    'no-implicit-globals': 0,
    'no-implied-eval': 1,
    'no-invalid-this': 0,
    'no-iterator': 1,
    'no-labels': 1,
    'no-lone-blocks': 1,
    'no-loop-func': 0,
    'no-magic-numbers': 0,
    'no-multi-spaces': 1,
    'no-multi-str': 0,
    'no-new-func': 1,
    'no-new-wrappers': 1,
    'no-new': 1,
    'no-octal-escape': 1,
    'no-octal': 1,
    'no-param-reassign': 1,
    'no-proto': 1,
    'no-redeclare': [1, {builtinGlobals: true}],
    'no-restricted-properties': 0,
    'no-return-assign': 1,
    'no-return-await': 0,
    'no-script-url': 1,
    'no-self-assign': 1,
    'no-self-compare': 1,
    'no-sequences': 1,
    'no-throw-literal': 1,
    'no-unmodified-loop-condition': 0,
    'no-unused-expressions': 0,
    'no-unused-labels': 1,
    'no-useless-call': 1,
    'no-useless-concat': 1,
    'no-useless-escape': 1,
    'no-useless-return': 0,
    'no-void': 1,
    'no-warning-comments': 0,
    'no-with': 1,
    'prefer-promise-reject-errors': 1,
    'radix': 1,
    'require-await': 0,
    'vars-on-top': 0,
    'wrap-iife': [1, 'inside'],
    'yoda': 1,

    // Strict Mode (http://eslint.org/docs/rules/#strict-mode)
    'strict': 0,

    // Variables (http://eslint.org/docs/rules/#variables)
    'init-declarations': 0,
    'no-catch-shadow': 1,
    'no-delete-var': 1,
    'no-label-var': 1,
    'no-restricted-globals': 0,
    'no-shadow-restricted-names': 1,
    'no-shadow': 1,
    'no-undef-init': 0,
    'no-undef': 1,
    'no-undefined': 0,
    'no-unused-vars': [1, {args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_'}],
    'no-use-before-define': 0,

    // Node.js and CommonJS (http://eslint.org/docs/rules/#nodejs-and-commonjs)
    'callback-return': 0,
    'global-require': 0,
    'handle-callback-err': 1,
    'no-mixed-requires': 1,
    'no-new-require': 1,
    'no-path-concat': 1,
    'no-process-env': 0,
    'no-process-exit': 0,
    'no-restricted-modules': 0,
    'no-sync': 0,

    // Stylistic Issues (http://eslint.org/docs/rules/#stylistic-issues)
    'array-bracket-spacing': 1,
    'block-spacing': 1,
    'brace-style': [1, '1tbs', {allowSingleLine: true}],
    'camelcase': 0,
    'capitalized-comments': 0,
    'comma-dangle': [1, {arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', exports: 'always-multiline', functions: 'always-multiline'}],
    'comma-spacing': 1,
    'comma-style': 1,
    'computed-property-spacing': 1,
    'consistent-this': 0,
    'eol-last': 1,
    'func-call-spacing': 1,
    'func-name-matching': 0,
    'func-names': 0,
    'func-style': 0,
    'id-blacklist': 0,
    'id-length': 0,
    'id-match': 0,
    'indent': [1, 2, {SwitchCase: 1}],
    'jsx-quotes': [1, 'prefer-double'],
    'key-spacing': [1, {beforeColon: false, afterColon: true}],
    'keyword-spacing': 1,
    'line-comment-position': 0,
    'linebreak-style': 1,
    'lines-around-comment': 0,
    'lines-around-directive': 0,
    'max-depth': 0,
    'max-len': 0,
    'max-lines': 0,
    'max-nested-callbacks': 0,
    'max-params': 0,
    'max-statements-per-line': 0,
    'max-statements': 0,
    'multiline-ternary': 0,
    'new-cap': 0,
    'new-parens': 1,
    'newline-after-var': 0,
    'newline-before-return': 0,
    'newline-per-chained-call': 0,
    'no-array-constructor': 1,
    'no-bitwise': 0,
    'no-continue': 0,
    'no-inline-comments': 0,
    'no-lonely-if': 0,
    'no-mixed-operators': 0,
    'no-mixed-spaces-and-tabs': 1,
    'no-multi-assign': 0,
    'no-multiple-empty-lines': [1, {max: 2, maxBOF: 0, maxEOF: 1}],
    'no-negated-condition': 0,
    'no-nested-ternary': 0,
    'no-new-object': 1,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-tabs': 1,
    'no-ternary': 0,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': 0,
    'no-unneeded-ternary': 0,
    'no-whitespace-before-property': 1,
    'object-curly-newline': 0,
    'object-curly-spacing': 1,
    'object-property-newline': 0,
    'one-var-declaration-per-line': 0,
    'one-var': [1, 'never'],
    'operator-assignment': 1,
    'operator-linebreak': 0,
    'padded-blocks': [1, {blocks: 'never', classes: 'never', switches: 'never'}],
    'quote-props': [1, 'consistent-as-needed'],
    'quotes': [1, 'single', 'avoid-escape'],
    'require-jsdoc': 0,
    'semi-spacing': 1,
    'semi': 1,
    'sort-keys': 0,
    'sort-vars': 0,
    'space-before-blocks': 1,
    'space-before-function-paren': [1, {anonymous: 'never', named: 'never', asyncArrow: 'always'}],
    'space-in-parens': [1, 'never'],
    'space-infix-ops': 1,
    'space-unary-ops': 1,
    'spaced-comment': [1, 'always', {line: {exceptions: ['-']}, block: {balanced: true}}],
    'template-tag-spacing': 1,
    'unicode-bom': [1, 'never'],
    'wrap-regex': 0,

    // ECMAScript 6 (http://eslint.org/docs/rules/#ecmascript-6)
    'arrow-body-style': 0,
    'arrow-parens': [1, 'as-needed'],
    'arrow-spacing': 1,
    'constructor-super': 1,
    'no-class-assign': 1,
    'no-confusing-arrow': 0,
    'no-const-assign': 1,
    'no-dupe-class-members': 1,
    'no-duplicate-imports': 0,
    'no-new-symbol': 1,
    'no-restricted-imports': 0,
    'no-this-before-super': 1,
    'no-useless-computed-key': 1,
    'no-useless-constructor': 0,
    'no-useless-rename': 1,
    'no-var': 1,
    'object-shorthand': 1,
    'prefer-arrow-callback': [1, {allowNamedFunctions: true}],
    'prefer-const': 1,
    'prefer-destructuring': 0,
    'prefer-numeric-literals': 0,
    'prefer-rest-params': 0,
    'prefer-spread': 1,
    'prefer-template': 0,
    'require-yield': 0,
    'rest-spread-spacing': 1,
    'sort-imports': 0,
    'symbol-description': 1,
    'template-curly-spacing': 1,
    'yield-star-spacing': 1,

    // flowtype (https://github.com/gajus/eslint-plugin-flowtype)
    'flowtype/boolean-style': 1,
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': [1, 'always-multiline'],
    'flowtype/generic-spacing': 0,
    'flowtype/no-dupe-keys': 0,
    'flowtype/no-primitive-constructor-types': 1,
    'flowtype/no-weak-types': 0,
    'flowtype/object-type-delimiter': 1,
    'flowtype/require-parameter-type': 0,
    'flowtype/require-return-type': 0,
    'flowtype/require-valid-file-annotation': 0,
    'flowtype/require-variable-type': 0,
    'flowtype/semi': 1,
    'flowtype/sort-keys': 0,
    'flowtype/space-after-type-colon': [1, 'always', {allowLineBreak: true}],
    'flowtype/space-before-generic-bracket': 1,
    'flowtype/space-before-type-colon': 1,
    'flowtype/type-id-match': 0,
    'flowtype/union-intersection-spacing': 1,
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 0,

    // import
    'import/default': 1,
    'import/export': 1,
    'import/extensions': 1,
    'import/first': 1,
    'import/named': 1,
    'import/newline-after-import': 1,
    'import/no-absolute-path': 1,
    'import/no-deprecated': 1,
    'import/no-duplicates': 1,
    'import/no-dynamic-require': 1,
    'import/no-extraneous-dependencies': 1,
    'import/no-mutable-exports': 1,
    'import/no-named-as-default': 1,
    'import/no-named-as-default-member': 1,
    'import/no-named-default': 0,
    'import/no-namespace': 1,
    'import/no-unassigned-import': 1,
    'import/no-unresolved': 1,
    'import/no-webpack-loader-syntax': 1,
    'import/order': 0,

    // merc-internal
    'merc-eslint/license-header': 1,

    // prefer-object-spread (https://github.com/bryanrsmith/eslint-plugin-prefer-object-spread)
    'prefer-object-spread/prefer-object-spread': 1,

    // prettier (https://github.com/prettier/eslint-plugin-prettier)
    'prettier/prettier': [1, 'fb', '@format'],
  },

  plugins: [
    'flowtype',
    'import',
    'merc-eslint',
    'prefer-object-spread',
    'prettier',
  ],
};
