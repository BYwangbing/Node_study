/**

 * @author BY

 * @date 2019-07-16 11:31

 */
exports.getMime = function (fs, EventEmitter, extname) {
    fs.readFile('./mime.json', function (err, data) {
        if (err){
            console.log(err);
            return false;
        }
        var Mimes = JSON.parse(data.toString());
        var result=  Mimes[extname] || 'text/html';
        // 开始广播
        EventEmitter.emit('to_mimes', result)
    });
};