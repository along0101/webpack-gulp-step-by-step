const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

	entry: {
        bundle: ['./index.js'],
        base:['./modules/answer','./modules/dialog'],
        vendor: ['jquery', 'moment', 'bootstrap','highcharts','highcharts/highstock','toastr', 'sweetalert', 'select2']
    },

    output: {
        path: path.join(__dirname, 'dist', 'js'),
        publicPath: '/js/',
        filename: 'web-[name].js' //web-[name]-[hash:7].min.js
    },

    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                //loader: ['style-loader/url','file-loader'], //外链方式
                loader: ['style-loader', 'css-loader', 'sass-loader'] //页内添加style的方式
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [__dirname + '/src/js/helpers'] 
                }
            }
        ]
    },

    node: {
        fs: "empty"
    },

    externals: {
        //jquery: 'jQuery',
        CKEDITOR: 'ckeditor'
    },

    plugins: [

        //new webpack.HotModuleReplacementPlugin(), //webpack热替换插件
        //new webpack.DllPlugin(options),
        //new webpack.DllReferencePlugin(options),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',//生产环境配置
        }),

        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, //去掉所有注释
            },
            compress: {
                warnings: false, //去掉压缩警告
                drop_console: false
            }
        }),

        //去掉不关联的语言包，减小包体积，保留中文
        //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),//去掉语言包
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

        //给上下文提供全局库，省去依赖该库的component都要import
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        //抽取公共部分的js逻辑
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将公共模块提取，生成名为`vendors`的chunk
            filename: 'web-[name].js', //web-[name]-[hash:7].min.js
            chunks: [
                'bundle','base', 'vendor'
            ]
        }),

        //生成页面，内容是在空文档中注入js脚本，gulp合并该脚本
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: '../index.html',
            chunks: ['vendor', 'bundle','base']
        })
    ],

    //使用webpack-dev-server，提高开发效率
    devServer: {
        contentBase: './dist/',
        host: 'localhost',
        port: 7000, //默认8080
        inline: true, //可以监控js变化
        hot: true //热启动
    }
}