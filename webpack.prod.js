import merge from "webpack-merge";
import common from "./webpack.common.js";
import nodeExternals from "webpack-node-externals";

export default merge(common, {
  mode: "production",
  externals: [nodeExternals()],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
});
