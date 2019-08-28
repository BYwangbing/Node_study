/**

 * @author BY

 * @date 2019-07-16 15:41

 */
//路由:指的就是针对不同请求的 URL，处理不同的业务逻辑

var http = require('http');

var url = require('url');

http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;

    if (pathname == '/login.html'){

        res.end('login');

    }else if(pathname=='/register'){

        res.end('register');

    }else if(pathname=='/order'){

        res.end('order');

    }else{

        res.end('index');
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');