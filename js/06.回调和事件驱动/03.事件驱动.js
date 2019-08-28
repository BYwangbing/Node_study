/**

 * @author BY

 * @date 2019-07-16 09:33

 */
var events = require('events');
// console.log(events);

var EventEmitter = new events.EventEmitter();
//监听to_mime的广播
EventEmitter.on('to_mime' , function (data) {
    console.log(data);
});

//监听to_parent的广播
EventEmitter.on('to_parent' , function (data) {
    console.log(data);
    EventEmitter.emit('to_mime', '监听to_parent广播的同时，开始to_mime广播');
});

setTimeout(function () {
    console.log('开始广播...');
    EventEmitter.emit('to_parent', '发送的数据：明知不可为之而为之');
}, 2000);
