/**

 * @author BY

 * @date 2019-07-18 08:49

 */
var http = require('http');
var url = require('url');
var ejs = require('ejs');
var G = {};
var app = function (req, res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    var pathname = url.parse(req.url).pathname;
    if(!pathname.endsWith('/')){
        pathname = pathname + '/'
    }
    if (G[pathname]) {
        G[pathname](req, res);   //执行注册方法
    }else {
        res.end('No router');
    }
};
// 定义一个get方法
app.get = function (string, callback) {
    // 其中startsWith判断当前字符串是否以anotherString作为开头，而endsWith则是判断是否作为结尾。
    if (!string.startsWith('/')) {
        string = '/' + string
    }
    if (!string.endsWith('/')) {
        string = string + '/'
    }
    //    /login/
    G[string] = callback;
    // 注册方法
    // G['string'] = function () {
    //
    // }
};

// http.createServer(function (req, res) {
//
// }).listen(8080);

http.createServer(app).listen(8080);

app.get('login', function (req, res) {
    ejs.renderFile('views/form.ejs', {}, function (err, data) {
        res.end(data)
    })
});
app.get('register', function (req, res) {
    res.end('register');
});
console.log('Server running at http://127.0.0.1:8080/');