/**

 * @author BY

 * @date 2019-07-20 09:52

 */
var express = require("express");
var app = new express();

//动态路由  //http://127.0.0.1:8080/newsContent/123
app.get('/newsContent/:aid', function (req, res) {
    // req.params 获取动态路由的传值
    console.log(req.params);
    var aid = req.params.aid;
    res.send('newsContent模块+++++' + aid);
});
// 获取get传值   http://127.0.0.1:8080/protect?aid=123
app.get('/protect', function (req, res) {
    // http://127.0.0.1:8080/protect?aid=123&cid=456
    var query = req.query;
    console.log(query);//{ aid: '123', cid: '456' }
    res.send('protect模块 ' + query.aid + ' ' + query.cid);
});

app.listen(8080, '127.0.0.1');

console.log('Serve running at http://127.0.0.1:8080');