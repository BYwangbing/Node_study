/**

 * @author BY

 * @date 2019-07-21 16:21

 */

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function (req, res) {
    console.log(req.cookies.name);
    res.send('你浏览过的城市有：' +  req.cookies.name);
});

app.get('/city', function (req, res) {
    // http://127.0.0.1:8002/lvYou?city=北京
    var city = req.query.city;  /*获取当前城市*/
    var browse_city = req.cookies.name;  /*数组  获取所有的城市*/
    if(browse_city){
        browse_city.push(city)
    }else{
        browse_city = [];  /*没有浏览过任何城市的话 citys改为数组 */
        browse_city.push(city)
    }
    res.cookie('name', browse_city, { maxAge: 1000*60*60, httpOnly: true });
    res.send('你浏览的城市是：' + city);
});

app.listen(8002, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8002');