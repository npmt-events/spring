const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const defaultWebpackConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const devConfig = merge(defaultWebpackConfig, {
  mode: "development",
  devServer: {
    port: 9090
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    })
  ]
});

module.exports = devConfig;
