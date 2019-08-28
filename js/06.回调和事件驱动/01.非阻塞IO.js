/**

 * @author BY

 * @date 2019-07-16 08:57

 */

// 非阻塞IO

var fs = require('fs');
console.log('1');
fs.readFile('mime.json', function (err, data) {
    console.log('2');
});
console.log('3');

function getMime() {
    fs.readFile('mime.json', function (error, args) {
        // console.log(args.toString());
        return args.toString();
    })
}
console.log(getMime());