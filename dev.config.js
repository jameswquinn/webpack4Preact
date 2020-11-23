const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
    devServer: {
    compress: false,
    port: 9000
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.jsx?$/,
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
                      "not dead"
                    ]
                  }
                ]
              ],
              plugins: [
                [
                  "transform-react-jsx",
                  {
                    pragma: "h"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          disable: true
        }
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "svgo-loader"
          }
        ]
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "videos"
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()]
};
