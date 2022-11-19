let http = require("http");

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    });
    if(req.url.startsWith("/index")){
        res.end("首页")
    }else if(req.url.startsWith("/login")){
        res.end("登录")
    }else{
        res.end("啥也不是")
    }
}).listen(3000)
