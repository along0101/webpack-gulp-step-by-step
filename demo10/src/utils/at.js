//jquery
require('cd-atwho/caret');
require('cd-atwho');

//@import (css) '~cd-atwho/index.css';
//https://github.com/ichord/At.js/wiki/usage-with-CKEditor

//文章配置
const at_config = {
  at: "@",
  data: "path/to/data.json",
  tpl: "<li data-value='@${name}'>${name} <small>${email}</small></li>",
  callbacks: function() {

  }
};

const emoji_config = {
  at: "[",
  data: emojis,
  tpl: "<li data-value='@${name}'>${name} <small>${email}</small></li>"
}

const stock_config = {
  at: "$",
  tpl: "<li data-value='@${name}'>${name} <small>${email}</small></li>",
  limit: 10,
  /*显示记录条数*/
  max_len: 20,
  display_timeout: 300,
  callbacks: function() {

  }
}


//评论框
const text = $('.comment').atwho(at_conf).atwho(emoji_config).atwho(stock_config);

text.caret('pos', 47);
text.focus().atwho('run');

//文章内的
//$('#ArticleContent').atwho(article_at_conf);

//var ckeditor = $('#yourSelector').ckeditor({...}).ckeditorGet();
// Bind to every CKEditor instance that'll load in the future
CKEDITOR.on('instanceReady', function(event) {

  var editor = event.editor;

  // Switching from and to source mode
  editor.on('mode', function(e) {
    load_atwho(this, at_config);
  });

  // First load
  load_atwho(editor, at_config);

});

function load_atwho(editor, at_config) {

  // WYSIWYG mode when switching from source mode
  if (editor.mode != 'source') {

    editor.document.getBody().$.contentEditable = true;

    $(editor.document.getBody().$)
      .atwho('setIframe', editor.window.getFrame().$)
      .atwho(at_config);

  }
  // Source mode when switching from WYSIWYG
  else {
    $(editor.container.$).find(".cke_source").atwho(at_config);
  }

}


//Prevent adding a new line when pressing ENTER

var ckeditor = $('#yourSelector').ckeditor({ ...
}).ckeditorGet();
ckeditor.enableEnter = true; //Use this as a flag

ckeditor.on('instanceReady', function(event) {
  var at_config = { ...
  };

  this.document.getBody().$.contentEditable = true;
  $(this.document.getBody().$).atwho(at_config);
  $(this.document.getBody().$).on('shown.atwho', function(event) {
    ckeditor.enableEnter = false;
  });
  $(this.document.getBody().$).on('hidden.atwho', function(event) {
    setTimeout(function() {
      //console.log("hide! setting to TRUE");
      ckeditor.enableEnter = true;
    }, 100); //Give it a small time so that the ENTER key only affects the popup and not the editor
  });
});

ckeditor.on('key', function(event) {
  if (event.data.keyCode == 13 && !ckeditor.enableEnter) {
    event.cancel();
  }
});
