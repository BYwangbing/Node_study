/**

 * @author BY

 * @date 2019-07-16 09:18

 */

var fs = require('fs');

function getMime(callBack) {
    fs.readFile('mime.json', function (err, data) {
        callBack(data);
    })
}
getMime(function (result) {
    console.log(result.toString());
});