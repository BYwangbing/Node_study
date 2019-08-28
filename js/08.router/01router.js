/**

 * @author BY

 * @date 2019-07-17 16:24

 */
var http = require('http');
var url = require('url');
var model = require('./model/model.js');

http.createServer(function (req,res) {

   res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});

    var pathname = url.parse(req.url).pathname.replace('/', '');
    if (pathname != 'favicon.ico') {
       try {
           model[pathname](req,res);
       } catch (error) {
           model['home'](req,res);
       }
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');