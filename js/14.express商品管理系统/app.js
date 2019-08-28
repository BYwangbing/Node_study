/**

 * @author BY

 * @date 2019-07-24 15:51

 */
var express = require('express');
var app = new express();

// 后台管理系统 session保存用户信息
var session = require('express-session');
// 设置官方文档提供的中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*60
    },
    rolling:true
}));

//使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));
app.use('/upload',express.static('upload'));

// 引入模块
var admin = require('./routes/admin');
var index = require('./routes/index');

app.use('/', index);
app.use('/admin', admin);

app.listen(8021, '127.0.0.1');

console.log('Server  running at http://127.0.0.1:8021');