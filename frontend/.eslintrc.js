module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
    ],
    plugins: [
        'react',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [
            './tsconfig.json',
        ],
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        jest: {
            version: 'detect',
        },
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'object-shorthand': ['error', 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/no-floating-promises': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            rules: {
                '@typescript-eslint/triple-slash-reference': 'off',
            },
            files: [
                'src/extensions.d.ts',
            ],
        },
    ],
};
