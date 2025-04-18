import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: webpack.Configuration = {
      mode: env.mode ?? 'development',
      entry: path.resolve(__dirname, 'src', 'app.ts'),
      output: {
          path: path.resolve(__dirname, 'build'),
          filename: '[name].[contenthash].js',
          clean: true
      },
      module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
              'css-loader', 
              'sass-loader'],
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.svg/,
            type: 'asset/resource'
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      devtool: isDev ? 'inline-source-map' : false,
      devServer: isDev ? {
        port: env.port ?? 5000,
        open: true
      } : undefined,
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'public', 'index.html')
        }),
        isProd && new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        }),
      ],
    }
  return config;
};