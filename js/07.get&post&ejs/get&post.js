/**

 * @author BY

 * @date 2019-07-17 08:02

 */
var http = require('http');
var url = require('url');
var ejs = require('ejs');
var fs = require('fs');

http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});

    //获取get 还是post请求
    var method = req.method.toLocaleLowerCase();

    var pathname = url.parse(req.url).pathname;
    if(pathname == '/login'){
        ejs.renderFile('views/form.ejs', {}, function (err, data) {
            res.end(data);
        })
    }else if (pathname == '/doLogin' && method == 'get'){
        //get获取数据
        console.log(url.parse(req.url, true).query);
        res.end('doLogin')
    }else if (pathname == '/doLogin' && method == 'post'){
        var postStr= '';
        req.on('data', function (chunk) {
            postStr += chunk;
        });
        req.on('end', function () {
            fs.appendFile('login.txt', postStr+'\n', function (err) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('写入数据成功');
            });
            res.end("<script>alert('登录成功');history.back();</script>");
        });
        res.end('doLogin')
    }else {
        var msg = '这是注册页面，也是注册的路由';
        var h = "<h2>这是一个h2</h2>";
        ejs.renderFile('views/register.ejs', {
            r_msg: msg,
            h: h
        }, function (err, data) {
           res.end(data)
        })
    }
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');