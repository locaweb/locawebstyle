var locastyle = locastyle || {};

locastyle.alert = (function(){
  'user strict'

  function init() {
    ariaAlert();
  }

  function ariaAlert() {
    $('[class*="ls-alert"]').attr({ role : 'alert' });
  }

  return {
    init: init
  }

}());
