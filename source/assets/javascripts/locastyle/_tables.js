var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  var $tables = $('.ls-table', 'body');

  function init(){
    $tables.each(function(it, table){
      var $table = $(table);
      applyHeaderBehavior($table);
      toggleHeaderCheckbox($table);
      toggleInputsEdit($table);
      showModal($table);
      locastyle.forms.insertDatepicker($table);
      locastyle.forms.insertSelect2($table);
      locastyle.forms.insertMasks($table);
    });
  }

  function showModal($table){
    $('[data-edit-line]', $table).on('click', function(evt) {
      evt.preventDefault();
      var headerAction = locastyle.templates.button_dropdown_single({
        label: 'Ações',
        addClass: 'pull-right',
        actions: [
          {label: 'Visualizar', link: '#1',
          {label: 'Editar', link: '#2'}
        ]
      })
      var config = {
        header : {
          title: 'Editar',
          close: false,
          action: headerAction
        },
        body: 'conteudo',
        footer: {
          action: 'Salvar'
        }
      }
      locastyle.templates.modal(config)
      $('#template-modal').modal('show')
    });
  }

  function toggleInputsEdit($table){
    $('[data-enable-edit]', $table).on('click', function(evt) {
      evt.preventDefault();
      $(this).parents('tr').find('[disabled]').each(function(ii, el){
        var $el = $(el),
            originalValue = $el.val();
        $el.data('originalValue', originalValue);
        $el.removeAttr('disabled');
      })
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
        toggleTableGroupActions($table, (evt.currentTarget.checked ? $checkboxes.size() : 0 ) );
    });
    $checkboxes.on('change', function (evt) {
      var checkeds = $checkboxes.filter(':checked').size(),
          checkAllStatus = $checkboxes.size() === checkeds;
      $checkAll.prop('checked', checkAllStatus );
      $(this).parents('tr').toggleClass('selected',  evt.currentTarget.checked );
      toggleTableGroupActions($table, checkeds );
    });
  }

  // Insere dropdown para cada linha da coluna de acoes se for necessário
  function lineActions($table){
    $table.find('td.ls-table-actions').each(function(itd, td){
      var $actions = $(td).find('a, button');
      if( $actions[1] || window.innerWidth <= 767 ){
        $(td).html((function(){
          var dropdownHtml = '<div class="btn-group"> <button type="button" class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown"><span>Ações</span></button><ul class="dropdown-menu pull-right" role="menu">';
          $actions.each(function(i, action){
            var  textClasses,
              actionClass = $(action).attr('class');
            // verifica necessidade e insere cor original da acao
            if( actionClass ){
               textClasses = $.grep( actionClass.split(' '), function(e, i){  return e.indexOf('text-') != -1 }).join(' ');
              if( textClasses ){
                $(action).wrapInner('<span class="' + textClasses + '" />')
                if( textClasses.match(/(danger)/) && $actions[1] ){
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
          $actions.wrapInner('<span class="' + textClasses + '" />');
        }
      }
    });
  }

  function toggleTableGroupActions ($table, checkeds) {
    $table.prev('.ls-table-group-actions')
      .toggleClass('hidden', checkeds < 2 )
      .find('.counterChecks').text( checkeds );
  }

  return {
    init: init
  };

}());
