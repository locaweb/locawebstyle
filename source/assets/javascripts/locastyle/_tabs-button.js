var locastyle = locastyle || {};

locastyle.button = (function() {
  'use strict';

  function init() {
    unbind();
    addActivedButton();
    bindClick();
    ariaTabs();
  }

  function unbind() {
    $('[data-ls-module=button]').off('click.button');
  }

  function bindClick() {
    $('[data-ls-module="button"]').on('click.button', function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr('href') || $(this).data('target'));
      var $buttons = '[data-ls-module=button]';
      deactivateElement(this, $target, $buttons);
      activateElement(this, $target);
      removeChecked();
      $(this).find('input').prop('checked', true);
    });
  }

  function removeChecked(){
    $('[data-ls-module="button"] input[type="radio"]').each(function(index, el){
      $(el).removeAttr('checked');
    });
  }

  function addChecked(el){
    $(el).each(function(index, el){
      $(el).attr('checked','checked');
    });
  }

  function addActivedButton(){
    $('.ls-tabs-btn-nav li.ls-active').each(function(){
      if($(this).hasClass('ls-active') === true){

        var $elem = $(this).find('[data-ls-module="button"]');
        var $target = $elem.attr('href') || $elem.data('target');
        var $buttons = '[data-ls-module=button]';

        addChecked($(this).find('[data-ls-module="button"] input[type="radio"]'));
        deactivateElement($elem, $target, $buttons);
        activateElement($elem, $target);
      }
    });
  }


  function activateElement(el, $target) {
    $(el).parents('li').addClass('ls-active');
    $($target).addClass('ls-active');
    $(el).attr('aria-selected' , true);
  }

  function deactivateElement(el, $target, $buttons) {
    $(el).parents('li').siblings().removeClass('ls-active');
    $($target).siblings().removeClass('ls-active');
    $(el).parents('li').siblings().find($buttons).attr('aria-selected' , false);
  }

  function ariaTabs() {
    $('.ls-tabs-btn-nav').attr('role' , 'tablist');
    $('.ls-tabs-btn-nav .ls-btn').attr('role' , 'tab');
    $('.ls-tabs-btn-nav .ls-active .ls-btn').attr('aria-selected' , 'true');
    $('.ls-tabs-btn .ls-tab-content').attr('role' , 'tabpanel');
  }

  return {
    init: init,
    unbind: unbind
  };

}());
