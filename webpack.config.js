const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/server/index.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    target: 'node',
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
};
