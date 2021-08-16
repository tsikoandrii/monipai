const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    });
  });
}

const isProduction =  process.env.NODE_ENV === 'production'

const htmlPlugins = generateHtmlPlugins("./src/html/views");

const optimization = {
  minimize: true,
  minimizer: [
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
    new TerserPlugin({
      extractComments: true,
    }),
  ],
}

const config = {
  entry: ["./src/js/index.js", "./src/scss/style.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/bundle.js",
  },
  devtool: "source-map",
  mode: isProduction ? 'production': 'development',
  optimization: isProduction ? optimization : {},
  devServer: {
    compress: false,
    host: '192.168.31.238',
    port: 8080,
    contentBase: path.resolve(__dirname, '../src')
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src/scss"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "group-css-media-queries-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          }
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/html/includes"),
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.bundle.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/favicon",
          to: "./favicon",
          noErrorOnMissing: true,
        },
        {
          from: "./src/img",
          to: "./img",
          noErrorOnMissing: true,
        },
      ],
    }),
  ].concat(htmlPlugins),
  resolve: {
    alias: {
      '@node_modules': path.resolve(__dirname, 'node_modules/'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  stats: {
    children: true,
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
