/**

 * @author BY

 * @date 2019-07-18 07:57

 */
var app = function () {
    console.log('app');
};
// app();
app.get = function () {
    console.log('app.get');
};
app.post = function () {
    console.log('app.post');
};
app.get();
app.post();