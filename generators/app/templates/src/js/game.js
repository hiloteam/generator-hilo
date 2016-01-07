/**
 * @module <%= name %>/game
 * @requires hilo/view/Stage
 * @requires hilo/util/Ticker
 * @requires hilo/view/Bitmap
 * @requires <%= name %>/mediator
 * @requires <%= name %>/resource
 * @requires <%= name %>/loading
 */
var game = {
    init:function(gameContainer){
        this.gameContainer = gameContainer;
        this.bindEvent();
        loading.start();
        resource.load();
    },
    bindEvent:function(){
        var that = this;
        mediator.on('resource:loaded', function(event){
            loading.loaded(event.num);
        });

        mediator.on('resource:complete', function(){
            that.initGame();
        });
    },
    initGame:function(){
        this._initStage();
        this._initScene();
        mediator.fire('game:init');
    },
    tick:function(dt){
        this.fish.rotation ++;
    },
    _initStage:function(){
        var stage = that.stage = new Stage({
            container:that.gameContainer
        });

        var ticker = that.ticker = new Ticker(60);
        ticker.addTick(stage);
        ticker.addTick(this);
        ticker.start();
    },
    _initScene:function(){
        var fish = this.fish = new Bitmap({
            image:resource.get('fish'),
            rect:[0, 0, 100, 100]
        });

        var bg = this.bg = new Bitmap({
            image:resource.get('bg')
        });

        this.stage.addChild(bg, fish);
    }
};