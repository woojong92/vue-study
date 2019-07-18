const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');


module.exports = {

    mode : 'development',

    devtool : 'eval', 

    resolve : {
        extensions : ['.js', '.vue'],
    },


    entry: {
        app: path.join(__dirname, 'main.js'),  // app => 하나로 합쳐질 이름
    },

    module :  {
        rules: [{
            test: /\.vue$/, 
            loader: 'vue-loader', // or use: 
        }, {
            test: /\.css$/,
            loader: [
                'vue-style-loader',
                'css-loader'
            ]
        }],
    },

    plugins : [
        new VueLoaderPlugin(),
    ],

    output : {
        filename: '[name].js', // or app.js
        path: path.join(__dirname, 'dist'), 
        publicPath: '/dist', // webpack-dev-server 할때 추가
    },
};



