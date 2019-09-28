/**

 * @author BY

 * @date 2019-07-23 16:28

 */
var fs = require('fs');
var md5 = require('md5-node');
var DB = require('./modelus/db');
// console.log(md5('123456'));
var express = require('express');
var app = new express();/*实例化*/

//使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));
app.use('/upload',express.static('upload'));
// 获取post
var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/

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
    var password = req.body.password;
    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user', {
        username: username,
        password: password
    },function (error, data){
        if (data.length > 0){
            req.session.userInfo = data[0];  // 保存用户信息
            console.log('登录成功');
            res.redirect('/product');/*登录成功跳转到商品列表*/
        }else {
            console.log('登录失败');
            res.send("<script>alert('登录失败'); location.href = '/login'</script>")
        }
    });
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

//商品列表
app.get('/product', function (req, res) {
    // 连接数据库查询数据
    DB.find('type', {}, function (error, data){
        res.render('product', {
            list: data
        })
    });
});

app.get('/productAdd', function (req, res) {
    res.render('productAdd')
});

app.post('/doProductAdd', function (req, res) {
    var form = new multiparty.Form();
    form.uploadDir='upload';  //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        // 获取提交的数据以及图片上传成功返回的图片信息
        console.log(fields);  /*获取表单的数据*/
        console.log(files);  /*图片上传成功返回的信息*/
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var picture = files.picture[0].path;
        DB.insert('type', {
            title,
            price,
            fee,
            description,
            picture
        }, function (error, data) {
            if (!error) {
                res.redirect('/product'); /*上传成功跳转到首页*/
            }
        })
    });
});

app.get('/productEdit', function (req, res) {
    var id = req.query.id;
    // console.log(id);
    //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)
    DB.find('type', {
        _id: new DB.ObjectID(id)
    }, function (error, data) {
        // console.log(data);
        res.render('productEdit', {
            list: data[0]
        })
    })
});

//执行修改的路由
app.post('/doProductEdit', function (req, res) {
    var form = new multiparty.Form();
    form.uploadDir='upload';  //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        // 获取提交的数据以及图片上传成功返回的图片信息
        // console.log(fields);  /*获取表单的数据*/
        // console.log(files);  /*图片上传成功返回的信息*/
        var _id=fields._id[0];   /*修改的条件*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var picture = files.picture[0].path;
        var originalFilename = files.picture[0].originalFilename;

        var setData;
        if (originalFilename){ /*修改了图片*/
            setData = {
                title,
                price,
                fee,
                description,
                picture
            }
        } else {
            setData = {
                title,
                price,
                fee,
                description,
            };
            console.log(setData);
            //删除生成的临时文件
            fs.unlink(picture,  function(err) {
                if (err) {
                    throw err;
                }
                console.log('文件:' + picture + '删除成功！');
            })
        }
        DB.modify('type', {"_id": new DB.ObjectID(_id)}, setData, function (error,data) {
            if (error) {
                console.log('错误');
            }
            console.log('修改数据: ' +  " 成功");
            res.redirect('/product')
        })
    })
});

app.get('/productDelete', function (req, res) {
    var id = req.query.id;
    DB.delete('type', {
        '_id': new DB.ObjectID(id),
    }, function (error,data) {
        if (!error) {
            res.redirect('/product')
        }
    })
});

// 增加商品
app.get('/addTest',function (req, res) {
    DB.insert('type', {
        title: '步步高点读机',
        price: '2599',
        fee: '12',
        picture: ''
    }, function (error,data) {
        if (!error) {
            res.send('product增加成功')
        }
    });
});

app.listen(8020, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8020');
