let http = require("http")

let server = http.createServer();

let queryString = require("querystring")
server.on("request",function (req,res) {
  // 1.定义变量保存传递过来的参数
  let params = "";
  // 在node中POST请求的数据不能一次性全部拿到，需要分批次获取
  req.on("data",function (chuck) {
    params+=chuck;
  });
  // 监听数据完成事件
  req.on("end",function () {
    let obj = queryString.parse(params);
    console.log(obj);
    res.end();
  })
})
