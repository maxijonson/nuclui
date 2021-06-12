import webpack, { WebpackPluginInstance } from "webpack";
import "webpack-dev-server";
import path from "path";
import CircularDependencyPlugin from "circular-dependency-plugin";
import chalk from "chalk";
import _ from "lodash";

enum Env {
    LOCAL = "local",
    TEST = "test",
    DEV = "development",
    STAGING = "staging",
    PRODUCTION = "production",
}

interface ConfigEnv {
    ENVIRONMENT?: Env;
}

const config = (env: ConfigEnv = {}): webpack.Configuration => {
    env.ENVIRONMENT =
        env.ENVIRONMENT ?? (process.env.NODE_ENV as Env) ?? Env.LOCAL;
    const webpackEnv: { [key: string]: string } = {};

    console.info(chalk.bold.cyan("- NUCLUI -"));
    _.forEach(env, (v, k) => {
        if (v) {
            console.info(`${chalk.blue(k)}: ${chalk.bold.blue(v)}`);
            webpackEnv[`process.env.${k}`] = JSON.stringify(v);
        }
    });
    console.info("");

    const isProduction = env.ENVIRONMENT === Env.PRODUCTION;
    const isStaging = env.ENVIRONMENT === Env.STAGING;

    const CircularDependency = new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        cwd: process.cwd(),
    });

    return {
        entry: ["babel-polyfill", "docs/index.tsx"],
        output: {
            path: path.resolve(__dirname, "docs/public/dist"),
            filename: "bundle.js",
        },
        module: {
            rules: [
                {
                    use: ["babel-loader", "eslint-loader"],
                    test: /\.js$/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.tsx?$/,
                    enforce: "pre",
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: "docs/tsconfig.json",
                                logLevel:
                                    isProduction || isStaging ? "warn" : "info",
                            },
                        },
                        "eslint-loader",
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname), "node_modules"],
            extensions: [".tsx", ".ts", ".js", ".json"],
            alias: {
                "nuclui": path.resolve(__dirname, "src/"),
                "@utils": path.resolve(__dirname, "src/utils/"),
                "@components": path.resolve(__dirname, "src/components/"),
                "@config": path.resolve(__dirname, "src/config/"),
                "@theme": path.resolve(__dirname, "src/theme/"),
                "@fonts": path.resolve(__dirname, "src/fonts/"),
                "@hooks": path.resolve(__dirname, "src/hooks/"),
                "@styles": path.resolve(__dirname, "src/styles/"),
            },
        },
        plugins: [
            CircularDependency as unknown as WebpackPluginInstance,
            new webpack.DefinePlugin(webpackEnv),
        ],
        mode: isProduction || isStaging ? "production" : "development",
        devtool: isProduction || isStaging ? "source-map" : "eval-source-map",
        devServer: {
            port: 3000,
            host: "0.0.0.0",
            historyApiFallback: true,
            contentBase: path.join(__dirname, "docs/public"),
            publicPath: "/dist/",
        },
    };
};

export default config;
