const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
        resouces: './resources.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg|json|html)$/i,
                loader: 'file-loader?name=[name].[ext]'
            },


            // …
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },

};