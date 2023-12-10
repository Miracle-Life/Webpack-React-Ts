import { Configuration } from "webpack";
import {BuildWebpackOptions} from "./types/types";

export function buildResolvers(option: BuildWebpackOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js']
    };
}
