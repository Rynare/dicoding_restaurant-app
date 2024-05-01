const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // devtool: 'inline-source-map',
  devServer: {
    hot: true,
    static: path.resolve(__dirname, "dist"),
    // open: true,
    // compress: true,
    client: {
      overlay: false,
    },
  },
});
