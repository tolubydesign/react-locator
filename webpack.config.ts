import { resolve } from "path";
import * as path from "path";

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.ts(x)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', 'ts', '.js', '.json'],
    alias: {
      '@': resolve('./'),
      '@src': resolve('./src'),
      '@assets': resolve('./src/assets'),
      '@scss': resolve('./src/assets/scss'),
      '@image': resolve('./src/assets/image'),
      '@modules': resolve('./src/modules'),
      '@components': resolve('./src/shared/components'),
      '@directives': resolve('./src/shared/directives'),
      '@models': resolve('./src/shared/models'),
      '@pipes': resolve('./src/shared/pipes'),
      '@core': resolve('./src/core'),
    },
  },
};


