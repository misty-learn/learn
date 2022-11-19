let url = require("url")

let str = "http://root:12345@www.28yanyu.cn/index.html?name=yanyu&age=12#banner";

let obj = url.parse(str,true)
console.log(obj);
