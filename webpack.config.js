const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
        'js/out.js': './js/app.js'
    },
    output : {
        path: __dirname+'/',
        filename: '[name]'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2'] }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/style.css')
    ]
}
