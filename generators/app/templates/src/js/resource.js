/**
 * @module <%= name %>/resource
 * @requires hilo/loader/LoadQueue
 * @requires <%= name %>/mediator
 */
var resource = {
    loadedRes:{},
    res:[
        {id:'fish', src:'images/fish.png'},
        {id:'bg', src:'images/bg.jpg'}
    ],
    load:function(){
        var queue = this.queue = new LoadQueue;
        queue.add(res);

        queue.on("complete", function(){
            var imgs = [];
            for(var i = 0;i < res.length;i ++){
                var id = res[i].id;
                loadedRes[id] = queue.getContent(id);
            }
            mediator.fire("resource:complete");
        });

        queue.on("load", function(d){
            mediator.fire("resource:loaded", {
                num:queue._loaded/(queue._source.length + 1)
            });
        });

        queue.start();
    },
    get:function(id){
        return loadedRes[id];
    }
};