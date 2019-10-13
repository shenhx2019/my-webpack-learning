// common.js
module.exports = {
    entry: {
        index: './src/index.js',
        vendor: ['jquery']
    },
    output: {
        filename: '[name].bundle.[chunkhash].js'
    },
    mode: 'development',
    devServer: {
        publicPath: './dist',
        port: 12352
    }
}