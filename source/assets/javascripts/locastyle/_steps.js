var locastyle = locastyle || {};

locastyle.steps = (function() {
  'use strict';

  function init() {
    stepsAffix();
    unbind();
    bindClickOnTriggers();
    nextStep();
    prevStep();
    ariaSteps();
  }

  function stepsAffix() {
    var $steps   = $(".ls-steps-nav");
    var offset    = $steps.offset();
    var marginTop = 20;
    $(window).scroll(function() {
     if ($(window).scrollTop() > offset.top) {
       $steps.stop().css({
         marginTop: $(window).scrollTop() - offset.top + marginTop
       });
     } else {
       $steps.stop().css({
         marginTop: 0
       });
     };
    });
  }

  function bindClickOnTriggers() {
    $(".ls-steps-nav").on("click.steps", ".ls-actived [data-ls-module=steps]", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      activateStep(this,$target);
      deactivateStep(this,$target);
    });
  }

  function activateStep(el, $target) {
    $(el).parents("li").addClass("ls-active ls-actived");
    $target.addClass("ls-active");
    $(el).attr('aria-selected' , true);
  }

  function deactivateStep(el, $target) {
    $(el).parents("li").siblings().removeClass("ls-active");
    $target.siblings().removeClass("ls-active");
    $(el).parents("li").siblings().find('.ls-steps-btn').attr('aria-selected' , false);
  }

  function nextStep() {
    $('[data-action="next"]').on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $('.ls-steps-nav .ls-active').next('li').addClass('ls-actived ls-active').find('.ls-steps-btn');
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  function prevStep() {
    $('[data-action="prev"]').on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $('.ls-steps-nav .ls-active').prev('li').find('.ls-steps-btn');
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $('[data-ls-module=steps]').off('click.steps');
  }

  function ariaSteps() {
    $('.ls-steps-nav').attr('role' , 'tablist');
    $('.ls-steps-btn').attr('role' , 'tab');
    $('.ls-steps-nav .ls-active .ls-steps-btn').attr('aria-selected' , 'true');
    $('.steps-content').attr('role' , 'tabpanel');
  }

  return {
    init: init
  };

}());
