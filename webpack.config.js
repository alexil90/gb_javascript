const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
 
module.exports = {
    mode: 'development',
    entry: './src/script.js',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                  use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                  ]
             }           
        ],
 
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new VueLoaderPlugin()
    ],
}