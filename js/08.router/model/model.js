/**

 * @author BY

 * @date 2019-07-17 16:36

 */
var ejs = require('ejs');
var fs = require('fs');
var app = {
    login: function (req, res) {
        console.log('login路由');
        // res.end('login路由');
        ejs.renderFile('views/form.ejs', {}, function (err, data) {
            res.end(data);
        })
    },
    register: function (req, res) {
        console.log('register路由');
        res.end('register路由');
    },
    doLogin: function(req, res){
        var postStr= '';
        req.on('data', function (chunk) {
            postStr += chunk;
        });
        req.on('end', function () {
            fs.appendFile('login.txt', postStr+'\n', function (err) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('写入数据成功');
            });
            res.end("<script>alert('登录成功');history.back();</script>");
        });
        res.end('doLogin');
    },
    home: function (req, res) {
        console.log('home路由');
        res.end('home路由');
    }
};
// 执行login模块的两种方法
// app.login('req');
// app['register']('req');
module.exports = app;
