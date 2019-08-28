/**

 * @author BY

 * @date 2019-07-19 22:13

 */
var express = require('express');

var app = new express(); /*实例化*/

app.get('/', function (req, res) {
    // changeRes(res);
    res.send('express模块');
});

app.get('/news', function (req, res) {
    res.send('新闻列表');
});

app.get('/login', function (req, res) {
    res.send('login模块');
});

app.get('/register', function (req, res) {
    res.send('register模块');
});
//动态路由
app.get('/newsContent/:aid', function (req, res) {
    // req.params 获取动态路由的传值
    console.log(req.params);
    var aid = req.params.aid;
    res.send('newsContent模块-----' + aid);
});
app.listen(8080, '127.0.0.1');

console.log('Serve running at http://127.0.0.1:8080');