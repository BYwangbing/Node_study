var fs = require('fs');

//流的方式读取文件

var readStream = fs.createReadStream('index.txt');

var str = '';//保存数据
var count = 0;

readStream.on('data', (args) => {
    str += args;
    count++;
});

// 读取完成
readStream.on('end', (chunk) => {
    console.log(str);
    console.log(count);
});

// 读取失败
readStream.on('error', (err) => {
    console.log(err);
});