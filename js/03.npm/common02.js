var md5 = require('md5-node');

var sd = require('silly-datetime');

console.log(md5('卢俊辉大坏蛋'));

var date = sd.format(new Date(), 'YYYY-HH-DD hh:mm:ss');

console.log(date);