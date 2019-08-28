var fs = require('fs');
var data = '我是从数据库获取的数据，我要保存起来\n';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writeStream = fs.createWriteStream('output.txt');

writeStream.write(data, 'utf-8');// 也可以循环写入

// 标记写入完成
writeStream.end();

writeStream.on('finish', (args => {
    console.log('写入完成');
}));

// 写入失败
writeStream.on('error', (args => {
    console.log('写入失败');
}));