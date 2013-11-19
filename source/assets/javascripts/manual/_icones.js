manual.icones = (function() {
  'use strict';

  var $icons = $('.box1');

  function init() {
    insertSearch();
    searchIcons();
  }

  function insertSearch(){
    var searchHtml =  '<form><div class="form-group">' +
      '<label for="searchIcons">Busca de ícones</label>' +
      '<input type="search" id="searchIcons" placeholder="Busca ícone" class="form-control col-md-4"/>' +
      '<p id="searchResultText">&nbsp;</p>' +
      '</div></form>'
    $icons.eq(0).before(searchHtml);
  }

  function searchIcons(){
    $('#searchIcons').on('keyup', function(e){
      var query = $(this).val();
      var $searchResultText = $('#searchResultText');
      var $foundIcons = $icons.find('[class*="' + query + '"]');
      if( query.length > 0){
        if( $foundIcons.size() === 0 ){
          $searchResultText.html('Nenhum ícone encontrado com o termo:<b>' + query + '</b>');
          $icons.hide();
        } else {
          $icons.hide();
          $foundIcons.parent('.box1').show();
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