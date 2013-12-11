var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  var $tables = $('.ls-table', 'body');

  function init(){
    $tables.each(function(it, table){
      var $table = $(table);
      applyHeaderBehavior($table);
      toggleHeaderCheckbox($table);
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
    lineActions($table);
  }

  function toggleHeaderCheckbox($table){
    var $checkboxes = $table.find('tbody input[type="checkbox"]'),
        $checkAll = $table.find('thead input[type="checkbox"]');
    $checkAll.on('change', function (evt) {
      $checkboxes
        .prop('checked', evt.currentTarget.checked)
        .parents('tr').toggleClass('selected',  evt.currentTarget.checked );
        toggleTableGroupActions($table, !evt.currentTarget.checked );
    });
    $checkboxes.on('change', function (evt) {
      var checkeds = $checkboxes.filter(':checked').size();
      var checkAllStatus = $checkboxes.size() === checkeds;
      $checkAll.prop('checked', checkAllStatus );
      $(this).parents('tr').toggleClass('selected',  evt.currentTarget.checked );
      toggleTableGroupActions($table, checkeds < 2 );
    });
  }

  // Insere dropdown para cada linha da coluna de acoes se for necessário
  function lineActions($table){
    $table.find('td.ls-table-actions').each(function(itd, td){
      var $actions = $(td).find('a, button');
      if( $actions[1] ){
        $(td).html((function(){
          var dropdownHtml = '<div class="btn-group"> <button type="button" class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">Ações</button><ul class="dropdown-menu pull-right" role="menu">';
          $actions.each(function(i, action){
            var  textClasses,
              actionClass = $(action).attr('class');
            // verifica necessidade e insere cor original da acao
            if( actionClass ){
               textClasses = $.grep( actionClass.split(' '), function(e, i){  return e.indexOf('text-') != -1 }).join(' ');
              if( textClasses ){
                $(action).wrapInner('<span class="' + textClasses + '" />')
                if( textClasses.match(/(danger)/) ){
                  dropdownHtml += '<li role="presentation" class="divider"></li>';
                }
              }
            }
            dropdownHtml += '<li>' + action.outerHTML + '</li>';
          })
          dropdownHtml += '</ul></div>'
          return dropdownHtml;
        })());
      }else{
        $actions.addClass('btn btn-xs btn-default');
        // verifica necessidade e insere cor original da acao
        var  textClasses = $.grep( $actions.attr('class').split(' '), function(e, i){  return e.indexOf('text-') != -1 }).join(' ');
        if( textClasses ){
          $actions.wrapInner('<span class="' + textClasses + '" />')
        }
      }
    });
  }

  function toggleTableGroupActions ($table, hidden) {
    $table.prev('.ls-table-group-actions').toggleClass('hidden', hidden );
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
