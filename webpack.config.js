const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: ['babel-polyfill', './client/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.css$|\.scss$|\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },

}