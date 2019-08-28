/**

 * @author BY

 * @date 2019-07-18 09:20

 */
var http = require('http');
var ejs = require('ejs');
var app = require('./model/express_router');

http.createServer(app).listen(3000);

app.get('/', function (req, res) {
    var msg = '得不到的永远在骚动，被偏爱的都有恃无恐';
    ejs.renderFile('views/index.ejs', {
        msg: msg,
    }, function (err, data) {
        res.send(data);
    })
});

app.get('/login', function (req, res) {
   ejs.renderFile('views/form.ejs', {}, function (err, data) {
       res.send(data);
   })
});

app.post('/doLogin', function (req, res) {
    console.log(req.body);   /*获取post传过来的数据*/
    res.send("<script>alert('登录成功');history.back();</script>");
});

app.get('/register', function (req, res) {
    var r_msg = '注册页面';
    var h = '<h2>全世界最好的师姐</h2>'
    ejs.renderFile('views/register.ejs', {
        r_msg,
        h
    }, function (err, data) {
        res.send(data);
    })
});

app.get('/news', function (req, res) {
    res.send('新闻数据');
});

console.log('Server running at http://127.0.0.1:3000');