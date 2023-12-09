import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import type  { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'development' | 'production';
interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {

    const isDevelopment = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        module: {
            rules: [
                {
                    // ts-loader умеет работать JSX, Babel нет
                    // Если б мы использовали TypeScript, то нам бы не нужен был бы babel-loader
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].bundle.js',
            clean: true
        },
        devtool: isDevelopment ? 'inline-source-map' : false,
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            isDevelopment && new webpack.ProgressPlugin(),
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
