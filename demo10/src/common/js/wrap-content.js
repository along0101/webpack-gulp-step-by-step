import $ from 'jqury';

class WrapContentMark{

  const EMOJI_REG = /\[([\w\:\u4e00-\u9fa5]+)\]/g;

  const AT_REG = /@([\w\u4e00-\u9fa5\_\-]+) /g;

  const DOLAR_REG = /\$[\w\u4e00-\u9fa5]+\(([\w]+)\)\$/g;
//wstr = str.replace(REG,"<img src=\"$1\" title=\"$2\" />");

  constructor(){

  }

  at(){

  }

  stock(){

  }

  emoji(){
    //[em:大哭]，[em:清仓]，[大笑]
    let node = $('.comment .content');
    let content = node.html();

    if(content){
      content.replace(EMOJI_REG,function(item,index){
        console.log(item,index);
        // if (item in emojis) {
        //   return '<img src="'+emojis[item]+'" data-key="'+index+'" title="'++'" />';
        // }
        //return item;
      });
    }else{
      this.emptyNotice();
    }
  }

  emptyNotice(){
    console.log('选择的区域内没有可渲染的内容');
  }
}

export {WrapContentMark};
