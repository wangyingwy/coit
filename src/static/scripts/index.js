/*弹出层tab页切换*/
$('#settingTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

/*拖拽*/
var $win = $(window);

/*var lyt = {
    init:function(ele1,ele2,direction){
        this.$ele1 = ele1;
        this.$ele2 = ele2;
        this.$direction = direction;

        this.initDim();

        //初始化事件
        this.initEvts();
    },
    initEvts:function(){
        //窗体发生变化时重新计算高度或者宽度
        var me = this;
        $win.on('resize.lyt',function(e){
            me.initDim();
        });
    },
    //初始化元素的高宽...
    initDim:function(){
        var me = this;
        if(me.$direction === 'horizontal'){
            me.$ele1Width = me.$ele1.outerWidth(true);
            me.$ele2Width = me.$ele2.outerWidth(true);
        }else if(me.$direction === 'vertical'){
            me.$ele1Height = me.$ele1.outerHeight(true);
        }
    },
    //调整高度或者宽度
    adjust:function(px){
        if(this.$direction === 'horizontal'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('width',this.$ele1Width+px);
            this.$ele2.addClass('no-flex');
            this.$ele2.css('width',this.$ele2Width-px);
        }else if(this.$direction === 'vertical'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('height',this.$ele1Height+px);
        }
    }
};*/
//lyt.init($('#lytCell1'),$('#lytCell2'),'horizontal');
//lyt.init($('#lytCell2'),$('#lytCell3'),'horizontal');
/*lyt.init($('#lytRow1'),$('#lytRow2'),'vertical');*/

var lyt = function(ele1,ele2,direction){
    this.$ele1 = ele1;
    this.$ele2 = ele2;
    this.$direction = direction;

    //初始化事件
    this.initEvts();
    this.initDim();
};

lyt.prototype = {
    //初始化事件时重新计算窗体的宽或高
    initEvts:function(){
        var me = this;
        $win.on('resize.lyt',function(e){
            me.initDim();
        })
    },

    //初始化元素的宽或高
    initDim:function(){
        var me = this;
        if(me.$direction === 'horzontal'){
            me.$ele1Width = me.$ele1.outerWidth(true);
            me.$ele2Width = me.$ele2.outerWidth(true);
        }else if(me.$direction === 'vertical'){
            me.$ele1Height = me.$ele1.outerHeight(true);
        }
    },

    //调整元素的宽或高
    adjust: function(px){
        if(this.$direction === 'horzontal'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('width',this.$ele1.outerWidth+px);
            this.$ele2.addClass('no-flex');
            this.$ele2.css('width',this.$ele2.outerWidth-px);
        }else if(this.$direction === 'vertical'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('height',this.$ele1.outerHeight+px);
        }
    }
};

var splitter = function(ele,direction){
    var $eleSplitter = ele;
    var $direction = direction;

    this.init();
};

splitter.prototype = {
    init:function(){
        var me = this;
        me.draggable({
            containment:'parent',
            scroll:false,
            axis:me.$direction === 'horizontal'?'x':(me.$direction === 'vertical'?'y':''),
            drag:function(evt,ui){
                ui.pos = me.$direction === 'horizontal'?ui.pos.left:(me.$direction === 'vertical'? ui.position.top:'');
                var dis = ui.pos - ui.pos0;
                me.onDrag(dis);
            }
        });
        if(this.$direction === 'horizontal'){
            this.width = this.$ele1.width();
        }else if(this.$direction === 'vertical'){
            this.height = this.$ele1.height();
        };
        this.initPos();
        this.initEvts();
    },
    initEvts:function(){
        var me = this;
        $win.on('resize.splitter',function(){
            me.initPos();
        })
    },
    initPos:function(){
        if(this.$direction === 'horizontal'){
            this.pos0 = lyt.$ele1Width - this.width/2;
            this.$eleSplitter.css('left',this.pos0);
        }else if(this.$direction === 'vertical'){
            this.pos0 = lyt.$ele1Height - this.height/2;
            this.$eleSplitter.css('top',this.pos0);
        }
    },
    onDrag:function(dis){
        lyt.adjust(dis);
    }
}

/*var splitter = {
    init:function(ele){

        var me = this,
            eleSplitter = ele;
        this.$el = eleSplitter.draggable({
            containment: 'parent',
            scroll: false,
            axis: 'y',
            drag: function(evt,ui){
                //计算本次拖动后的位置与上一次位置的差值
                var dis = ui.position.top - me.top0;
                me.onDrag(dis);
            }
        });
        this.height = this.$el.height();
        this.initPos();
        this.initEvts();
    },
    initEvts: function(){
        var me = this;
        $win.on('resize.splitter',function(){
            me.initPos();
        });
    },
    initPos:function(){
        this.top0 = lyt.$ele1Height - this.height/2;
        this.$el.css('top',this.top0);
    },
    onDrag: function(dis){
        lyt.adjust(dis);
    }
};

splitter.init($('#splitterH'));

var splitter2 = {
    init:function(ele){

        var me = this,
            eleSplitter = ele;
        this.$el = eleSplitter.draggable({
            containment: 'parent',
            scroll: false,
            axis:'x',
            drag: function(evt,ui){
                //计算本次拖动后的位置与上一次位置的差值
                var dis = ui.position.left - me.pos0;
                me.onDrag(dis);
            }
        });
        this.width = this.$el.width();
        this.initPos();
        this.initEvts();
    },
    initEvts: function(){
        var me = this;
        $win.on('resize.splitter',function(){
            me.initPos();
        });
    },
    initPos:function(){
        this.pos0 = lyt.$ele1Width - this.width/2;
        this.$el.css('left',this.pos0);
    },
    onDrag: function(dis){
        lyt.adjust(dis);
    }
};

var splitter3 = {
    init:function(ele){

        var me = this,
            eleSplitter = ele;
        this.$el = eleSplitter.draggable({
            containment: 'parent',
            scroll: false,
            axis:'x',
            drag: function(evt,ui){
                //计算本次拖动后的位置与上一次位置的差值
                var dis = ui.position.left - me.pos0;
                me.onDrag(dis);
            }
        });
        this.width = this.$el.width();
        this.initPos();
        this.initEvts();
    },
    initEvts: function(){
        var me = this;
        $win.on('resize.splitter',function(){
            me.initPos();
        });
    },
    initPos:function(){
        this.pos0 = lyt.$ele1Width - this.width/2;
        this.$el.css('left',this.pos0);
    },
    onDrag: function(dis){
        lyt.adjust(dis);
    }
};

splitter2.init($('#splitterV1'));
splitter3.init($('#splitterV2'));*/



//初始化js选择组件
new extraAssets('Javascript');

//初始化css选择组件
new extraAssets('CSS');

