/**

 * @author BY

 * @date 2019-07-16 10:55

 */

var fs = require('fs');
var events = require('events');

var EventEmitter = new events.EventEmitter();

function getMime(callBack) {
    fs.readFile('mime.json', function (err, data) {
        // 开始广播
       EventEmitter.emit('to_data', data)
    })
}
// 执行方法
getMime();
// getMime(function (result) {
//     console.log(result.toString());
// });

// 监听广播数据
EventEmitter.on('to_data', function (result) {
    console.log(result.toString());
});