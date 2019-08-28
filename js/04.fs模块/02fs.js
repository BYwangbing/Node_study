var fs = require('fs');

// 1.判断服务器上面有没有upload目录。没有创建这个目录。

fs.stat('upload', function (err, stats) {
    if (err) {
        fs.mkdir('upload', function (error) {
            if (error){
                // console.log(err.message);
                return false;
            }
            console.log('创建目录成功')
        })
    }else {
        console.log(stats.isDirectory());
        console.log('目录已存在');
    }
});

//2. 找出src目录下面的所有的目录，然后打印出来

// fs.readdir('src', function (err, files) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log(files);
//     // 判断是目录还是文件夹
//     for (var i = 0; i<files.length; i++) {
//         // console.log(files[i]);
//         fs.stat(files[i], function (err1, stats) {
//             /*循环判断是目录还是文件  ---异步 错误写法*/
//             console.log(files[i])         //undefined
//         });
//     }
// });
var filesArr = [];
fs.readdir('src', function (err, files) {
    if (err){
        console.log(err.message);
        return false;
    }else {
        // console.log(files); /*数组*/
        // 判断是目录还是文件夹
        (function getFile(i) {

            if (i == files.length){
                console.log('目录: ' + filesArr);
                console.log(filesArr);
                return false;
            }

            fs.stat('src/' + files[i], function (err1, stats) {
                if (stats.isDirectory()){
                    filesArr.push(files[i])
                }
                // 递归调用
                getFile(i+1);
            });
        })(0)
    }
});

//打印出什么   3 3  3
// for(let i=0;i<3;i++){
//    setTimeout(function(){
//        console.log(i);
//    },100)
// }