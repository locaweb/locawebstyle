var manual = {};
manual.general = (function() {
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
    if( window.location.pathname.split('/')[2] === 'elementos' ){
      insertMarkupExample();
    }
  }

  function insertMarkupExample(){
    $('.element-example').each(function(i,e){
      var HTML = $(this).html();
      $(e).after('<div><button class=" toggle-markup-example btn btn-default">Ver código HTML</button><pre class="lang-html prettyprint linenums hidden" id="code-example-'+i+'"></pre></div>');
      $('#code-example-'+i).text(HTML);
      // prettyPrint();
    });
    $('.toggle-markup-example').on('click', function(){
      $(this).next().toggleClass('hidden')
    });
  }

  function activeMenu(){
    $('a[href="' + window.location.pathname + '"]', 'nav').addClass('active');
  }

  function initPrettyPrint(){ 
    $('pre.prettyprint-code').each(function() {
      var code = $(this).html()
      $(this).text(code).addClass('prettyprint')
    });
      prettyPrint();
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
  manual.general.init();
});