'user strict';

//引入events模块
var events = require('events');
//创建eventEmitter对象
var EventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandle = function connected(){
	console.log('连接成功');
//	触发data_received事件
	EventEmitter.emit('data_received');//第四步
};//第三步

//绑定connection事件
EventEmitter.on('connection',connectHandle);//第二步

//使用匿名函数绑定data_received事件
EventEmitter.on('data_received',function(){
	console.log('数据连接成功');
});//第五步

//触发connection事件
EventEmitter.emit('connection');//第一步
console.log('程序执行完毕');
