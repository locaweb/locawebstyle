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
      enableFormControls($table);
    });
  }

  function enableFormControls($container){
      locastyle.forms.insertDatepicker($container);
      locastyle.forms.insertSelect2($container, '[disabled]');
      locastyle.forms.insertMasks($container);
  }

  function showModal($table){
    $('[data-edit-line]', $table).on('click', function(evt) {
      evt.preventDefault();
      var headerAction = locastyle.templates.button_dropdown_single({
        label: 'Ações',
        addClass: 'pull-right',
        actions: [
          {label: 'Visualizar', link: '#view'},
          {label: 'Editar', link: '#edit'}
        ]
      })
      var config = {
        header : {
          title: 'Editar',
          close: false,
          action: headerAction
        },
        body: locastyle.templates.form(formModalFields($table, $(this).parents('tr') )),
        footer: {
          actions: [
            {label: 'Salvar', classes: 'btn-primary'},
          ]
        }
      }
      var $modal = locastyle.templates.modal('body', config).modal('show');
      $modal.on('hidden.bs.modal', function (e) {
        $modal.remove();
      });
      locastyle.forms.insertSelect2($modal);
    });
  }

  // busca os campos da linha, label sendo o th da coluna, descarta as colunas checkAll e Acoes
  function formModalFields($table, $tr){
    var formData = {},
        labels = [];
    formData.fields = [];
    $table.find('thead th').each(function(itr, th){
      labels.push( $.trim($(th).text()) );
    });
    $tr.find('td').each(function(itd, td){
      var inputHTML =  $(td).find(':input, select').clone().removeAttr('disabled')[0].outerHTML;
      formData.fields.push({ label: labels[itd] , input: inputHTML });
    });
    formData.fields = formData.fields.slice(1, formData.fields.length -1 );
    return formData;
  }

  function toggleInputsEdit($table){
    $('[data-enable-edit]', $table).on('click', function(evt) {
      evt.preventDefault();
      var $tr = $(this).parents('tr');
      locastyle.forms.insertSelect2( $tr );
      $tr.find('[disabled]').each(function(ii, el){
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
