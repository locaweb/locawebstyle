var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  var $tables = $('.ls-table', 'body');

  function init(){
    $tables.each(function(it, table){
      var $table = $(table);
      applyHeaderBehavior($table);
    });
  }

  // Aplica as classes do header da tabela nos seus equivalentes no tbody
  function applyHeaderBehavior($table){
    var thClasses = [];
    $table.find('thead tr th').each(function(ith, th){
      thClasses.push($(th).attr('class') );
    });
    $table.find('tbody tr').each(function(itr, tr){
      var tds = $(tr).find('td');
      for (var i = thClasses.length - 1; i >= 0; i--) {
        tds.eq(i).addClass( thClasses[i] )
      };
    });
  }
  
  // Quando as tabelas tiverem checkboxes e mais de dois checkboxes forem marcados, será exibido um box com ações (ex: excluir, enviar, duplicar e etc).
  function showActions () {
    $('.ls-table').each(function() {

      var $tableStyle = $(this);
      var $wellTableId = $(this).prop('id');
      var $checkAll   = $tableStyle.find('th input[type="checkbox"]');
      var $checkboxes = $tableStyle.find('td input[type="checkbox"]');

      // Quando clica no checkbox principal, seleciona todos os outros
      $checkAll.on('change', function(){
        $checkboxes.prop('checked', $checkAll.prop('checked') );

        ( !$(this).prop('checked') ? $checkboxes.parents('tr').removeClass('selected') : $checkboxes.parents('tr').addClass('selected') );

        showWellTable();
      });

      // Quando seleciona todos os checkboxes, seleciona o checkbox principal também
      $checkboxes.on('change', function () {
        $checkAll.prop('checked', $tableStyle.find('td input[type="checkbox"]:checked').size() == $checkboxes.size() );
        $(this).parents('tr').toggleClass('selected');
        showWellTable();
      });

      function showWellTable() {
        // Verifica quantidade de itens checados para mostrar as opções de ação
        if ( $tableStyle.find('td input[type="checkbox"]:checked').size() >= 1 ) {
          $('[data-target="'+ $wellTableId +'"]').removeClass('hidden');
        } else {
          $('[data-target="'+ $wellTableId +'"]').addClass('hidden');
        }

        // Conta quantos checkboxes existe checados e marca no Counter
        $('[data-target="'+ $wellTableId +'"]').find('.counterChecks').html($tableStyle.find('td input[type="checkbox"]:checked').size());
      }

    });
  }

  return {
    init: init
  };

}());
