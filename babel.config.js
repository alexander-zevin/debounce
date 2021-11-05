module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-typescript', { allExtensions: true }]],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
