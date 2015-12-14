define(function (require, exports, module) {
    var $=require('jquery');
    exports.sayHi = function () {
        $(document.body).append('<h1>Hello! Everybody!</h1>');
       // $('#inner').css('transform','rotate(360deg)');

    }
    
});