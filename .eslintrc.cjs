const {
    configure,
    presets
} = require("eslint-kit");

module.exports = configure({
    allowDebug: process.env.NODE_ENV !== "production",
    presets: [
        presets.imports({
            alias: {
                root: './src',
                paths: { '@app': './' },
                tsconfig: 'tsconfig.json'
            }
        }),
        presets.node(),
        presets.prettier(),
        presets.typescript({
            root: './',
            tsconfig: 'tsconfig.json',
        })
    ],
    parserOptions: {
      project: ['./tsconfig.json'],
    },
    extend: {
        rules: {
            'import/no-default-export': 'off',
        }
    }
});
