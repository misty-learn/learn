const path = require("path")
module.exports = {
  devtool:"cheap-module-eval-source-map",
  /**
   * 一种是开发模式(development):不会打包的代码压缩
   * 生产模式：会对打包js代码进行压缩
   */
  mode: "production",
  /**
   * 指定需要打包的文件
   */
  entry: "./index.js",
  /**
   * 指定打包之后的文件输出的路径和输出的文件名称
   */
  output: {
    /**
     * 指定打包之后的JS文件的名称
     */
    filename: "bundle.js",
    /**
     * 指定存放打包文件的存放文件夹地址
     */
    path: path.resolve(__dirname, "bundle")
  },
  /**
   * 告诉webpack如何处理webpack不能够识别的文件
   */
  "module":{
    rules:[
      {
        // 正则表达式
        test:/\.(png|jpg|gif)$/,
        use:[
          {
            loader:'file-loader',
            options:{}
          }
        ]
      }
    ]
  }
}
