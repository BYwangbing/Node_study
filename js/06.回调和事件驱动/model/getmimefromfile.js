/**

 * @author BY

 * @date 2019-07-15 22:16

 */
exports.getMime = function (fs,extname,callback) {
    fs.readFile('./mime.json', function (err, data) {
        if (err){
            console.log(err);
            return false;
        }
        var Mimes = JSON.parse(data.toString());
        var result = Mimes[extname] || 'text/html';
        callback(result);
    });
};