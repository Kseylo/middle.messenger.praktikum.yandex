const {
    configure,
    presets
} = require("eslint-kit");

module.exports = configure({
    allowDebug: process.env.NODE_ENV !== "production",
    presets: [
        presets.imports(),
        presets.node(),
        presets.prettier(),
        presets.typescript({
            root: './',
            tsconfig: 'tsconfig.json',
        })
    ],
    parserOptions: {
      project: ['./tsconfig.json'],
    }
});