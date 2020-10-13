const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    target: 'node',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    }
};

const serverConfig = {
    entry: './src/server/index.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist')
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/static/*',
                    to: '..',
                    flatten: true
                }
            ]
        })
    ],
    ...baseConfig
};

module.exports = [ serverConfig ];
