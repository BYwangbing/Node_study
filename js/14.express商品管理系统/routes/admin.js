/**

 * @author BY

 * @date 2019-07-24 16:13

 */
var express = require('express');
/*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var router = express.Router();
//后台的路由  所有的后台处理都要经过这里
var login = require('./admin/login');
var product = require('./admin/product');

//自定义中间件  判断登录状态 权限管理
// next()   路由继续向下匹配

// 配置路由
router.use('/', login);
router.use('/product', product);

module.exports = router;