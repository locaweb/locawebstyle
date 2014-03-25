var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var templatesPath = 'locastyle/templates/_';

  function init(){
  }

  function popover(target, title, content){
    $(target).append( JST[templatesPath + 'popover']({title: title, content: content}) );
  }

  return {
    init: init,
    popover: popover
  }

}());
