# test dev for loader
## 使用说明
1. 可以配置启用缓存功能
2. source-map配置说明
~~~
rules:[{
    test: /\.js$/,
    use: {
        loader: 'force-strict-loader',
        options: {
            /*配置sourceMap*/
            sourceMap: true
        }
    }
}]
~~~