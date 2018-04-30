const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        vender: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'babel-polyfill']
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        filename: "js/[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },'sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.html')}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: "manifest.js",
            chunks: ['vender']
        }),
        new ExtractTextPlugin({
            filename: 'styles/style.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'SERVERURI': JSON.stringify('http://localhost:8000')
            }
        }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './src'
    }
}