const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const PATHS = {
  src: path.join(__dirname, "src"),
};

const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const TerserPlugin = require("terser-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const Critters = require("critters-webpack-plugin");
const SizePlugin = require("size-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  entry: `${PATHS.src}/index`,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]~[contentHash].js",
    chunkFilename: "[name]~[contentHash].[id].js",
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "!!prerender-loader?string!public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new WebpackPwaManifest({
      name: "My Progressive Web App",
      short_name: "MyPWA",
      description: "My awesome Progressive Web App!",
      background_color: "#000000",
      theme_color: "#000000",
      orientation: "portrait",
      display: "standalone",
      start_url: ".",
      crossorigin: null,
      inject: false,
      fingerprints: false,
      ios: true,
      publicPath: null,
      includeDirectory: true,
      icons: [
        {
          src: path.resolve("public/icons/icon.png"),
          sizes: [16, 32, 180], // multiple sizes
        },
        {
          src: path.resolve("public/icons/icon.png"),
          size: "1024x1024", // you can also use the specifications pattern
        },
        {
          src: path.resolve("public/icons/icon.png"),
          size: "1024x1024",
          purpose: "maskable",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]~[chunkhash].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new Critters({
      // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
      preload: "swap",

      // Don't inline critical font-face rules, but preload the font URLs:
      preloadFonts: true,
    }),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
      sourceMap: true, // Must be set to true if using source-maps in production
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.svg$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new SizePlugin(),
    new workboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: false,
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("public/icons/icon.png"),
      suppressSuccess: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",

            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",

            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: [
                      "last 1 version",
                      "> 1%",
                      "maintained node versions",
                      "not dead",
                    ],
                  },
                ],
              ],
              plugins: [
                [
                  "transform-react-jsx",
                  {
                    pragma: "h",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
          format: "jpg",
          quality: 70,
          name: "[name]~[contentHash].[ext]",
          outputPath: "imgs",
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "videos",
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};