/**

 * @author BY

 * @date 2019-07-20 10:33

 */
var express = require('express');
var ejs = require('ejs');
var app = new express();
/*配置ejs模板引擎*/
app.set('view engine', 'ejs');
//views默认会在这个文件里面找模板
//设置模板的位置
app.set('views', __dirname + '/views');

// http://127.0.0.1:8002/img/girl.jpg
app.use(express.static('public'));   //public 目录下面的文件就可以访问了
// public目录下面的文件提供静态web服务
// http://127.0.0.1:8002/static/img/girl.jpg
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    // res.send('express使用ejs模板引擎')
    res.render('index');/*ejs渲染模板*/
});

app.get('/news', function (req, res) {
    var args = ['明知不可为而为之', '陌上人如玉，公子世无双', '斯人若彩虹，遇上方知有'];
    res.render('news', {
        list: args
    });/*ejs渲染模板*/
});

app.listen(8002, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8002');