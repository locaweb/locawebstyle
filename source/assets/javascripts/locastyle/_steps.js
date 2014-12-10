var locastyle = locastyle || {};

locastyle.steps = (function() {
  'use strict';

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
    var $steps   = $(".ls-steps-nav");
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
    var index = $('.ls-steps-nav .ls-active').index();
    addActiveContent(index);
    index = parseInt(index + 1);
    $('.ls-steps-nav li:lt(' + index + ')').addClass('ls-actived');
  }

  function addActiveContent(index) {
    $('.ls-steps-content').eq(index).addClass('ls-active');
  }

  function addAriaLabel() {
    $('.ls-steps-btn').each(function(i, e){
      var text = $(e).text();
      $(e).attr({ 'aria-label' : text });
      $(e).html('');
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
    $target.addClass("ls-active").attr({ 'aria-hidden' : false });
    $(el).attr('aria-selected' , true);
  }

  function deactivateStep(el, $target) {
    $(el).parents("li").siblings().removeClass("ls-active");
    $target.siblings().removeClass("ls-active").attr({ 'aria-hidden' : true });
    $(el).parents("li").siblings().find('.ls-steps-btn').attr('aria-selected' , false);
  }

  function nextStep() {
    $('.ls-steps-content [data-action="next"]').on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $('.ls-steps-nav .ls-active').next('li').addClass('ls-actived ls-active').find('.ls-steps-btn');
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  function prevStep() {
    $('.ls-steps-content [data-action="prev"]').on("click.steps", function(evt) {
      evt.preventDefault();
      var $el = $('.ls-steps-nav .ls-active').prev('li').find('.ls-steps-btn');
      var $target = $($el.attr("href") || $el.data("target"));
      activateStep($el, $target);
      deactivateStep($el, $target);
    });
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $('.ls-steps-nav').off('click.steps');
    $('.ls-steps-content [data-action="next"]').off('click.steps');
    $('.ls-steps-content [data-action="prev"]').off('click.steps');
  }

  function ariaSteps() {
    $('.ls-steps-nav').attr('role' , 'tablist');
    $('.ls-steps-btn').attr('role' , 'tab');
    $('.ls-steps-nav .ls-steps-btn').attr('aria-selected' , 'false');
    $('.ls-steps-nav .ls-active .ls-steps-btn').attr('aria-selected' , 'true');
    $('.ls-steps-content').attr({ 'aria-hidden' : true, 'role' : 'tabpanel' });;

  }

  return {
    init: init,
    unbind: unbind
  };

}());
