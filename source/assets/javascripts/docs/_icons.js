var lsdocs = lsdocs || {};

lsdocs.icones = (function() {
  'use strict';

  var $icons = $('.list-icons li');

  function init() {
    insertSearch();
    searchIcons();
  }

  function insertSearch(){
    var searchHtml =  '<form class="doc-search-icons">' +
      '<input type="search" id="searchIcons" aria-label="Buscar ícone" placeholder="Buscar ícone">' +
      '<p id="searchResultText"></p>' +
      '</form>'
    $('.list-icons').eq(0).before(searchHtml);
  }

  function searchIcons(){
    $('#searchIcons').on('keyup', function(e){
      var query = $(this).val();
      var $searchResultText = $('#searchResultText');
      var $foundIcons = $icons.find('[class*="' + query + '"]');
      console.log($foundIcons)
      if( query.length > 0){
        if( $foundIcons.size() === 0 ){
          $searchResultText.html('Nenhum ícone encontrado com o termo: <b>' + query + '</b>');
          $icons.hide();
        } else {
          $icons.hide();
          $foundIcons.parent('.list-icons li').show();
          $searchResultText.html('Encontrado(s) <b>' + $foundIcons.size() + '</b> ícone(s)');
        }
      } else {
        $icons.show();
        $searchResultText.html('&nbsp;');
      }
    });
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsdocs.icones.init();
});
