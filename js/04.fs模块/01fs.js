var fs =require('fs');
// 1. fs.stat  检测是文件还是目录
// fs.stat('dist', function (err, stats) {
//     if (err){
//         console.log(err);
//         return false;
//     } else {
//         console.log('文件： ' + stats.isFile());
//         console.log('目录： ' + stats.isDirectory())
//     }
// });

// 2. fs.mkdir  创建目录
    //接收参数：
        //path            将创建的目录路径
        //mode          目录权限（读写权限），默认0777
        //callback      回调，传递异常参数err
// fs.mkdir('src', function (err) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log('创建目录成功')
// });

//3. fs.writeFile  创建写入文件
    //filename    (String)             文件名称
    //data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
            //         会覆盖
    //options     (Object)           option数组对象，包含：
        //· encoding (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
        //· mode     (Number)        文件读写权限，默认值 438
        //· flag     (String)            默认值 ‘w'
    //callback {Function}  回调，传递一个异常参数err。
fs.writeFile('t.text', '夷陵老祖魏无羡', 'utf-8', function (err) {
    if (err){
        console.log(err.message);
        return false;
    }
    console.log('写入文件成功')
});

//4. fs.appendFile 追加文件
fs.appendFile('t1.txt', '此生不悔入魔道\n', function (err) {
    if (err){
        console.log(err.message);
        return false;
    }
    console.log('追加文件成功')
});

//5. fs.readFile 读取文件
fs.readFile('index.txt', function (err, data) {
    if (err){
        console.log(err.message);
        return false;
    }
    // console.log(data);
    console.log(data.toString());
});

//6. fs.readdir读取目录  把目录下面的文件和文件夹都获取到
                        //拿到一个文件夹下面的所有目录
fs.readdir('src', function (err, data) {
    if (err){
        console.log(err.message);
        return false;
    }
    console.log(data);
});

//7. fs.rename 重命名
//1.重命名
// fs.rename('src/index.html', 'src/news.html', function (err) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log('重命名成功');
// });

// 2.剪切文件
// fs.rename('src/style.lib', 'src/lib/basic.lib', function (err) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log('剪切文件成功');
// });

//8. fs.rmdir  删除目录
// fs.rmdir('132', function (err) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log('删除目录成功');
// });

//9. fs.unlink删除文件
// fs.unlink('1.txt', function (err) {
//     if (err){
//         console.log(err.message);
//         return false;
//     }
//     console.log('删除文件成功');
// });