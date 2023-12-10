import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import {BuildWebpackOptions} from "./types/types";

export function buildWebpack(options: BuildWebpackOptions):webpack.Configuration {
    const { paths, mode } = options;
    const isDevelopment = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        devtool: isDevelopment ? 'inline-source-map' : false,
        plugins: buildPlugins(options),
        devServer: isDevelopment ? buildDevServer(options) : undefined
    }
}
