/*������tabҳ�л�*/
$('#settingTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

/*��ק*/
var $win = $(window);

/*var lyt = {
    init:function(ele1,ele2,direction){
        this.$ele1 = ele1;
        this.$ele2 = ele2;
        this.$direction = direction;

        this.initDim();

        //��ʼ���¼�
        this.initEvts();
    },
    initEvts:function(){
        //���巢���仯ʱ���¼���߶Ȼ��߿��
        var me = this;
        $win.on('resize.lyt',function(e){
            me.initDim();
        });
    },
    //��ʼ��Ԫ�صĸ߿�...
    initDim:function(){
        var me = this;
        if(me.$direction === 'horizontal'){
            me.$ele1Width = me.$ele1.outerWidth(true);
            me.$ele2Width = me.$ele2.outerWidth(true);
        }else if(me.$direction === 'vertical'){
            me.$ele1Height = me.$ele1.outerHeight(true);
        }
    },
    //�����߶Ȼ��߿��
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

    //��ʼ���¼�
    this.initEvts();
    this.initDim();
};

lyt.prototype = {
    //��ʼ���¼�ʱ���¼��㴰��Ŀ���
    initEvts:function(){
        var me = this;
        $win.on('resize.lyt',function(e){
            me.initDim();
        })
    },

    //��ʼ��Ԫ�صĿ���
    initDim:function(){
        var me = this;
        if(me.$direction === 'horzontal'){
            me.$ele1Width = me.$ele1.outerWidth(true);
            me.$ele2Width = me.$ele2.outerWidth(true);
        }else if(me.$direction === 'vertical'){
            me.$ele1Height = me.$ele1.outerHeight(true);
        }
    },

    //����Ԫ�صĿ���
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
                //���㱾���϶����λ������һ��λ�õĲ�ֵ
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
                //���㱾���϶����λ������һ��λ�õĲ�ֵ
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
                //���㱾���϶����λ������һ��λ�õĲ�ֵ
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



//��ʼ��jsѡ�����
new extraAssets('Javascript');

//��ʼ��cssѡ�����
new extraAssets('CSS');

