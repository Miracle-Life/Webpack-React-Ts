import type  { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import { BuildWebpackOptions } from "./types/types";

export function buildDevServer(options: BuildWebpackOptions): DevServerConfiguration {
    return {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: options.port ?? 9000,
        open: true
    };
}
