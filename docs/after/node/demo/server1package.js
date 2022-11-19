let fs = require("fs");

let path = require("path");

let mime = require("./mime.json");

function readFile(req, res,pathInfo) {
  let filePath = path.join(pathInfo, req.url)
  // 判断文件的格式
  let extName = path.extname(filePath);
  let type = mime[extName];
  if (type.startsWith("text")){
    type+="; charset=utf-8;";
  }
  res.writeHead(200,{
    "Content-Type":type
  })
  fs.readFile(filePath, "utf8", function (err, content) {
    if (err) {
      res.end("Server Error");
    }
    res.end(content);
  })
}
exports.StaticServer = readFile;
