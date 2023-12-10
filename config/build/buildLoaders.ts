import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildWebpackOptions } from "./types/types";
export function buildLoaders(option: BuildWebpackOptions): ModuleOptions['rules'] {
    const isDevelopment = option.mode === 'development';

    //порядок имеет значение
    const scssLoader =   {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const typescriptLoader = {
        // ts-loader умеет работать JSX, Babel нет
        // Если б мы использовали TypeScript, то нам бы не нужен был бы babel-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        //порядок имеет значение
        scssLoader,
        typescriptLoader
    ];
}
