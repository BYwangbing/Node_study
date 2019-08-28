/**

 * @author BY

 * @date 2019-07-21 15:59

 */

/*
让用户看不到cookie明文信息
  1.保存的时候加密
  2.cookie-parser里面  signed属性设置成true

cookie的加密：
    1.参数表示加密的随机字符串
     app.use(cookieParser('sign'));
    2.设置
     res.cookie('username','云深不知处',{maxAge:600000,signed:true});
    3.使用  获取
     req.signedCookies
*/

var express = require('express');
var app = new express();
var cookieParser = require('cookie-parser');
// 设置中间件
app.use(cookieParser('sign'));

app.get('/', function (req, res) {
    console.log(req.signedCookies);
    res.send('我想带一人回云深不知处，带回去，藏起来！')
});

app.get('/news', function (req, res) {
    console.log(req.signedCookies);
    res.send('news路径');
});

app.get('/set', function (req, res) {
    //参数1：名字
    //参数2:cookie的值
    //参数3：cookie的配置信息
    // maxAge： 最大失效时间（毫秒），设置在多少后失效
    res.cookie('username', '云深不知处', {maxAge: 900000, httpOnly: true, signed:true});
    res.send('设置cookie成功');
});

app.listen(8001, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8001');