const INDENT = 4;

/**
 * initial setup with npm init @eslint/config
 * (typescript, custom rules)
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:@next/next/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'react',
    ],
    rules: {
        indent: [
            'error',
            INDENT,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'eol-last': ['error', 'always'],

        'no-console': ['error'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        'object-shorthand': [
            'error',
            'always',
        ],
        'no-useless-rename': [
            'error',
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-empty-object-type': 'off',
        'no-unreachable': ['warn'],
        'react/jsx-indent': [
            'error',
            INDENT,
        ],
        'react/jsx-one-expression-per-line': [
            'error',
            { allow: 'literal' },
        ],
        'react/jsx-curly-spacing': [
            'error',
            'never',
            { allowMultiline: true },
        ],
        'react/jsx-curly-newline': [
            'error',
            {
                singleline: 'consistent',
                multiline: 'consistent',
            },
        ],
        'multiline-ternary': [
            'error',
            'always-multiline',
        ],
        'react/jsx-closing-bracket-location': [
            'error',
            'line-aligned',
        ],
        'comma-style': [
            'error',
            'last',
        ],
        'space-infix-ops': ['error'],
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'always',
                children: 'always',
            },
        ],
        'react/jsx-first-prop-new-line': [
            'error',
            'multiline',
        ],
        'react/jsx-max-props-per-line': [
            'error',
            {
                maximum: 1,
                when: 'always',
            },
        ],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    minProperties: 3,
                    multiline: true,
                    consistent: true,
                },
                ObjectPattern: {
                    minProperties: 3,
                    multiline: true,
                    consistent: true,
                },
                ImportDeclaration: {
                    minProperties: 3,
                    multiline: true,
                    consistent: true,
                },
                ExportDeclaration: {
                    minProperties: 3,
                    multiline: true,
                    consistent: true,
                },
            },
        ],
        'array-element-newline': [
            'error',
            {
                multiline: true,
                minItems: 2,
            },
        ],
        'function-paren-newline': [
            'error',
            'consistent',
        ],
        'array-bracket-newline': [
            'error',
            {
                multiline: true,
                minItems: 2,
            },
        ],
        'arrow-parens': [
            'error',
            'always',
        ],
        'arrow-body-style': [
            'error',
            'as-needed',
            { requireReturnForObjectLiteral: true },
        ],
        'brace-style': [
            'error',
            '1tbs',
            { allowSingleLine: false },
        ],
        'object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: false, // Ensure every property is on its own line
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1, // Allow at most 1 consecutive blank line
                maxEOF: 0, // No blank lines at the end of a file
                maxBOF: 0, // No blank lines at the beginning of a file
            },
        ],
    },
};
