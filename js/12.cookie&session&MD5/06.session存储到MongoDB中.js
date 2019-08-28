/**

 * @author BY

 * @date 2019-07-22 16:58

 */
/*
 3.设置官方文档提供的中间件
 app.use(session({
 	secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true,
	 store:new MongoStore({
		 url: 'mongodb://127.0.0.1:27017/student',数据库的地址
	 	 touchAfter: 24 * 3600   time period in seconds
	 })
 }))
* */
var express = require('express');
var session = require("express-session");
var MongoStore  = require("connect-mongo")(session);
var app = new express();
// 3.设置官方文档提供的中间件
//配置中间件
app.use(session({
    secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        maxAge:1000*60*40    /*过期时间*/
    },   /*secure https这样的情况才可以访问cookie*/
    rolling:true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    store:new MongoStore({
        url: 'mongodb://127.0.0.1:27017/student',  //数据库的地址
        touchAfter: 24 * 3600   //time period in seconds  通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    })
}));
app.get('/', function (req, res) {
    if(req.session.username){
        res.send('你好' + req.session.username + '欢迎回来');
    }else {
        res.send('未登录');
    }
});
app.get('/login', function (req, res) {
    req.session.username = 'BY';
    res.send('登录成功');
});
app.listen(8020);
console.log('Server running at http://127.0.0.1:8020');