//步骤 1：导入所需的包
//使用require指令来加载 HTTP 模块
var http = require('http');
//步骤 2：使用http.createServer方法创建HTTP服务器
//通过参数函数请求并响应。编写示例实现返回“Hello World”。服务器在8081端口监听。
http.createServer(function (request, response) {
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    response.write("了你看来就Hello Word\n");
    response.end();
}).listen(8080);
// 终端打印如下信息
console.log( 'Server running at http://127.0.0.1:8080/');