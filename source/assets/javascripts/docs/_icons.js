var lsdocs = lsdocs || {};

lsdocs.icons = (function() {
  'use strict';

  function searchIcons() {
    var icons = $('.list-icons li');

    $('#search-icons-form').on('submit', function(e) {
      e.preventDefault();
    });

    $('#search-icons-btn').on('keyup search', function(e) {
      var query = $(this).val();
      var searchResultText = $('#search-icons-result');
      var foundIcons = icons.find('[class*="' + query + '"]');

      if (query.length > 0) {
        icons.hide();

        if (foundIcons.size() === 0 ) {
          searchResultText.html('Nenhum ícone encontrado com o termo: <b>' + query + '</b>');
        } else {
          searchResultText.html('Encontrado(s) <b>' + foundIcons.size() + '</b> ícone(s)');
          foundIcons.parent('.list-icons li').show();
        }
      } else {
        icons.show();
        searchResultText.html('');
      }
    });
  }

  function init() {
    searchIcons();
  }

  return {
    init:init
  };
}());

$(document).ready(lsdocs.icons.init);
