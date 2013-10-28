var manual = {};
manual.geral = (function() {
  'use strict';

  function init() {
    initRouter();
    initPrettyPrint();
  }

  function initRouter(){
    var section = utils.camelCase( window.location.pathname.split('/')[3] );
    manual[section] ? manual[section].init() : null ;
  }

  function initPrettyPrint(){
    prettyPrint();
    $('pre.prettyprintCode').each(function() {
      var code = $(this).html();
      $(this).text(code).addClass('prettyprint')
      prettyPrint();
    });
  }

  var utils = (function() {

    function camelCase(input) { 
      return input.toLowerCase().replace(/-(.)/g, function(match, group) {
        return group.toUpperCase();
      });
    }

    return {
      camelCase:camelCase
    };

  }());

  return {
    init:init
  };

}());

$(document).ready(function(){
  manual.geral.init();
});