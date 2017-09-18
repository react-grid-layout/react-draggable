var webpack = require('webpack')

module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/react-draggable.js',
        sourceMapFilename: './dist/react-draggable.js.map',
        devtoolModuleFilenameTemplate: '../[resource-path]',
        library: 'ReactDraggable',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        }
    },
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {fix: true}
            },
            {
                test: /\.(?:js|es).?$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /(node_modules)/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                DRAGGABLE_DEBUG: process.env.DRAGGABLE_DEBUG
            }
        })
    ]
}
