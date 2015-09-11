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

  function checkAllRows(mainCheck, table) {
    mainCheck.on(config.events.click, function() {
      if ($(this).prop('checked')) {
        table.find('tbody tr').not(config.selector.checked).find('input[type=checkbox]').trigger(config.events.click);
      } else {
        table.find('tbody tr' + config.selector.checked + ' input[type=checkbox]').trigger(config.events.click);
      }
    });
  }

  function checkRow(table, checkboxes) {
    checkboxes.each(function() {
      $(this).on(config.events.click, function() {
        if ($(this).prop('checked')) {
          $(this).closest('tr').addClass(config.classes.checked);
        } else {
          $(this).closest('tr').removeClass(config.classes.checked);
        }
      });
    });
  }

  function initCheck() {
    var $table = $(config.selector.module);
    var $mainCheck = $table.find(config.selector.mainCheck);

    if ($mainCheck.length) {
      var $checkboxes = $table.find('input[type=checkbox]').not(config.selector.mainCheck);

      checkAllRows($mainCheck, $table);
      checkRow($table, $checkboxes);
    }
  }

  function init() {
    unbindCheckboxes();
    initCheck();
  }

  return {
    init: init
  };

}());
