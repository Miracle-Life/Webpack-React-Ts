import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode } from "./config/build/types/types";

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        output: path.resolve(__dirname, 'build'),
    };

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 9000,
        mode: env.mode ?? 'development',
        paths
    });

    return config;
}
