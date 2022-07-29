const path = require( 'path' );
const { node } = require('webpack');
//const nodeExternals = require('webpack-node-externals');

module.exports = {

    // bundling mode
    mode: 'production',

    devtool: 'source-map',

    target: 'web',

    externals: [
        {
          'utf-8-validate': 'commonjs utf-8-validate',
          bufferutil: 'commonjs bufferutil',
        },
      ],

    // entry files
    entry: './src/client/js/script.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist/' ),
        filename: './client/js/script.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};
