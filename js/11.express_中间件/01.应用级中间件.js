/**

 * @author BY

 * @date 2019-07-21 08:49

 */
var express = require('express');
// var ejs = require('ejs');
var app = new express();

// 配置ejs模板引擎
app.set('view engine', 'ejs');
// 设置模板位置
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// next()   路由继续向下匹配
app.use(function (req, res, next) {
    console.log(new Date());
    next();
});

app.get('/', function (req, res) {
    res.render('index');
    // res.send('express应用级中间件')
});

// 路由中间件
app.use('/news', function (req, res, next) {
    console.log(('express应用级中间件 新闻路由'));
    next();
});

app.get('/news', function (req, res) {
    res.send('express应用级中间件 新闻路由')
});

app.listen(8002, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8002');