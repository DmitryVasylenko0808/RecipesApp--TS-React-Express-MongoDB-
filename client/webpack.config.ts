import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

type EnvVariables = {
    mode: Mode,
    port: number
};

export default (env: EnvVariables): webpack.Configuration => {
    const isDev = env.mode === "development";

    return {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].[contenthash].js",
            clean: true
        },

        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html")
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            isDev && new ForkTsCheckerWebpackPlugin()
        ].filter(Boolean),

        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: [
                        { loader: '@svgr/webpack', options: { icon: true } }
                    ],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    },
                    exclude: /node_modules/
                },
            ],
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },

        devServer: isDev ? {
            port: env.port ?? 8080,
            open: true,
            historyApiFallback: true
        } : undefined,

        devtool: isDev && "inline-source-map"
    }
}