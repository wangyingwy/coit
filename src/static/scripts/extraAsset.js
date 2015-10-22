/**
 * ������Դ��������css��js��
 * @param rootId ����������id
 * @param opts �����������
 */
var extraAssets = function(rootId, opts){
    //������Ĭ��ֵ����
    this.opts = opts = $.extend({},{
        cssSelect:'.add-spe-file',
        cssList:'.extra-filelist',
        cssTplFileItem:'#tplExtraFileItem'
    },opts||{});

    this.$root = $('#'+rootId);
    this.$select = this.$root.find(opts.cssSelect);
    this.$ul = this.$root.find(opts.cssList);
    this.tpl = $(opts.cssTplFileItem).html();

    this.init();
};

extraAssets.prototype = {

    init:function(){

        this.initEvents();

    },

    initEvents:function(){
        var me = this;
        this.$root.on('change', this.opts.cssSelect,function(e){

            //��ȡѡ��option��ֵ
            var val = $(this).val();
            me.add(val);

        }).on('click','.btn-close-item',function(e){

            var $li = $(this).parents('li');
            me.remove($li);

        }).on('click','.btn-addNew',function(e){
            me.addNew();
        });

        this.$ul.sortable().disableSelection();



    },
    /**
     * ɾ��һ��
     */
    remove:function($li){

        var len = this.$ul.find('li').length;
        if(len>2){
            $li.remove();
            return;
        }
        $li.find('input').val('');
    },
    /**
     * ����һ��
     */
    add:function(url){
        //�Ƿ����
        if(this.exists(url)) return;
        //�Ƿ�ӵ�����
        if(this.addToEmptyRow(url)) return;

        //����һ��
        var $row = this.addNew();
        $row.find('input').val(url);
    },
    addNew:function(){
        //����һ��
        var $row = $(this.tpl);
        this.$ul.append($row);
        return $row;
    },
    /**
     * ����Ƿ��пյ��У�����н�url����Ϊ�ÿ���input��ֵ
     * @param url
     */
    addToEmptyRow:function(url){
        var $input = null;
        this.$ul.find('input').each(function(i,o){
            if(o.value === ''){
                $input = $(o);
                return false;
            }
        });

        //�п���
        if($input!==null){
            $input.val(url);
            return true;
        }

        //û�п���
        return false;

    },
    /**
     * �Ƿ��Ѵ��ڼ�¼
     */
    exists:function(url){
        //���UL�������е�input���ж�valueֵ�Ƿ��е���url�������˵������
        var exist = false;
        this.$ul.find('input').each(function(i,o){
            if(o.value === url){
                exist = true;
                return false;
            }
        });
        return exist;
    }

};