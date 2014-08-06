var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var templatesPath = 'locastyle/templates/_';

  function init() {
  }

  function popover(elementData) {
    return JST[templatesPath + 'popover'](elementData);
  }

  function modal(elementData) {
    return JST[templatesPath + 'modal'](elementData);
  }

  function dropdown(elements) {
    return JST[templatesPath + 'dropdown']({elements: elements});
  }

  function browserUnsupportedBar() {
    return JST[templatesPath + 'browser-unsupported-bar']();
  }

  return {
    init: init,
    popover: popover,
    modal: modal,
    dropdown: dropdown,
    browserUnsupportedBar: browserUnsupportedBar
  };

}());
