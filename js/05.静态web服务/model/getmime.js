/**

 * @author BY

 * @date 2019-07-15 21:22

 */

exports.getMime = function (extname) {
  switch (extname) {
      case '.html':
          return 'text/html';
      case '.css':
          return 'text/lib';
      case '.js':
          return 'text/js';
      default:
          return 'text/html'
  }  
};