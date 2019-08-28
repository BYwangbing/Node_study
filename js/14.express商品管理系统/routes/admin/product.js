/**

 * @author BY

 * @date 2019-07-24 16:01

 */
var express = require('express');
var router = express.Router();
/*引入DB数据库*/
var DB = require('../../modules/db');
/*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var multiparty = require('multiparty');
// 商品列表
router.get('/', function (req, res) {
    // 连接数据库查询数据
    DB.find('type', {}, function (error, data){
        res.render('admin/product/index', {
            list: data
        })
    });
});
// 跳转到增加商品页面
router.get('/add', function (req, res) {
    res.render('admin/product/add')
});
// 处理增加商品业务路由
router.post('/doAdd', function (req, res){
    var form = new multiparty.Form();
    form.uploadDir='upload';  //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        // 获取提交的数据以及图片上传成功返回的图片信息
        // console.log(fields);  /*获取表单的数据*/
        // console.log(files);  /*图片上传成功返回的信息*/
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var picture = files.picture[0].path;
        DB.insert('type', {
            title,
            price,
            fee,
            description,
            picture
        }, function (error, data) {
            if (!error) {
                res.redirect('/admin/product'); /*上传成功跳转到首页*/
            }
        })
    });
});
// 跳转到修改页面
router.get('/edit', function (req, res) {
    var id = req.query.id;
    //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)
    DB.find('type', {
        _id: new DB.ObjectID(id)
    }, function (error, data) {
        // console.log(data);
        res.render('admin/product/edit', {
            list: data[0]
        })
    })
});
// 处理修改商品业务路由
router.post('/doEdit', function (req, res) {
    var form = new multiparty.Form();
    form.uploadDir='upload';  //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        // 获取提交的数据以及图片上传成功返回的图片信息
        // console.log(fields);  /*获取表单的数据*/
        // console.log(files);  /*图片上传成功返回的信息*/
        var _id=fields._id[0];   /*修改的条件*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var picture = files.picture[0].path;
        var originalFilename = files.picture[0].originalFilename;

        var setData;
        if (originalFilename){ /*修改了图片*/
            setData = {
                title,
                price,
                fee,
                description,
                picture
            }
        } else {
            setData = {
                title,
                price,
                fee,
                description,
            };
            console.log(setData);
            //删除生成的临时文件
            fs.unlink(picture,  function(err) {
                if (err) {
                    throw err;
                }
                console.log('文件:' + picture + '删除成功！');
            })
        }
        DB.modify('type', {"_id": new DB.ObjectID(_id)}, setData, function (error,data) {
            if (error) {
                console.log('错误');
            }
            console.log('修改数据: ' +  " 成功");
            res.redirect('/admin/product')
        })
    })
});
// 删除商品路由
router.get('/delete', function (req, res) {
    var id = req.query.id;
    DB.delete('type', {
        '_id': new DB.ObjectID(id),
    }, function (error,data) {
        if (!error) {
            console.log('删除成功');
            res.redirect('/admin/product')
        }
    })
});

module.exports = router;