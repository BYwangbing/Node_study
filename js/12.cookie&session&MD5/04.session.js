/**

 * @author BY

 * @date 2019-07-22 10:45

 */

/*
* 1.安装  express-session

cnpm install express-session  --save
*
*
* 2.引入

 var session = require("express-session");

 3.设置官方文档提供的中间件

 app.use(session({
	 secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true
 }))


4.使用

设置值
 req.session.username = "张三";

获取值 req.session.username

* */

var express = require('express');
var app = new express();
var session = require('express-session');
// 3.设置官方文档提供的中间件
app.use(session({
    secret: 'keyboard cat', //值可以随便取
    resave: false, //即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: true,
    rolling:true //只要页面由刷新，session值就会被保存
    //cookie: { secure: true }   /*secure https这样的情况才可以访问cookie*/
}));

app.get('/', function (req, res) {
    if (req.session.username ) {
        res.send('你好：' + req.session.username + ' 欢迎回来');
    }else {
        res.send('还未登录');
    }
});

app.get('/login',  function (req, res) {
    //设置session,由于session是存在服务器端的,所以不是用res返回给前端页面
    req.session.username = 'BY'; /*设置session*/
    res.send('登录页面')
});

app.get('/news', function (req, res) {
    if (req.session.username ) {
        res.send('你好：' + req.session.username + ' 欢迎登录news页面');
    }else {
        res.send('还未登录');
    }
});

app.get('/loginOut', function (req, res) {
    // req.session.cookie.maxAge = 0;   /*改变cookie的过期时间*/
    // 销毁
    req.session.destroy(function (args) {
        res.send('session销毁成功');
    })
});

app.listen(8002, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8002');