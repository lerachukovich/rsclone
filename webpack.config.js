const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: "./index.js",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.jpg']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    devServer: {
        port: 4200,
        open : true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/assets/images'),
        //             to: path.resolve(__dirname, 'dist/images')
        //         },
        //     ]
        // }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        },
                    },
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
        ]
    }
}
