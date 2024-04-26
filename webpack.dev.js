const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

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
