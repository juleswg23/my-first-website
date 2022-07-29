const path = require( 'path' );

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/client/js/script.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist/' ),
        filename: './client/js/script.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.*' ],
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
