/**

 * @author BY

 * @date 2019-07-15 22:16

 */
exports.getMime = function (fs,extname) {
    // console.log('1');
    // fs.readFile('./mime.json', function (err, data) {
    //     if (err){
    //         console.log(err);
    //     }
    //     // console.log(data.toString());
    //     var Mimes = JSON.parse(data.toString());
    //     // console.log(Mimes[extname]);
    // console.log('2');
    //     return Mimes[extname] || 'text/html';
    // })
    // console.log('3');
    // 把异步改成同步
    var data = fs.readFileSync('./mime.json');
    var Mimes = JSON.parse(data.toString());
    return Mimes[extname] || 'text/html';
};