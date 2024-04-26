import { merge } from "webpack-merge";
import { resolve } from "path";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // devtool: 'inline-source-map',
  devServer: {
    // hot: true,
    static: resolve(__dirname, "dist"),
    // open: true,
    compress: true,
    client: {
      overlay: false,
    },
  },
});
