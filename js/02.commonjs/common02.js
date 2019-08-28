var http = require('http');

var tools = require('./tools');
                        // 省略后缀名.js也可以
http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    // console.log(req.url);

    if ((req.url != '/favicon.ico')) {
        console.log(tools);
        console.log(tools.add(12, 25));
        console.log(tools.sayHello());
    }

    res.write('明知不可为之而为之\n');
    res.end();
}).listen(50271);
console.log('Server running at http://127.0.0.1:50271/');