let http = require("http")

let server = http.createServer();

let ss = require("./server1package")

let path = require("path")

server.on("request", function (req, res) {
    let pathInfo = path.join(__dirname,"www")
    ss.StaticServer(req,res,pathInfo)
}).listen(3000);

