const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: path.resolve("src/app.js"),
    output: {
        path: path.resolve("dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader"
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.(jpg|jpeg|png|gif)/,
                loader: "file-loader"
            }
        ]
    },
    devServer: {
        port: 8010,
        contentBase: ".",
        setup(app) {
            app.get("/data", function(request, response) {
                let filePath = path.join(__dirname, "src/Static/data/data.json");
                if (fs.existsSync(filePath)) {
                    response.end(fs.readFileSync(filePath));
                } else {
                    response.end('err: not found');
                }
            });
        }
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"common.js"
        }),
        new HtmlWebpackPlugin({
            title: "index",
            filename: 'index.html',
            template: "./index.html"
        })
    ]
}