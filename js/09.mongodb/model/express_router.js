/**

 * @author BY

 * @date 2019-07-18 14:54

 */
var url = require('url');
//封装方法改变res  绑定res.send()
function changeRes(res) {
    res.send = function (data) {
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end(data);
    }
}

var Server = function () {
    var G = this; //全局变量
    //处理get和post请求
    this._get = {};
    this._post = {};

    var app = function (req, res) {
        changeRes(res);
        //获取路由
        var pathname = url.parse(req.url).pathname;
        if(!pathname.endsWith('/')){
            pathname = pathname + '/'
        }
        //获取请求的方式 get  post
        var method = req.method.toLocaleLowerCase();

        if (G['_' + method][pathname]) {
           if(method == 'get'){
               G['_' + method][pathname](req, res);   //执行注册方法
           }else {
                var postStr = '';
                req.on('data', function (chunk) {
                    postStr += chunk;
                });
                req.on('end', function (err, chunk) {
                    req.body = postStr;
                    console.log(postStr);
                    //G._post['doLogin'](req,res)
                    G['_' + method][pathname](req, res);
                })
           }
        }else {
            res.end('No router');
        }
    };

    app.get = function (string, callback) {
        // 其中startsWith判断当前字符串是否以anotherString作为开头，而endsWith则是判断是否作为结尾。
        if (!string.startsWith('/')) {
            string = '/' + string
        }
        if (!string.endsWith('/')) {
            string = string + '/'
        }
        //    /login/
        G._get[string] = callback;
        // 注册方法
        // G['string'] = function () {
        //
        // }
    };

    app.post = function (string, callback) {
        // 其中startsWith判断当前字符串是否以anotherString作为开头，而endsWith则是判断是否作为结尾。
        if (!string.startsWith('/')) {
            string = '/' + string
        }
        if (!string.endsWith('/')) {
            string = string + '/'
        }
        //    /login/
        G._post[string] = callback;
        // 注册方法
        //G._post['doLogin']=function(req,res){
        //
        //}
    };

    return app;
};

module.exports = Server();