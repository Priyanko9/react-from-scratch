const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = () => ({
  plugins: [new CompressionWebpackPlugin()]
});
const path=require('path');

module.exports = () => ({
      
      entry: ['./src/ClientApp.js','./src/App.css'],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader:MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/dist',
                }
              },
              "css-loader"]
          },
          { test: /\.(js)$/,
            use:{ 
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react','@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
              } 
            }
          },
        ]
      },
      output: {
        filename: '[hash].js'
      },
      plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({filename: './App.css'}),
      new CompressionWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.SourceMapDevToolPlugin({
        // this is the url of my local server for debugging,could also be a CI server
        publicPath: 'http://localhost:3000/',
        filename: '[file].map',
      })
    ]
});
