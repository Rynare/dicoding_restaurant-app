const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const appTitle = "Food Master";

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/scripts/index.js"),
    components: path.resolve(__dirname, "src/scripts/web-components/components.min.js"),
    style: path.resolve(__dirname, "src/styles/style.js"),
    serviceWorkerHandler: path.resolve(__dirname, "src/scripts/utils/service-worker/ServiceWorkerHandler.js"),
    /// / webSocketHandler: path.resolve(__dirname, 'src/scripts/utils/websocket/websocket-handler.js'),
    /// / serviceWorker: path.resolve(__dirname, 'src/scripts/utils/service-worker/ServiceWorker.js'),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: appTitle,
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
        {
          from: path.resolve(__dirname, "src/scripts/views/"),
          to: path.resolve(__dirname, "dist/views/"),
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: "src/public/images/icon/logo-only-icon.png",
      mode: "webapp",
      devMode: "webapp",
      favicons: {
        appName: appTitle,
        appDescription: "Food Master adalah website yang menyediakan katalog restoran",
        developerName: "M. Fahim David Bachtiar",
        background: "#fff",
        theme_color: "#333",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          windows: true,
          yandex: true,
        },
      },
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, "src/scripts/utils/service-worker/InjectManifest.js"),
      swDest: "sw.bundle.js",
      // maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
  ],
};
