/**

 * @author BY

 * @date 2019-07-21 09:45

 */
var express = require('express');
// var ejs = require('ejs');
var app = new express();

// 配置ejs模板引擎
app.set('view engine', 'ejs');
// 设置模板位置
app.set('views', __dirname + '/views');
//内置中间件  托管静态页面
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
    // res.send('express应用级中间件')
});

app.get('/news', function (req, res) {
    res.send('express错误处理中间件 新闻路由')
});
/*匹配所有的路由  404*/
app.use(function (req, res) {
    res.status(404).send('这是404 表示路由没有匹配到');
});

app.listen(8002, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8002');