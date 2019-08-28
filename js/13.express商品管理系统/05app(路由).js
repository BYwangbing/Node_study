/**
 * @author BY
 * @date 2019-07-24 10:14
 */
//引入模块
var admin = require('./routes/admin');
var index = require('./routes/index');

var express = require('express');
var app = new express();

// admin
// admin/user
app.use('/admin', admin);
app.use('/', index);
app.listen(8020, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8020');