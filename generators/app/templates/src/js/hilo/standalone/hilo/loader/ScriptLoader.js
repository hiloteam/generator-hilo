/**
 * Hilo 1.0.0 for standalone
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */
define('hilo/loader/ScriptLoader', ['hilo/core/Class'], function(Class){

/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */

/**
 * @private
 * @class javascript或JSONP加载器。
 * @module hilo/loader/ScriptLoader
 * @requires hilo/core/Class
 */
var ScriptLoader = Class.create({
    load: function(data){
        var me = this, src = data.src, isJSONP = data.type == 'jsonp';

        if(isJSONP){
            var callbackName = data.callbackName || 'callback';
            var callback = data.callback || 'jsonp' + (++ScriptLoader._count);
            var win = window;

            if(!win[callback]){
                win[callback] = function(result){
                    delete win[callback];
                }
            }
        }

        if(isJSONP) src += (src.indexOf('?') == -1 ? '?' : '&') + callbackName + '=' + callback;
        if(data.noCache) src += (src.indexOf('?') == -1 ? '?' : '&') + 't=' + (+new Date());

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = me.onLoad.bind(me);
        script.onerror = me.onError.bind(me);
        script.src = src;
        if(data.id) script.id = data.id;
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    onLoad: function(e){
        var script = e.target;
        script.onload = script.onerror = null;
        return script;
    },

    onError: function(e){
        var script = e.target;
        script.onload = script.onerror = null;
        return e;
    },

    Statics: {
        _count: 0
    }

});

return ScriptLoader;

});