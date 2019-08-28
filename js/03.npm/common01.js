// 03.npm i silly-datetime

var http = require('http');

var sd = require('silly-datetime');

http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});

    var dateTime = sd.format(new Date(), 'YYYY-HH-DD hh:mm:ss');
    res.write(dateTime + '\n');

    res.write('\n明知不可为之而为之');

    res.end();
}).listen('8080');
console.log('Server running at http://127.0.0.1:8080/');