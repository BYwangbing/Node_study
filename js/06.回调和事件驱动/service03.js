/**

 * @author BY

 * @date 2019-07-15 22:15

 */

var http = require('http');
var fs = require('fs');
var path = require('path');
// console.log(path.extname('index.html'));//获取文件后缀名
var getMime = require('./model/getmimefromfile.js');
var url = require('url');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    // console.log(pathname + '+++++++++++++++++++');

    if (pathname == '/') {
        pathname = '/index.html' /*默认加载的首页*/
    }
    //获取文件后缀名
    var extname = path.extname(pathname);

    if(pathname != '/favicon.ico'){
        // console.log(req.url);
        // 文件操作获取static下面的index.html
        fs.readFile('static/' + pathname, function (err, data) {
            if (err){
                fs.readFile('static/404.html', function (error, args) {
                    if (error){
                        console.log('error')
                    } else {
                        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                        res.write(args);
                        res.end();
                    }
                })
            }else {
                var mime = getMime.getMime(fs, extname, function(mime){
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    res.write(data);
                    res.end();
                })
            }
        })
    }
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');