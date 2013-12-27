var manual = manual || {};

manual.geral = (function() {
  'use strict';

  function init() {
    initRouter();
    activeMenu();
    initPrettyPrint();
  }

  function initRouter(){
    if( window.location.pathname.split('/')[3] ){
      var section = utils.camelCase( window.location.pathname.split('/')[3] );
      manual[section] ? manual[section].init() : null ;
    }
  }

  function activeMenu(){
    $('a[href="' + window.location.pathname.replace(/\/$/, '') + '"]', 'nav').addClass('active');
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
