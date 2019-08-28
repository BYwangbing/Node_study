/**

 * @author BY

 * @date 2019-07-24 16:01

 */
var express = require('express');
/*md5加密*/
var md5=require('md5-node');
/*引入DB数据库*/
var DB = require('../../modules/db');
/*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var router = express.Router();
// 获取post
var bodyParser = require('body-parser');
// //配置body-parser中间件
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());


router.get('/', function (req, res) {
    res.render('admin/login');
});
// 处理登录的业务逻辑
router.post('/doLogin', function (req, res) {
    /*获取post提交的数据*/
    console.log(req.body);
    var username = req.body.username;
    var password = md5(req.body.password);
    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user', {
        username: username,
        password: password
    },function (error, data){
        if (data.length > 0){
            req.session.userInfo = data[0];  // 保存用户信息
            console.log('登录成功');
            res.redirect('/admin/product');/*登录成功跳转到商品列表*/
        }else {
            console.log('登录失败');
            res.send("<script>alert('登录失败'); location.href = '/admin'</script>")
        }
    });
});

module.exports = router;