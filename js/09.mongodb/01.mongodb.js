/**

 * @author BY

 * @date 2019-07-19 11:22

 */
// mongod --dbpath E:\mongdb

var http = require('http');
var url = require('url');
var ejs = require('ejs');
var app = require('./model/express_router');
var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
var DBurl = 'mongodb://127.0.0.1:27017/student';//连接数据库的地址    student表示数据库的名称

http.createServer(app).listen(8082);

app.get('/', function (req, res) {
    var msg = '这是数据库的数据';
    ejs.renderFile('views/index.ejs', {
        msg: msg,
    }, function (err, data) {
        res.send(data);
    })
});

app.get('/add', function (req, res) {
    // 连接数据库
    MongoClient.connect(DBurl, { useNewUrlParser: true }, function (err, db) { //连接数据库
        //尝试 3.0 写法 成功
        // const my_db = db.db('需要引用的数据库名');
        // my_db.collection(collectionName);
        if (err){
            console.log(err);
            console.log('数据库连接失败');
        }
        //增加数据
        const my_db = db.db('student');
        my_db.collection('student').insertOne({
            "name": "abc",
            "age": 12,
            "sex": "女"
        }, function (error, result_data) {
            if (error){
                console.log('增加数据失败');
                return;
            }
            res.send('增加数据: '    +  " 成功");
            db.close();/*关闭数据库*/
        })
    })
});

app.get('/modify', function (req, res) {
   // res.send('修改数据成功');
   //  连接数据库
    MongoClient.connect(DBurl, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.log(err);
            console.log('数据库连接失败');
        }
        var my_db = db.db('student');
        my_db.collection('student').updateOne({"name":"李四","age":15},{$set: {
            "name": "Tom",
        }}, function (error, data) {
            if (error){
                console.log('修改数据失败');
                return;
            }
            // console.log(data);
            res.send('修改数据: ' +  " 成功");
            db.close();/*关闭数据库*/
        })
    })
});

app.get('/delete', function (req, res) {
    // /delete?name=Tom
    var query = url.parse(req.url, true).query;//{ name: 'Tom' }
    var name = query.name;  //Tom
    MongoClient.connect(DBurl, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.log(err);
            console.log('数据库连接失败');
        }
        var my_db = db.db('student');
        my_db.collection('student').deleteOne({"name":name}, function (error, data) {
            if (error){
                console.log('删除数据失败');
                return;
            }
            res.send('删除数据: ' +  " 成功");
            db.close();/*关闭数据库*/
        })
    })
});


//定义函数表达式，用于操作数据库并返回结果
var findData = function(db, callback) {
    //获得指定的集合
    var my_db = db.db('student');
    var collection = my_db.collection('student');
    // //要查询数据的条件，<=10岁的用户
    // var  where={age:{"$lte":10}};
    // //要显示的字段
    // var set={name:1,age:1};
    collection.find().toArray(function (err, result) {
        //如果存在错误
        if (err) {
            console.log('Error:' + '查找数据失败');
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
};
app.get('/find', function (req, res) {
    // res.send('查找数据成功');
    MongoClient.connect(DBurl, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.log(err);
            console.log('数据库连接失败');
        }
        //执行插入数据操作，调用自定义方法
        findData(db, function(result) {
            //显示结果
            ejs.renderFile('views/list.ejs',{result:result},function(err,data){
                res.send(data);
            });
            //关闭数据库
            db.close();
        });
    });
});

console.log('Server running at http://127.0.0.1:8082/');
