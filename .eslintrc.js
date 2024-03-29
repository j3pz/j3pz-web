module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        '@typescript-eslint/indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            },
            CallExpression: {
                arguments: 1
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            ignoreComments: false,
        }],
        'max-len': ['error', 140, {
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true,
        }],
        'max-classes-per-file': ['error', 2],
        'lines-between-class-members': 'off',
        'react/destructuring-assignment': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/sort-comp': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
    },
    overrides: [
        {
            files: ['src/pages/**/*'],
            rules: {
                'import/prefer-default-export': 'error',
                'import/no-default-export': 'off',
            },
        },
    ],
};
