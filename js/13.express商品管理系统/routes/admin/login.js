/**

 * @author BY

 * @date 2019-07-24 10:45

 */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send('登录');
});
//处理登录的业务逻辑
router.post('/doLogin',function(req,res){
    res.send('admin user');

});
module.exports = router;