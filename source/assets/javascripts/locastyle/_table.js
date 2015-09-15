var locastyle = locastyle || {};

locastyle.table = (function() {
  'use strict';

  var config = {
    selector: {
      module: '[data-ls-module=table]',
      mainCheck: '.ls-main-check',
      checked: '.is-checked'
    },
    classes: {
      checked: 'is-checked'
    },
    events: {
      click: 'click.ls'
    }
  };

  function unbindCheckboxes() {
    $(config.selector.module).find('input[type=checkbox]').each(function() {
      $(this).off(config.events.click);
    });
  }

  function checkAllRows(table, mainCheck) {
    mainCheck.on(config.events.click, function() {
      if ($(this).prop('checked')) {
        table.find('tbody tr').not(config.selector.checked).find('input[type=checkbox]').trigger(config.events.click);
      } else {
        table.find('tbody tr' + config.selector.checked + ' input[type=checkbox]').trigger(config.events.click);
      }
    });
  }

  function watchCheckboxes(mainCheck, checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        if (mainCheck.prop('checked')) {
          mainCheck.prop('checked', false);
        }

        return false;
      }
    }

    mainCheck.prop('checked', true);
  }

  function checkRow(table, mainCheck, checkboxes) {
    checkboxes.each(function() {
      $(this).on(config.events.click, function() {
        if ($(this).prop('checked')) {
          $(this).closest('tr').addClass(config.classes.checked);
        } else {
          $(this).closest('tr').removeClass(config.classes.checked);
        }

        watchCheckboxes(mainCheck, checkboxes);
      });
    });
  }

  function initCheck() {
    var $table = $(config.selector.module);

    $table.each(function() {
      var $mainCheck = $(this).find(config.selector.mainCheck);

      if ($mainCheck.length) {
        var $checkboxes = $(this).find('input[type=checkbox]').not(config.selector.mainCheck);

        checkAllRows($(this), $mainCheck);
        checkRow($(this), $mainCheck, $checkboxes);
      }
    });
  }

  function init() {
    unbindCheckboxes();
    initCheck();
  }

  return {
    init: init
  };

}());
