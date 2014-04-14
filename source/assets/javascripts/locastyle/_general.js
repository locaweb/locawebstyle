var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  var events = {
    '[data-toggle-class]|click': _toggleClass,
    '[data-toggle-text]|click': _toggleText,
    '.ls-link-smooth|click': _smoothScroll
  }

  function init() {
    _loadEvents();
    showSidebar();
    showNotifications();
    subMenu();
    _locationHashTrigger();
    _elementDisabled();
    _linkPreventDefault();
    _btnGroupActivationToogle();
    menuAnchor();
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
    $(".ls-active").focus().css('outline', 'none')
  }

  function _toggleClass(evt, $this) {
    evt.preventDefault();
    var $target = $this.data('target') ? $($this.data('target')) : $this,
      cssClass = $this.data('toggle-class');
    $target.toggleClass(cssClass);
  }

  function _toggleText(evt, $this) {
    evt.preventDefault();
    var $target = $this.data('target') ? $($this.data('target')) : $this,
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

  function _locationHashTrigger() {
    if (window.location.hash) {
      $('a[class*="ls-"][href="' + window.location.hash + '"]').trigger('click');
    }
  }

  function showSidebar() {
    var $showHide = $('.show-sidebar');
    var $html = $('html');

    $showHide.on('touchstart click', function(evt) {
      $html.toggleClass('sidebar-visible');
      evt.preventDefault();
    });
  }

  function showNotifications() {
    var $showHide = $('.show-notifications');
    var $html = $('html');

    $showHide.on('touchstart click', function(evt) {
      $html.toggleClass('notifications-visible');
      evt.preventDefault();
    });
  }

  function subMenu() {
    $('.ls-submenu > a').on('click', function(evt) {
      $(this).parent().toggleClass('active');
      evt.preventDefault();
    })
    if($('.ls-submenu-item').hasClass('active')){
      console.log($('.ls-submenu-item').closest('ul').parent().addClass('active'))
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
    $(".ls-group-active .ls-btn").on("click", function() {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });
  }

  return {
    init: init
  };

}());
