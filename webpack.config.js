const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path=require('path');

module.exports = () => ({
      
      entry: ['./src/ClientApp.js','./src/App.css'],
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                }
              }
            ]
          },
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
        filename: "bundle.js"
      },
      plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({filename: './App.css'}),
      new CopyWebpackPlugin([
          { from: 'src/images',
          to: 'images/'}
      ]),
      new webpack.ProgressPlugin(),
      new webpack.SourceMapDevToolPlugin({
        // this is the url of our local sourcemap server
        publicPath: 'http://localhost:3000/',
        filename: '[file].map',
      })
    ]
    
});
