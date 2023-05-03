/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    root: true,
    ignorePatterns: ['*.js'],
    overrides: [
        {
            parserOptions: {
                project: ["./tsconfig.json"],
                "ecmaVersion": "latest"
            },
            "env": {
                "es6": true
            },
            files: ['*.ts', '*.tsx'],
            plugins: [
                'tree-shaking',
                'jsx-a11y',
                'eslint-comments',
            ],
            extends: [
                'eslint:all',
                'plugin:@typescript-eslint/all',
                'plugin:jsdoc/recommended',
                'plugin:import/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:eslint-comments/recommended',
                'plugin:@next/next/recommended',
                "next/core-web-vitals"
            ],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                'eol-last': ['error', 'always'],
                'eslint-comments/no-unused-disable': ['error'],
                'eslint-comments/require-description': ['error'],
                'no-restricted-globals': [
                    'error',
                    'window',
                    'document',
                    'location',
                    {
                        name: 'localStorage',
                        message:
                            'Do not use `localStorage` directly, cause it is unavailable on some mobile devices, use ',
                    },
                ],
                'multiline-comment-style': 'off',
                quotes: ['error', 'single'],
                'jsx-quotes': ['error', 'prefer-single'],
                'react/jsx-wrap-multilines': ['error', {
                    return: 'parens-new-line',
                    assignment: 'parens-new-line',
                }],
                'react/jsx-uses-react': 'off',
                'react/jsx-curly-brace-presence': [
                    'error',
                    {
                        props: 'always',
                        children: 'always',
                        propElementValues: 'always',
                    }],
                'react/react-in-jsx-scope': 'off',
                'react/jsx-boolean-value': ['error', 'always'],
                'react/jsx-tag-spacing': [
                    'error',
                    {
                        closingSlash: 'never',
                        afterOpening: 'never',
                        beforeClosing: 'never',
                        beforeSelfClosing: 'always',
                    },
                ],
                'react/jsx-curly-spacing': [
                    'error',
                    {
                        when: 'never',
                        children: {
                            when: 'never',
                        },
                    },
                ],
                'react/jsx-equals-spacing': [2, 'never'],
                'brace-style': ['error', '1tbs', { allowSingleLine: false }],
                'max-len': [
                    'error',
                    {
                        code: 125,
                        ignorePattern: '^import .*',
                        ignoreUrls: true,
                        ignoreComments: true,
                    },
                ],
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['@air/bff*', '@air/client*'],
                                message: 'Please avoid imports from apps.',
                            },
                            {
                                group: ['@direct-frontend/modules-router*'],
                                message: 'Please use react-router-dom',
                            },
                            {
                                group: ['rxjs/Rx'],
                            },
                            {
                                group: ['@direct-frontend/*'],
                                importNames: ['Link'],
                                message: 'Please use original `Link` from `react-router-dom`.',
                            },
                            {
                                group: ['@direct-frontend/*'],
                                importNames: ['Button'],
                                message: 'Please AIR-specific `Button` from `components-air`.',
                            },
                        ],
                    },
                ],
                'no-multi-str': 'off',
                'prefer-named-capture-group': 'off',
                'require-unicode-regexp': 'off',
                'line-comment-position': 'off',
                'max-lines': 'off',
                'max-params': 'off',
                'no-negated-condition': ['error'],
                'no-underscore-dangle': 'off',
                'no-console': ['error'],
                'dot-location': ['error', 'property'],
                curly: ['error', 'all'],
                eqeqeq: ['error', 'smart'],
                'no-empty-function': [
                    'error',
                    {
                        allow: ['constructors'],
                    },
                ],
                yoda: [
                    'error',
                    'never',
                    {
                        exceptRange: true,
                    },
                ],
                'array-bracket-newline': [
                    'error',
                    {
                        multiline: true,
                    },
                ],
                'no-warning-comments': 'off',
                'array-bracket-spacing': ['error', 'never'],
                'array-element-newline': ['error', 'consistent'],
                '@typescript-eslint/brace-style': ['error', '1tbs'],
                'comma-spacing': [
                    'error',
                    {
                        before: false,
                        after: true,
                    },
                ],
                'computed-property-spacing': ['error', 'never'],
                'func-call-spacing': ['error', 'never'],
                'function-call-argument-newline': ['error', 'consistent'],
                'function-paren-newline': ['error', 'consistent'],
                'no-void': 'off',
                'no-undefined': 'off',
                'new-cap': 'off',
                'key-spacing': [
                    'error',
                    {
                        mode: 'strict',
                    },
                ],
                'keyword-spacing': [
                    'error',
                    {
                        after: true,
                        before: true,
                    },
                ],
                'linebreak-style': ['error', 'unix'],
                'lines-around-comment': [
                    'error',
                    {
                        beforeLineComment: true,
                        allowBlockStart: true,
                        allowBlockEnd: true,
                        allowObjectStart: true,
                        allowObjectEnd: true,
                        allowArrayStart: true,
                        allowArrayEnd: true,
                        allowClassStart: true,
                        allowClassEnd: true,
                    },
                ],
                'lines-between-class-members': ['error', 'always'],
                'max-depth': ['error', 3],
                'max-statements-per-line': [
                    'error',
                    {
                        max: 1,
                    },
                ],
                'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 1 }],
                'object-curly-newline': [
                    'error',
                    {
                        multiline: true,
                        consistent: true,
                    },
                ],
                'object-property-newline': [
                    'error',
                    {
                        allowAllPropertiesOnSameLine: true,
                    },
                ],
                'one-var': ['error', 'never'],
                'operator-linebreak': ['error', 'after'],
                'quote-props': ['error', 'consistent-as-needed'],
                'semi-style': ['error', 'last'],
                'space-in-parens': ['error', 'never'],
                'spaced-comment': ['error', 'always'],
                'template-tag-spacing': ['error', 'never'],
                'arrow-body-style': ['error', 'always'],
                'arrow-parens': ['error', 'always'],
                'object-shorthand': [
                    'error',
                    'always',
                    {
                        avoidExplicitReturnArrows: true,
                    },
                ],
                'newline-per-chained-call': [
                    'error',
                    {
                        ignoreChainWithDepth: 2,
                    },
                ],
                'prefer-destructuring': [
                    'error',
                    {
                        VariableDeclarator: {
                            array: false,
                            object: true,
                        },
                        AssignmentExpression: {
                            array: false,
                            object: false,
                        },
                    },
                    {
                        enforceForRenamedProperties: false,
                    },
                ],
                'no-restricted-exports': [
                    'error',
                    {
                        restrictDefaultExports: {
                            direct: true,
                        },
                    },
                ],
                'rest-spread-spacing': ['error', 'never'],
                'template-curly-spacing': ['error', 'never'],
                'capitalized-comments': 'off',
                'padded-blocks': 'off',
                'no-inline-comments': 'off',
                'no-eq-null': 'off',
                'func-style': [
                    'error',
                    'declaration',
                    {
                        allowArrowFunctions: true,
                    },
                ],
                'sort-imports': 'off',
                'sort-keys': 'off',
                'vars-on-top': 'off',
                'no-ternary': 'off',
                'multiline-ternary': 'off',
                camelcase: 'off',
                'id-length': 'off',
                'implicit-arrow-linebreak': 'off',
                'no-plusplus': 'off',
                'max-statements': 'off',
                'class-methods-use-this': 'off',
                'max-lines-per-function': 'off',
                'no-duplicate-imports': 'off',
                'lines-around-comment': 'off',
                'function-paren-newline': ['error', 'multiline'],
                'func-names': 'off',
                'prefer-object-has-own': 'off',
                '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
                '@typescript-eslint/strict-boolean-expressions': [
                    'error',
                    {
                        allowNullableBoolean: true,
                        allowNullableString: true,
                        allowNullableNumber: true,
                        allowAny: true,
                    },
                ],
                '@typescript-eslint/restrict-template-expressions': [
                    'error',
                    { allowNumber: true },
                ],
                '@typescript-eslint/quotes': [
                    'error',
                    'single',
                    {
                        allowTemplateLiterals: true,
                    },
                ],
                '@typescript-eslint/parameter-properties': 'off',
                '@typescript-eslint/no-extraneous-class': 'off',
                '@typescript-eslint/promise-function-async': 'off',
                '@typescript-eslint/no-extra-parens': 'off',
                '@typescript-eslint/no-type-alias': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
                '@typescript-eslint/space-before-function-paren': [
                    'error',
                    { anonymous: 'always', named: 'never', asyncArrow: 'always' },
                ],
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/prefer-readonly-parameter-types': 'off',
                '@typescript-eslint/object-curly-spacing': ['error', 'always'],
                '@typescript-eslint/no-confusing-void-expression': [
                    'error',
                    { ignoreArrowShorthand: true, ignoreVoidOperator: true },
                ],
                '@typescript-eslint/no-empty-interface': [
                    'error',
                    {
                        allowSingleExtends: false,
                    },
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: false,
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                    },
                ],
                '@typescript-eslint/array-type': 'off',
                '@typescript-eslint/member-ordering': 'off',
                '@typescript-eslint/naming-convention': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
                '@typescript-eslint/no-duplicate-imports': 'off',
                '@typescript-eslint/comma-dangle': [
                    'error',
                    {
                        arrays: 'always-multiline',
                        objects: 'always-multiline',
                        imports: 'always-multiline',
                        exports: 'always-multiline',
                        functions: 'always-multiline',
                        enums: 'always-multiline',
                        generics: 'always-multiline',
                        tuples: 'always-multiline',
                    },
                ],
                '@typescript-eslint/semi': ['error', 'always'],
                '@typescript-eslint/member-delimiter-style': [
                    'error',
                    {
                        multiline: {
                            delimiter: 'semi',
                            requireLast: true,
                        },
                        singleline: {
                            delimiter: 'semi',
                            requireLast: true,
                        },
                    },
                ],
                '@typescript-eslint/indent': [
                    'error',
                    4,
                    {
                        SwitchCase: 1,
                        ignoredNodes: [],
                    },
                ],
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/init-declarations': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                'jsdoc/require-description-complete-sentence': 'off',
                'jsdoc/require-jsdoc': 'off',
                'jsdoc/require-param': [
                    'error',
                    {
                        checkDestructured: false,
                        enableFixer: false,
                    },
                ],

                'jsdoc/check-alignment': 'error',
                'jsdoc/no-bad-blocks': 'error',
                'jsdoc/require-returns': 'off',
                'jsdoc/require-param-type': 'off',
                'jsdoc/require-returns-type': 'off',
                'jsdoc/require-param': 'off',
                'import/order': [
                    'error',
                    {
                        groups: ["builtin", "external", "parent", "sibling", "index"],
                        'newlines-between': 'always'
                    },
                ],
                'import/no-unresolved': 'off',
                'import/named': 'off',
                "@next/next/no-html-link-for-pages": ["error", "app"]
            },
        },
        {
            files: 'next-env.d.ts',
            rules: {
                'spaced-comment': 'off',
            }
        },
        {
            files: ['page.tsx', 'layout.tsx'],
            rules: {
                'no-restricted-exports': [
                    'error',
                    {
                        restrictDefaultExports: {
                            direct: false,
                        },
                    },
                ],
            }
        },
        {
            files: ['*.typecheck.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
    ],
};
