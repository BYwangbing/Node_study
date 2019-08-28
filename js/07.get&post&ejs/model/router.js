/**

 * @author BY

 * @date 2019-07-16 15:19

 */

var fs = require('fs');

var path = require('path');

var url = require('url');

var events = require('events');

var EventEmitter = new events.EventEmitter();

function getMime(EventEmitter, extname) {
    fs.readFile('./mime.json', function (err, data) {
        if (err){
            console.log(err);
            return false;
        }
        var Mimes = JSON.parse(data.toString());//JSON数据转化为JSON对象
        var result=  Mimes[extname] || 'text/html';//返回文件类型
        // 开始广播
        EventEmitter.emit('to_mimes', result)
    });
}

exports.static = function (req, res, staticPathname) {
    var pathname = url.parse(req.url).pathname;// 获取url的值
    var extname = path.extname(pathname); //获取文件后缀名

    if (pathname == '/') {
        pathname = '/index.html' /*默认加载的首页*/
    }
    if(pathname != '/favicon.ico'){
        // 文件操作获取static下面的index.html
        fs.readFile(staticPathname + '/' + pathname, function (err, data) {
            if (err){
                fs.readFile(staticPathname + '/404.html', function (error, args) {
                    if (error){
                        console.log('error')
                    } else {
                        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                        res.write(args);
                        res.end();
                    }
                })
            }else {
                getMime(EventEmitter, extname);
                EventEmitter.on('to_mimes', function (mime) {
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    // res.write(data);
                    res.end(data);/*结束响应*/
                })
            }
        })
    }
};
