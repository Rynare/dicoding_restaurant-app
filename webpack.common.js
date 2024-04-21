const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appTitle = 'Food Master';

module.exports = {
  entry: {
    index: {
      import: path.resolve(__dirname, 'src/scripts/index.js'),
      dependOn: 'shared',
    },
    components: {
      import: path.resolve(__dirname, 'src/scripts/components/components.min.js'),
      dependOn: 'shared',
    },
    // sw: path.resolve(__dirname, 'src/scripts/utils/service-worker/ServiceWorker.js'),
    style: {
      import: path.resolve(__dirname, 'src/styles/style.js'),
    },
    shared: 'jquery',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: appTitle,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        {
          from: path.resolve(__dirname, 'src/scripts/views/'),
          to: path.resolve(__dirname, 'dist/views/'),
        },
        // {
        //   from: path.resolve(__dirname, 'src/scripts/components/'),
        //   to: path.resolve(__dirname, 'dist/components/'),
        // },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: 'src/public/images/icon/logo-only-icon.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: appTitle,
        appDescription: 'Food Master adalah website yang menyediakan katalog restoran',
        developerName: 'M. FAHIM DAVID BACHTIAR',
        developerURL: null,
        background: '#fff',
        theme_color: '#333',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          windows: true,
          yandex: true
        }
      }
    }),
  ],
};
