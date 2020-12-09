const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports = {
  mode : 'production',
  entry: {  //入口
    index: './src/index.js',
    product: './src/product.js'
  },

  output: {  //出口
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  
  devServer: {//开发服务器配置
    contentBase: path.join(__dirname, "dist"),//输出路径
    compress: true,//是否压缩
    port: 9000,//端口号 开启的服务器的端口
    open:true//是否自动打开浏览器
  },
   
  module: {  //模块
    //解析规则
    rules: [
      {
        test:/\.css$/,  //文件解析匹配规则  正则规则

        use:[  //表示匹配到的文件 需要哪些loader来处理
            //  {loader:'style-loader'},
           {loader:miniCssExtractPlugin.loader},//用 miniCssExtractPlugin插件的loader处理css
           {loader:'css-loader'},
        ]
      },
      {
        test:/\.less$/,
        use:[
          // {loader:'style-loader'},
          {loader:miniCssExtractPlugin.loader},//用 miniCssExtractPlugin插件的loader处理css
          {loader:'css-loader'},
          {loader:'less-loader'}
        ]
      },
      // {
      //   test:/\.(jpg|png|gif|webp|jpeg)$/,
      //   use:[
      //     {
      //       loader:'file-loader',
      //     }
      //   ]
      // }

      {
        test:/\.(jpg|png|gif|webp|jpeg)$/,
        use:[
          {
            loader:'url-loader',
            options:{  //配置参数
              limit:102400  //单位byte  图片小于100k的时候转化base64
            }
          }
        ]
      },

      {
        test:/\.js$/,  //匹配js文件
        exclude:/(node_modules|bower_components)/,  //babel转化的时候排除 node_modules 和 bower_components文件夹啊
        use:[
          {
            loader: 'babel-loader',
            options:{ //选项参数
              presets:['env'] //预设env  es6转化 es5
            }
          }
        ]
      },

      {
        test:/\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      }
      
    ]
  },

  plugins:[  //插件
    new HtmlWebpackPlugin({  //构造函数传参
      title:"网页标题",  //网页标题
      template: './src/tpl.html',  //处理html模板路径
      inject: 'body',  //ture默认值，script标签位于html文件的body底部： body：script标签位于html文件的body底部：
                      //head： script标签位于html文件的head中：false：不插入生成的js文件
      minify: { //html压缩规则
        removeComments: true,  //是否移除注释
        removeAttributeQuotes: true, //是否移除属性的引号
        collapseWhitespace: true  //是否移除空白
      },
      filename: 'index_1.html'  //输出模板名称
    }) ,
    
    new miniCssExtractPlugin({
      //输出文件名称
      filename: "[name].[hash].css"
    })
  ]
}