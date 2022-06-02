const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.yaml$/,
        use: [{ loader: "yaml-loader" }],
      },
    ],
  },

  devtool: "source-map",

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  output: {
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].[chunkhash].js",
  },

  mode: "development",

  plugins: [new HtmlWebpackPlugin()],
}
