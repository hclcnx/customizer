//
// @name Smooth Load
// @version 0.1
// @date May, 2018
//
var smoothLoader = setInterval(function() {
  if (typeof dojo != 'undefined') {
    clearInterval(smoothLoader);
    require(['dojo/domReady!'], function() {
      try {
        var bodyNode = dojo.query('body.lotusui')[0];
        setTimeout(function() {
          dojo.addClass(bodyNode, 'all-loaded');
        }, 550);
      } catch (e) {
        console.log('smoothLoader - Exception occurred in smoothLoad extension : ' + e);
      }
    });
  }
}, 500);
