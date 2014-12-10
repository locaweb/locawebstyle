var locastyle = locastyle || {};

locastyle.steps = (function() {
  'use strict';

  var config = {
    selectors: {
      moduleActive: '.ls-actived [data-ls-module=steps]',
      nav: '.ls-steps-nav',
      button: '.ls-steps-btn',
      container: '.ls-steps-content'
    },
    status: {
      active: 'ls-active',
      actived: 'ls-actived'
    },
    classes: {
      active: '.ls-active'
    },
    actions:{
      next: '.ls-steps-content [data-action="next"]',
      prev: '.ls-steps-content [data-action="prev"]'
    }
  };

  function init() {
    unbind();
    stepsAffix();
    addActivedNav();
    bindClickOnTriggers();
    nextStep();
    prevStep();
    ariaSteps();
    addAriaLabel();
  }

  function stepsAffix() {
    var $steps   = $(config.selectors.nav);
    var offset    = $steps.offset();
    var marginTop = 20;
    $(window).scroll(function() {
     if ($(window).scrollTop() > offset.top) {
       $steps.stop().animate({
         marginTop: $(window).scrollTop() - offset.top + marginTop
       });
     } else {
       $steps.stop().animate({
         marginTop: 0
       });
     };
    });
  }

  function addActivedNav() {
    var index = $(config.selectors.nav).find(config.classes.active).index();
    addActiveContent(index);
    index = parseInt(index + 1);
    $(config.selectors.nav).find('li:lt(' + index + ')').addClass(config.status.actived);
  }

  function addActiveContent(index) {
    $(config.selectors.container).eq(index).addClass(config.status.active);
  }

  function addAriaLabel() {
    $(config.selectors.button).each(function(i, e){
      var text = $(e).text();
      $(e).attr({ 'aria-label' : text });
      $(e).html('');
    });
  }

  function bindClickOnTriggers() {
    $(config.selectors.nav).on("click.steps", config.selectors.moduleActive, function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      activateStep(this,$target);
      deactivateStep(this,$target);
    });
  }

  function activateStep(el, $target) {
    $(el).parents("li").addClass(config.status.active).addClass(config.status.actived);
    $target.addClass(config.status.active).attr({ 'aria-hidden' : false });
    $(el).attr('aria-selected' , true);
  }

  function deactivateStep(el, $target) {
    $(el).parents("li").siblings().removeClass(config.status.active);
    $target.siblings().removeClass(config.status.active).attr({ 'aria-hidden' : true });
    $(el).parents("li").siblings().find(config.selectors.button).attr('aria-selected' , false);
  }

  function nextStep() {
    $(config.actions.next).on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $(config.selectors.nav).find(config.classes.active).next('li').addClass(config.status.active).addClass(config.status.actived).find(config.selectors.button);
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  function prevStep() {
    $(config.actions.prev).on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $(config.selectors.nav).find(config.classes.active).prev('li').find(config.selectors.button);
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $(config.selectors.nav).off('click.steps');
    $(config.actions.next).off('click.steps');
    $(config.actions.prev).off('click.steps');
  }

  function ariaSteps() {
    $(config.selectors.nav).attr('role' , 'tablist');
    $(config.selectors.nav).find(config.selectors.button).attr('aria-selected' , 'false');
    $(config.selectors.nav).find('.ls-active .ls-steps-btn').attr('aria-selected' , 'true');
    $(config.selectors.button).attr('role' , 'tab');
    $(config.selectors.container).attr({ 'aria-hidden' : true, 'role' : 'tabpanel' });;
  }

  return {
    init: init,
    unbind: unbind
  };

}());
