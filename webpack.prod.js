const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MergeWebpackConfig = require("webpack-merge");
const DefaultWebpackConfig = require("./webpack.config");
const webpack = require("webpack");

const buidlConfig = MergeWebpackConfig(DefaultWebpackConfig, {
  mode: "production",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: true
        }
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ],
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: "all",
      name: "vendor",
      automaticNameDelimiter: "-",
      minChunks: 1
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      minify: {
        removeEmptyAttributes: true,
        removeComments: true,
        removeTagWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/vendor.css"
    })
  ]
});

module.exports = buidlConfig;
