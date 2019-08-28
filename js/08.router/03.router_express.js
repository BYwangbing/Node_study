/**

 * @author BY

 * @date 2019-07-18 08:00

 */
var G = {};
var app = function (req, res) {
    if (G['login']) {
        G['login'](req, res);   //执行注册方法
    }else {
        console.log('无G[\'login\']方法');
    }
};
// 定义一个get方法
app.get = function (string, callback) {
    G[string] = callback;
    // 注册方法
    // G['string'] = function () {
    //
    // }
};
// 执行get方法
app.get('login', function (info, args) {
    console.log('login + ' + info + ' + ' + args);
});

setTimeout(function () {
    app('req', 'res');
}, 1000);