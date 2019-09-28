/**

 * @author BY

 * @date 2019-07-23 16:39

 */
var MongoClient = require('mongodb').MongoClient;
var DbUrl = ' mongodb://127.0.0.1:27017/product';//连接数据库
function __connect(callback) {
    MongoClient.connect(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            console.log('数据库连接失败');
            return;
        }
        callback(db);
    })
}
exports.find = function (collectionName, json, callback) {
    __connect(function (db) {
        var my_db = db.db('product');
        var result = my_db.collection(collectionName).find(json);
        result.toArray(function (error, data) {
            if (error) {
                console.log(error + '查找数据失败');
            }
            console.log(data);
            callback(data);
        })
    })
};
