import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildWebpackOptions } from "./types/types";

export function buildPlugins({ mode, paths }: BuildWebpackOptions):Configuration['plugins'] {
    const isDevelopment = mode === 'development';
    const isProduction = mode === 'production';
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),
    ];

    if(isDevelopment) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if(isProduction) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
    }

    return plugins;
}
