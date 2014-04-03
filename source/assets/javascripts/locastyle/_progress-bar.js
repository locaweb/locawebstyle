var locastyle = locastyle || {};

locastyle.progress = (function() {
  'use strict';

  // Default config
  var config = {
    classes: {
      animate: 'ls-progress-animated'
    }
  }

  function init() {
    $('.ls-progress').each(function(index, progressbar) {
      var $progressbar = $(progressbar);
      animate($progressbar);
      percent($progressbar);
    });
  }

  function animate($progressbar) {
    if ($progressbar.hasClass(config.classes.animate)) {
      var originalValue = $progressbar.prop('value');
      var resetValue = 0;
      $progressbar.prop('value', resetValue);
      var animProgress = setInterval(function() {
        $progressbar.prop('value', resetValue++);
        if (resetValue >= originalValue) {
          window.clearInterval(animProgress);
        }
      }, 400 / originalValue);
      reAnimate($progressbar);
    }
  }

  function reAnimate($progressbar) {
    document.addEventListener('visibilitychange', function(event) {
      animate($progressbar);
    });
  }

  function percent($progressbar) {
    if ($progressbar.hasClass('ls-progress-percent')) {
      if ($progressbar[0].nodeName == 'PROGRESS') {
      }
    }
  }

  return {
    init: init,
  }

}());
