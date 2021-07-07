const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/server/server.js",
    output: {
        path: path.join(__dirname, 'dist/server'),
        filename: "[name].js"
    },
    target: "node",
    devtool: "source-map",
    externals: [nodeExternals()], // Только для express приложений
    module: {
        rules: [
            {
                // Перекомпилировать es6+ в  es5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: 'src/server/db',
                        to: 'db/[name].[ext]',
                        toType: 'template'
                    }
                ]
            }
        )
    ]
};