var locastyle = locastyle || {};

locastyle.passwordStrength = (function() {
  'use strict';

  function init(dom_scope){
    searchPasswordCheckers(dom_scope);
  }

  function searchPasswordCheckers(dom_scope) {
    $("input[data-component=password-strength]", dom_scope).each(function (index, value) {
      var monitorId = $(this).data("monitor-id");
      var monitor = $("#" + monitorId);
      if(monitorId) {
        bindPasswordChecker(this, monitor);
      }
    })
  }

  function bindPasswordChecker(field, monitor) {
    fillMonitor(field, monitor, $(field).val());
    $(field).on("keyup", function () {
      fillMonitor(field, monitor, $(field).val());
    })
  }

  function fillMonitor(field, monitor, password) {
    cleanMonitorClasses(monitor);
    $(monitor).addClass(checkPasswordStrength(password));
  }

  function cleanMonitorClasses(monitor) {
    var cssClasses = ["empty", "weak", "medium", "good", "strong"]
    $.each(cssClasses, function () {
      $(monitor).removeClass(this);
    })
  }

  function checkPasswordStrength(password) {
    if(isLongerEnough(password) && containsNumbers(password) && containsLetters(password) && containsCapitalLetters(password) && containsNonWordCharacter(password)){
      return "strong";
    }
    if(isLongerEnough(password) && containsNumbers(password) && containsLetters(password) && containsCapitalLetters(password)){
      return "good";
    }
    if(isLongerEnough(password) && containsNumbers(password) && containsLetters(password) && containsNonWordCharacter(password)){
      return "good";
    }
    if(isLongerEnough(password) && containsNumbers(password) && containsLetters(password)){
      return "medium";
    }
    if(isLongerEnough(password)){
      return "weak";
    }
    if(isPresent(password)){
      return "weak";
    } else {
      return "empty";
    }
  }

  function isPresent(password) {
    return password.length > 0;
  }

  function isLongerEnough(password) {
    return password.length > 7;
  }

  function containsNumbers(password) {
    var regexp = new RegExp(/[0-9]/);
    return password.match(regexp);
  }

  function containsLetters(password) {
    var regexp = new RegExp(/[a-z]/);
    return password.match(regexp);
  }

  function containsCapitalLetters(password) {
    var regexp = new RegExp(/[A-Z]/);
    return password.match(regexp);
  }

  function containsNonWordCharacter(password) {
    var regexp = new RegExp(/\W/);
    return password.match(regexp);
  }

  function externalChecker(password) {
    return checkPasswordStrength(password);
  }

  return {
    init: init,
    checkIt: externalChecker
  };

}());
