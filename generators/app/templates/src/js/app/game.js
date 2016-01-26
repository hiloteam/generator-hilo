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
    init:function(stageContainer){
        this.stageContainer = stageContainer;
        this.bindEvent();
        loading.start();
        resource.load();
    },
    bindEvent:function(){
        var that = this;
        mediator.on('resource:loaded', function(event){
            loading.loaded(event.detail.num);
        });

        mediator.on('resource:complete', function(){
            that.initGame();
        });
    },
    initGame:function(){
        this._initStage();
        this._initScene();
        mediator.fire('game:init');
        this.ticker.start();
    },
    tick:function(dt){
        this.fish.x += 3;
        if(this.fish.x > this.stage.width){
            this.fish.x = -this.fish.width;
        }
    },
    _initStage:function(){
        var stage = this.stage = new Stage({
            width:320,
            height:400,
            renderType:'webgl',
            container:this.stageContainer
        });

        var ticker = this.ticker = new Ticker(60);
        ticker.addTick(stage);
        ticker.addTick(this);
    },
    _initScene:function(){
        var fish = this.fish = new Bitmap({
            x:100,
            y:100,
            image:resource.get('fish'),
            rect:[0, 0, 174, 126],
            onUpdate:function(){
                this.alpha += this.alphaSpeed;
                if(this.alpha < 0){
                    this.alpha = 0;
                    this.alphaSpeed *= -1;
                }
                else if(this.alpha > 1){
                    this.alpha = 1;
                    this.alphaSpeed *= -1;
                }
            }
        });
        fish.alphaSpeed = 0.02;

        var bg = this.bg = new Bitmap({
            image:resource.get('bg')
        });

        this.stage.addChild(bg, fish);
    }
};