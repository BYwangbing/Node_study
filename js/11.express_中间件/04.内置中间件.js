/**

 * @author BY

 * @date 2019-07-21 10:05

 */
/*
*  body-parser 中间件 第三方的 获取 post 提交的数据   (模块)

 1.cnpm install body-parser --save

 2.var bodyParser = require('body-parser')

 3.设置中间件

// parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
 app.use(bodyParser.json())

 4.req.body 获取数据
* */
var express = require('express');
var app = new express();/*实例化*/
var bodyParser = require('body-parser');

// 配置ejs模板引擎
app.set('view engine', 'ejs');
// 设置模板引擎位置
app.set('views', __dirname + '/views');

// //配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/doLogin', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.listen(8002, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8002');
