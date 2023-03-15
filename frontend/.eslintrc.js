module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
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
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    },
    overrides: [
        {
            rules: {
                '@typescript-eslint/triple-slash-reference': 'off',
            },
            files: [
                'src/react-app-env.d.ts',
            ],
        },
    ],
};
