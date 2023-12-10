export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
}

export type BuildMode = 'development' | 'production';

export interface BuildWebpackOptions {
    mode: BuildMode;
    port: number;
    paths: BuildPaths;
}
