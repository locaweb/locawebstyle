var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var templatesPath = 'locastyle/templates/_';

  function init() {
  }

  function popover(elementData) {
    return JST[templatesPath + 'popover'](elementData)
  }

  function modal(elementData) {
    return JST[templatesPath + 'modal'](elementData)
  }

  return {
    init: init,
    popover: popover,
    modal: modal
  }

}());
