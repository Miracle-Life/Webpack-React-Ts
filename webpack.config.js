const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

    const isDevelopment = env.mode === 'development';
    const isProduction = env.mode === 'production';

    return {
        mode: env.mode ?? 'development',
        devtool: isDevelopment ? 'inline-source-map' : false,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        module: {
            rules: [
                {
                    test: /\.css$|\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:4]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        "postcss-preset-env",
                                        "autoprefixer"
                                    ],
                                },
                                sourceMap: true
                            }
                        },
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass
                            }
                        }
                    ],
                },
                {
                    test: /\.js$|\.jsx$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        babelrc: true,
                        envName: isProduction ? 'production' : 'development'
                    }
                },
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            isDevelopment && new webpack.ProgressPlugin(),
            isProduction && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ].filter(Boolean),
        devServer: isDevelopment
            ? {
                static: {
                    directory: path.join(__dirname, 'public'),
                },
                compress: true,
                port: env.port ?? 9000,
                open: true
            }
            : undefined
    }
};
