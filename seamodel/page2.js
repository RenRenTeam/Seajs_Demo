define(function (require, exports, module) {
    exports.init = function (pageid,html) {        
        $("#" + pageid).html(html);
    };
});