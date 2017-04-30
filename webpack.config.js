var webpack = require('webpack');
var path = require('path');
require('babel-polyfill');

var DIST_DIR = path.resolve(__dirname,'dist');
var SRC_DIR = path.resolve(__dirname,'src');

var config = {
    entry:['babel-polyfill',SRC_DIR+'/app/index.js'],
    output:{
        path:DIST_DIR+"/app",
        filename:"bundle.js",
        publicPath:"/app"
    },
    devServer:{
        port: 6125
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                include:SRC_DIR,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['react','es2015','stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery"
        }),

    ]
}

module.exports= config;
