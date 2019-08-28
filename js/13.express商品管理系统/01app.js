/**

 * @author BY

 * @date 2019-07-22 20:43

 */
var md5 = require('md5-node');
// console.log(md5('123456'));
var express = require('express');
var app = new express();/*实例化*/

//使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

// 获取post
var bodyParser = require('body-parser');
// //配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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
// 连接数据库
var MongoClient = require('mongodb').MongoClient;
var DbUrl = ' mongodb://127.0.0.1:27017/product';//连接数据库

//ejs中 设置全局数据   所有的页面都可以使用
//app.locals['userInfo']='1213'
//app.locals['userInfo']='111111';

//自定义中间件  判断登录状态
// next()   路由继续向下匹配
app.use(function (req, res, next) {
    if(req.url=='/login' || req.url=='/doLogin'){
        next();
    }else {
        if(req.session.userInfo && req.session.userInfo.username != '') { /*判断有没有登录*/
            app.locals['userInfo'] = req.session.userInfo;
            next();
        }else {
            res.redirect('/login');
        }
    }
});

app.get('/', function (req, res) {
    res.send('index')
});

app.get('/login', function (req, res) {
    res.render('login')
});

app.post('/doLogin', function (req, res) {
    console.log(req.body); /*获取post提交的数据*/
    var username = req.body.username;
    var password = md5(req.body.password);
    //1.获取数据
    //2.连接数据库查询数据
    MongoClient.connect(DbUrl, { useNewUrlParser:true }, function (err, db) {
        if (err) {
            console.log(err);
            console.log('数据库连接失败');
            return;
        }
        var my_db = db.db('product');
        //查询数据  {"username":req.body.username,"password":req.body.password}
        var result = my_db.collection('user').find({
            username: username,
            password: password
        });
        result.toArray(function (error, data) {
            console.log(data);
            if (data.length > 0){
                req.session.userInfo = data[0];  // 保存用户信息
                console.log('登录成功');
                res.redirect('/product');/*登录成功跳转到商品列表*/
            }else {
                console.log('登录失败');
                res.send("<script>alert('登录失败'); location.href = '/login'</script>")
            }
            db.close();
        });
    })
});

app.get('/loginOut', function (req, res) {
    // 销毁session
    req.session.destroy(function(err){
        if (err) {
            console.log(err);
        }else {
            res.redirect('/login')
        }
    })
});

app.get('/product', function (req, res) {
    // 连接数据库查询数据
    MongoClient.connect(DbUrl, { useNewUrlParser: true }, function (err, db) {
        if(err){
            console.log(err);
            console.log('数据库连接失败');
            return;
        }
        var my_db = db.db('product');
        var result = my_db.collection('type').find();
        result.toArray(function (error, data) {
            if (error) {
                console.log(error + '查找数据失败');
            }
            console.log(data);
            db.close();
            res.render('product', {
                list: data
            })
        })
    })
});

app.get('/productAdd', function (req, res) {
   res.render('productAdd')
});

app.get('/productEdit', function (req, res) {
    res.render('productEdit')
});

app.get('/productDelete', function (req, res) {
    res.send('product删除')
});

app.listen(8020, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8020');