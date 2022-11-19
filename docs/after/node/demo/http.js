let http = require("http")

// 1.创建一个服务器实例对象
let server = http.createServer();

// 2.注册请求监听

server.on('request',function(request,res){

    // 返回中文可能出现乱码，需要进行设置浏览器的
    // 告诉浏览器返回的数据类型，返回的数据集用什么方式返回
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    })

    // end结束本地请求并返回数据
    res.end("返回数据");
});
// 指定监听端口
server.listen(3000);