var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  var events = {
    '[data-toggle-class]|click': _toggleClass,
    '[data-toggle-text]|click': _toggleText,
    '.ls-link-smooth|click': _smoothScroll
  }

  function init() {
    unbind();
    _autoTrigger();
    _loadEvents();
    subMenu();
    _elementDisabled();
    _linkPreventDefault();
    _btnGroupActivationToogle();
    menuAnchor();
    toggleFields();
  }

  // Quando tem uma hash na url que seja igual a algum target no html
  // esse método faz um trigger click no elemento
  function _autoTrigger(){
    // Esse ponto de exclamação é para funcionar no IE
    var hash = window.location.hash.replace("!/#", "");
    if(hash != ''){
      $('[data-target=' + hash + ']').trigger('click');
      $('a[href=' + hash + ']').trigger('click');
      locastyle.collapse.toggle(hash)
    }
  }

  function toggleFields(){
    $('[data-ls-toggle-fields]').on('click', function(evt) {
      evt.preventDefault();
      var $this = $(this);
      var $container = $($this.data('ls-toggle-fields'));
      $container
        .toggleClass('ls-form-disable')
        .toggleClass('ls-form-text');
      $container
        .find(':input').toggleClass('ls-form-text')
        .toggleAttr('disabled');
    });
  }

  function _loadEvents() {
    $.each(events, function(eventDesc, fn) {
      var selectorEvent = eventDesc.split('|')
      $(selectorEvent[0]).on(selectorEvent[1], selectorEvent[2], function(evt) {
        var $this = $(this);
        fn(evt, $this);
      });
    });
  }

  function menuAnchor() {
    $(".ls-menu .ls-active > a").focus().css('outline', 'none')
  }

  function _toggleClass(evt, $this) {
    evt.preventDefault();
    var $target = $this.data('target') ? $($this.data('target')) : $this,
      cssClass = $this.data('toggle-class');
    $target.toggleClass(cssClass);
  }

  function _toggleText(evt, $this) {
    evt.preventDefault();
    var $target = $this.data('target-text') ? $($this.data('target-text')) : $this,
      textChange = $this.data('toggle-text'),
      textOriginal = $target.text();
    $this.data('toggle-text', textOriginal);
    $target.text(textChange);
  }

  function _smoothScroll(evt, $this) {
    evt.preventDefault();
    var $target = $($this.attr('href'));
    if ($target[0]) {
      $('html,body').animate({
        scrollTop: $target.offset().top - 70
      }, 1000);
    }
  }

  function subMenu() {
    $('.ls-submenu > a').on('click', function(evt) {
      evt.preventDefault();
      $(this).parent().toggleClass('ls-active');
    })
    if($('.ls-submenu').find('li').hasClass('ls-active')){
      $('.ls-submenu li.ls-active').parents('.ls-submenu').addClass('ls-active')
    }
  }

  function _elementDisabled() {
    var $elementDisabled = $('.disabled') || [disabled = 'disabled'];
    $elementDisabled.on('click', function(evt) {
      evt.preventDefault();
    });
  }

  function _linkPreventDefault(dom_scope) {
    $("a", dom_scope).on("click", function(e) {
      if ($(this).attr("href") === "" || $(this).attr("href") === "#") {
        e.preventDefault();
      }
    });
  }

  function _btnGroupActivationToogle() {
    $(".ls-group-active [class*='ls-btn']").on("click", function() {
      $(this).siblings().removeClass("ls-active");
      $(this).addClass("ls-active");
    });
  }

  jQuery.fn.toggleAttr = function(attr) {
    return this.each(function() {
      var $this = $(this);
      $this.attr(attr) ? $this.removeAttr(attr) : $this.attr(attr, attr);
    });
  };

  function unbind () {
    $('[data-ls-toggle-fields]').off('click');
    $('.ls-submenu > a').off('click');
  }

  return {
    init: init,
    subMenu: subMenu
  };

}());
