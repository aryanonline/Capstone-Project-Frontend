const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|PNG|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {}
            }
        ]
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    compress: true,
    historyApiFallback: true,
    https: false,
    open: true,
    hot: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
    proxy: [{
      context: ['/api'],
      target: `http://localhost:3001`,
      changeOrigin: true,
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};