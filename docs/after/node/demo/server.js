let http = require("http")

let server = http.createServer();

let fs = require("fs");

let path = require("path");

server.on("request",function(req,res){
    /*
    if(req.url.startsWith("/index")){
        // let filePath =  path.join(__dirname,"www",req.url)         
        // fs.readFile(filePath,"utf8",function(err,content){
        //     if(err){
        //         res.end("Server Error");
        //     }
        //     res.end(content);
        // })
        readFile(req,res);
    }else if(req.url.startsWith("/login")){
        // let filePath =  path.join(__dirname,"www",req.url)         
        // fs.readFile(filePath,"utf8",function(err,content){
        //     if(err){
        //         res.end("Server Error");
        //     }
        //     res.end(content);
        // })
        readFile(req,res);
    }else{
        res.writeHead(200,{
            "Content-Type":"text/plain:charset=utf-8"
        });
        res.end();
    }
    */
   readFile(req,res);
}).listen(3000);

function readFile(req,res){
    let filePath =  path.join(__dirname,"www",req.url)         
        fs.readFile(filePath,"utf8",function(err,content){
            if(err){
                res.end("Server Error");
            }
            res.end(content);
        })
}