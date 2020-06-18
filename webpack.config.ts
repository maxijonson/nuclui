import webpack from "webpack";
import "webpack-dev-server";
import dotenv from "dotenv";
import path from "path";
import CircularDependencyPlugin from "circular-dependency-plugin";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: ".env.development" });
}

const config = (env: NodeJS.ProcessEnv): webpack.Configuration => {
    const isProduction = env.NODE_ENV === "production";
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
                                configFile: "tsconfig.docs.json",
                                logLevel: isProduction ? "warn" : "info",
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
                nuclui: path.resolve(__dirname, "src/"),
            },
        },
        plugins: [CircularDependency],
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? "source-map" : "eval-source-map",
        devServer: {
            contentBase: path.join(__dirname, "docs/public"),
            historyApiFallback: true,
            publicPath: "/dist/",
        },
    };
};

export default config;
