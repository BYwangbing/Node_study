/**

 * @author BY

 * @date 2019-07-24 16:12

 */
var express = require('express');
/*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var router = express.Router();

router.get('/', function (req, res) {
    res.send('index 首页');
});

module.exports = router;