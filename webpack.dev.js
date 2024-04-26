import merge from "webpack-merge";
import { resolve } from "path";
import common from "./webpack.common.js";
import nodeExternals from "webpack-node-externals";

export default merge(common, {
  mode: "development",
  externals: [nodeExternals()],
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
