const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
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
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
    // new GenerateSW({
    //   swDest: "workBoxServiceWorker.js",
    //   maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    //   runtimeCaching: [
    //     {
    //       urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/"),
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "restaurants-api",
    //       },
    //     },
    //     // {
    //     //   urlPattern: ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
    //     //   handler: 'StaleWhileRevalidate',
    //     //   options: {
    //     //     cacheName: 'themoviedb-image-api',
    //     //   },
    //     // },
    //   ],
    // }),
  ],
};
