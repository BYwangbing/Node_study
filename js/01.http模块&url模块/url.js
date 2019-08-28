// 03.npm -g install supervisor

var http = require('http');
var url = require('url');
// console.log(url);
// console.log(url.parse("http://www.baidu.com/news?name=卢俊辉&age=20",true));

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
    // require.url获取浏览器url输入的信息
    if(request.url != '/favicon.ico'){
        // console.log(request.url);
        var result = url.parse(request.url,true);
        // 第一个参数是地址，第二个参数是true的话表示把get传值转换成对象
        console.log('aid = ' + result.query.aid);
        console.log('cid = ' + result.query.cid);
    }
    response.write("Hell地方 Word\n");
    response.end();
}).listen(8082);

console.log( 'Server running at http://127.0.0.1:8082/');