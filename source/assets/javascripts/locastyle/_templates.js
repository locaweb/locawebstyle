var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var templatesPath = 'locastyle/templates/_';

  function init(){
  }

  function popover(title, content, placement, customClasses){
    return JST[templatesPath + 'popover']({title: title, content: content, placement: placement, customClasses: customClasses})
  }

  return {
    init: init,
    popover: popover
  }

}());
