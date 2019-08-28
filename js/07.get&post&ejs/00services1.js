/**

* @author BY

* @date 2019-07-16 15:17

*/

var http = require('http');

var router = require('./model/router.js');

http.createServer(function (req, res) {

    router.static(req, res, 'static')

}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');