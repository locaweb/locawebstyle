var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  function init(){
    console.log('tables')
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
