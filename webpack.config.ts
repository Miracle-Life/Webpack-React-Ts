import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type  { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'development' | 'production';
interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {

    const isDevelopment = env.mode === 'development';
    const isProduction = env.mode === 'production';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        module: {
            rules: [
                //порядок имеет значение
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    // ts-loader умеет работать JSX, Babel нет
                    // Если б мы использовали TypeScript, то нам бы не нужен был бы babel-loader
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        devtool: isDevelopment ? 'inline-source-map' : false,
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            isDevelopment && new webpack.ProgressPlugin(),
            isProduction && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ].filter(Boolean),
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: env.port ?? 9000,
            open: true
        }
    };
    return config;
}
