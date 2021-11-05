const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');

module.exports = (_, argv) => {
  const isProductionMode = argv.mode === 'production';

  return {
    mode: isProductionMode ? 'production' : 'development',
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: '@danieldyachenko/debounce',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self === \'undefined\' ? this : self',
    },
    resolve: {
      extensions: ['*', '.ts', '.js', '.json'],
    },
    devtool: isProductionMode ? false : 'inline-source-map',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true }), new JsonMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js', 'jsx'],
      }),
    ],
  };
};
