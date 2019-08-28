var http = require('http');

var str = require('./config.js');

http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    // console.log(req.url);

    if ((req.url != '/favicon.ico')) {
        console.log(str);
        console.log(str.info);
    }

    res.write('明知不可为之而为之\n');
    res.end();
}).listen(50271);
console.log('Server running at http://127.0.0.1:50271/');