var locastyle = locastyle || {};

locastyle.steps = (function() {
  'use strict';

  var config = {
    selectors: {
      moduleActive: '.ls-actived [data-ls-module="steps"]',
      nav: '.ls-steps-nav',
      button: '.ls-steps-btn',
      container: '.ls-steps-content',
      steps: '.ls-steps',
      moduleVisible: '.ls-steps-content:visible',
      mobile: '.ls-steps-mobile'
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
    createArrow();
    ariaSteps();
    addAriaLabel();
    addActivedNav();
    mobileInfos();
    bindClickOnTriggers();
    bindMobileMenuClick();
    bindNextStep();
    bindPrevStep();
  }

  // Remove the binds that own module adds
  function unbind() {
    $(config.selectors.nav).off('click.steps');
    $(config.actions.next).off('click.steps');
    $(config.actions.prev).off('click.steps');
  }

  // Create arrow on the navigation
  function createArrow() {
    $('.ls-steps-nav li').prepend('<span class="ls-steps-arrow" />');
  }

  // Add the arias
  function ariaSteps() {
    $(config.selectors.nav).attr('role' , 'tablist');
    $(config.selectors.nav).find(config.selectors.button).attr('aria-selected' , 'false');
    $(config.selectors.nav).find('.ls-active .ls-steps-btn').attr('aria-selected' , 'true');
    $(config.selectors.button).attr('role' , 'tab');
    $(config.selectors.container).attr({ 'aria-hidden' : true, 'role' : 'tabpanel' });
  }

  // Set the mobile infos on data-index and data-title attributes
  function mobileInfos() {
    var steps = $(config.selectors.nav).find('li');

    steps.each(function(index) {
      if ($(this).hasClass(config.status.active)) {
        $(config.selectors.mobile).attr({
          'data-index': (index + 1) + ' de ' + steps.length,
          'data-title': $(this).find(config.selectors.button).attr('title')
        });
      }
    });
  }

  function bindMobileMenuClick() {
    $(config.selectors.mobile).on('click.steps', function() {
      $(config.selectors.steps).toggleClass(config.status.active);
    });
  }

  //Add aria-label in the navigation
  function addAriaLabel() {
    var $elem = $(config.selectors.button);
    var elemLength = $elem.length;
    for (var i=0; i < elemLength; i++) {
      var text = $($elem[i]).attr('title');
      $($elem[i]).attr({ 'aria-label' : text });
    }
  }

  // Displays the contents related to the active button
  function addActivedNav() {
    var index = $(config.selectors.nav).find(config.classes.active).index();

    // Checks if there are any enabled button to load the page
    if(index ===  -1) {
      $(config.selectors.nav).each(function() {
        var $el = $(this).find('li:first').find(config.selectors.button);
        var $target = $el.data('target');
        activateStep($el, $($target));
      });

    } else {
      addActiveContent(index);
      $(config.selectors.nav).find('li:lt(' + index + ')').addClass(config.status.actived);
    }
    var heightStepVisible = $(config.selectors.moduleVisible).height();
    stepsAffix(heightStepVisible);
  }

  //Create the step by activated navigation buttons
  function bindClickOnTriggers() {
    $(config.selectors.nav).on("click.steps", config.selectors.moduleActive, function(evt) {
      evt.preventDefault();
      changeStep($(this));
    });
  }

  // Bind the target to cal the nextStep on click
  function bindNextStep() {
    $(config.actions.next).on('click.steps', function(evt) {
      evt.preventDefault();
      nextStep();
    });
  }

  // Bind the target to call the prevStep on click
  function bindPrevStep() {
    $(config.actions.prev).on('click.steps', function(evt) {
      evt.preventDefault();
      prevStep();
    });
  }

  // Advances to the next step
  function nextStep() {
    // TODO: when change the minor version we can remove this old event.
    var evt = jQuery.Event('NextStepEvent');
    $(document).trigger(evt);

    var beforeEvent = jQuery.Event('BeforeNextStep');
    $(document).trigger(beforeEvent);

    if(!evt.isDefaultPrevented() && !beforeEvent.isDefaultPrevented()) {
      var $el = $(config.selectors.nav).find(config.classes.active).next('li').addClass(config.status.active).find(config.selectors.button);
      changeStep($el);
      $(document).trigger(jQuery.Event('AfterNextStep'));
    }
  }

  // Back to the previous step
  function prevStep() {
    // TODO: when change the minor version we can remove this old event.
    var evt = jQuery.Event('PrevStepEvent');
    $(document).trigger(evt);

    var beforeEvent = jQuery.Event('BeforePrevStep');
    $(document).trigger(beforeEvent);

    if(!evt.isDefaultPrevented() && !beforeEvent.isDefaultPrevented()) {
      var $el = $(config.selectors.nav).find(config.classes.active).prev('li').find(config.selectors.button);
      changeStep($el);
      $(document).trigger(jQuery.Event('AfterPrevStep'));
    }
  }

  // Always visible navigation when the page scrolls
  function stepsAffix(elemVisible) {
    var $steps = $(config.selectors.nav);
    var offset = $steps.offset();
    var $heightNav = $(config.selectors.nav).height();

    $(window).scroll(function() {
      if ($(window).width() < 768) {
        return;
      }
     if ($(window).scrollTop() > offset.top ) {
        var $scroll = parseInt($(window).scrollTop() - $heightNav, 10);

        $steps.stop().animate({
         marginTop: $(window).scrollTop() - offset.top + 20
        });

        if($scroll + $heightNav >= elemVisible ) {
          $steps.stop().animate({
           marginTop: 0
         });
        }
     } else {
       $steps.stop().animate({
         marginTop: 0
       });
     }
    });
  }

  // Check what the order of the activated button
  function addActiveContent(index) {
    $(config.selectors.container).eq(index).addClass(config.status.active);
  }

  // Change the step
  function changeStep($el) {
    var $target = $($el.attr('href') || $el.data('target'));
    activateStep($el, $target);
    deactivateStep($el, $target);
    anchorSteps();
    mobileInfos();

    if ($('html').hasClass('ls-screen-xs') && $(config.selectors.nav).hasClass(config.status.active)) {
      $(config.selectors.mobile).trigger('click');
    }
  }

  //Active step
  function activateStep(el, $target) {
    $(el).parents("li").addClass(config.status.active);
    $(el).parents("li").prev('li').addClass(config.status.actived);
    $target.addClass(config.status.active).attr({ 'aria-hidden' : false });
    $(el).attr('aria-selected' , true);
  }

  //Desactive step
  function deactivateStep(el, $target) {
    $(el).parents("li").siblings().removeClass(config.status.active);
    $target.siblings().removeClass(config.status.active).attr({ 'aria-hidden' : true });
    $(el).parents("li").siblings().find(config.selectors.button).attr('aria-selected' , false);
  }

  // Create scrollTop when to click
  function anchorSteps() {
    $('html, body').stop().animate({scrollTop: $('.ls-steps').offset().top - 60}, 300);
    var heightStepVisible = $(config.selectors.moduleVisible).height();
    stepsAffix(heightStepVisible);
  }

  return {
    init: init,
    unbind: unbind,
    nextStep: nextStep,
    prevStep: prevStep
  };

}());
