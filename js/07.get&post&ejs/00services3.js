/**

 * @author BY

 * @date 2019-07-16 16:16

 */
// EJS  常用标签
//   <% %>流程控制标签
//   <%= %>输出标签（原文输出 HTML 标签）
//   <%- %>输出标签（HTML 会被浏览器解析）

var http = require('http');
var url = require('url');
var ejs = require('ejs');

http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    var pathname = url.parse(req.url).pathname;

    var dataMsg = '这是后台数据：明知不可为而为之';
    var list = [
      '魏无羡', '蓝忘机', '江澄', '晓星尘', '蓝思追',  '王福坤'
    ];

    if (pathname == '/login'){
        ejs.renderFile('views/login.ejs', {
            msg: dataMsg,
            list: list
        }, function (err,data) {
            res.end(data);
            console.log(data)
        })
    }else {
        var msg = '这是注册页面，也是注册的路由';
        var h = "<h2>这是一个h2</h2>";
        ejs.renderFile('views/register.ejs', {
            r_msg: msg,
            h: h
        }, function (err,data) {
            res.end(data)
        })
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');