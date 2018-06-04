/**
 * Created by kobe on 2015-1-4.
 */
var MM = {};
$.extend({
    ns : function(str) {
        var arr = str.split(".");
        var prefix = arr[0];
        if (prefix == "MM") {
            o = MM;
        } else {
            if (window[prefix] === undefined) {
                o = window[prefix] = {};
            } else {
                o = window[prefix];
            }
        }
        for (var i = 1; i < arr.length; i++) {
            o[arr[i]] = o[arr[i]] || {};
            o = o[arr[i]];
        }
        return o;
    }
});