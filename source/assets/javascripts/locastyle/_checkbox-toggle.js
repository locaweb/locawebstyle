var locastyle = locastyle || {};

locastyle.checkboxToggle = (function() {
  'use strict';

  var config = {
    selector: {
      module: '[data-ls-module="checkboxToggle"]'
    }
  };

  // Deselect all target checkboxes
  function deselectAll(checkboxes) {
    checkboxes.prop('checked', false).removeClass('ls-checked');
  }

  // Select all target checkboxes
  function selectAll(checkboxes) {
    checkboxes.prop('checked', true).addClass('ls-checked');
  }

  // Toggle the triggerElement text like the toggleText module
  function toggleText(triggerElement) {
    if (triggerElement.data('toggleText')) {
      var textChange = triggerElement.data('toggleText');
      var textOriginal = triggerElement.text();

      triggerElement.data('toggleText', textOriginal).text(textChange);
    }
  }

  // Watch the target chechboxes and trigger the triggerElement when all are checked or vice versa
  function watchCheckboxes(triggerElement, checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        if (triggerElement.hasClass('ls-triggered')) {
          toggleText(triggerElement);
        }
        triggerElement.prop('checked', false).removeClass('ls-triggered');
        return false;
      }
    }

    triggerElement.prop('checked', true).addClass('ls-triggered');
    toggleText(triggerElement);
  }

  // Event handler for triggerElement
  function eventHandler(el) {
    if (el.hasClass('ls-triggered')) {
      el.trigger('checkboxToggle:activated');
    } else {
      el.trigger('checkboxToggle:deactivated');
    }
  }

  // Register the click.ls events on the triggerElement and target checkboxes
  function triggers(triggerElement, checkboxes) {
    triggerElement.on('click.ls', function() {
      if ($(this).hasClass('ls-triggered')) {
        deselectAll(checkboxes);
      } else {
        selectAll(checkboxes);
      }

      $(this).toggleClass('ls-triggered');
      eventHandler($(this));
      toggleText($(this));
    });

    checkboxes.each(function() {
      $(this).on('click.ls', function() {
        $(this).toggleClass('ls-checked');
        watchCheckboxes(triggerElement, checkboxes);
      });
    });
  }

  // This function is public and initializes the checkboxToggle module
  function init() {
    $(config.selector.module).each(function() {
      var triggerElement = $(this);
      var checkboxes = $('[data-checkbox-toggle="' + triggerElement.data('checkboxTarget') + '"]');

      // This unbind the click.ls event on trigger element and target checkboxes
      triggerElement.off('click.ls');
      checkboxes.off('click.ls');

      triggers(triggerElement, checkboxes);
    });
  }

  return {
    init: init
  };

}());
