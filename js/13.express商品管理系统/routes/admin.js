/**

 * @author BY

 * @date 2019-07-24 10:20

 */
var express = require('express');
/*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
router = express.Router();

//后台的路由  所有的后台处理都要经过这里
var login = require('./admin/login');
var user = require('./admin/user');
//配置路由
router.use('/login',login);
router.use('/user',user);

module.exports = router;