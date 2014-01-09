var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  var $tables = $('.ls-table', 'body');
  var isXsmall = window.innerWidth <= 767;

  function init(){
    $tables.each(function(it, table){
      var $table = $(table);
      applyHeaderBehavior($table);
      toggleHeaderCheckbox($table);
      addViewClickLine($table);
      toggleInputsEdit($table);
      showModal($table);
      enableFormControls($table);
      confirmDanger($table);
      mobileTableGroupActions($table);
    });
  }

  function addViewClickLine($table){
    if( isXsmall ){
      $table.find('tbody tr').each(function(itr, tr){
        if( $(tr).find('.hidden-xs')[0] ){
          $(tr).find('td').not('.ls-table-actions').attr('data-action-modal', 'view');
        }
      });
    }
  }

  function enableFormControls($container){
      locastyle.forms.insertDatepicker($container, '[disabled]');
      locastyle.forms.insertSelect2($container, '[disabled]');
      locastyle.forms.insertMasks($container);
  }

  function modalDropdownActions($modal){
    $('.ls-modal-action', $modal).off().on('click', function(evt){
      evt.preventDefault();
      var disabled = $(this).attr('href') === '#view';
      var $modalBody = $modal.find('.modal-body');
      var $modalFooter = $modal.find('.modal-footer');
      if( disabled ){
        $modalBody.find(':input, select, div.datepicker').attr('disabled', true);
        $modalBody.find('.datepicker').datepicker("destroy");
        $modalBody.find('.datepicker .input-group-btn').remove();
        $modalBody.find('.select2').select2('destroy');
        $modalFooter.find('.btn.btn-primary').hide();
      } else{
        $modalBody.find(':input, select, div.datepicker').attr('disabled', false);
        enableFormControls($modal);
        $modalFooter.find('.btn.btn-primary').show();
      }
    });
  }

  function showModal($table){
    $('[data-action-modal]', $table).on('click', function(evt) {
      evt.preventDefault();
      var headerTitle = this.nodeName == 'TD' ? 'Visualizar' : $(this).text();
      var actionModal = $(this).data('actionModal');
      var headerAction = locastyle.templates.button_dropdown_single({
        label: 'Ações',
        addClass: 'pull-right',
        actions: [
          {label: 'Visualizar', link: '#view', classes: 'ls-modal-action'},
          {label: 'Editar', link: '#edit', classes: 'ls-modal-action'}
        ]
      });
      var config = {
        header : {
          title: headerTitle,
          close: false,
          action: headerAction
        },
        body: locastyle.templates.form(formModalFields($table, $(this).parents('tr') )),
        footer: {
          actions: [
            {label: 'Salvar', classes: 'btn-primary'}
          ]
        }
      }
      var $modal = locastyle.templates.modal('body', config).modal('show');
      var $modalBody = $modal.find('.modal-body');
      $modal
        .on('hidden.bs.modal', function (e) {
          $modal.remove();
        })
        .on('shown.bs.modal', function (e) {
          $modalBody.find(':input').eq(0).focus();
        })
      locastyle.forms.formReadOnly($modalBody, actionModal === 'view');
      enableFormControls($modal);
      modalDropdownActions($modal);
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
      var $input = $(td).find(':input, select');
      if( $input[0] ){
        if( $(td).find('div.datepicker')[0] ){
          var datepicker = $(td).find('div.datepicker').clone().removeAttr('disabled')
          datepicker.find('input').removeAttr('disabled');
          var inputHTML = datepicker[0].outerHTML;
        }else{
          var inputHTML =  $input.clone().removeAttr('disabled')[0].outerHTML;
        }
      } else{
          var inputHTML =  '<p>' + $(td).html() + '</p>';
      }
      formData.fields.push({ label: labels[itd] , input: inputHTML });
    });
    formData.fields = formData.fields.slice(1, formData.fields.length -1 );
    return formData;
  }

  function toggleInputsEdit($table){
    $('[data-enable-edit]', $table).on('click', function(evt) {
      evt.preventDefault();
      var $tr = $(this).parents('tr');
      $(this).parents('.btn-group').hide();
      $(this).parents('td').addClass('ls-table-actions-show').append('<div class="lsa"><button class="btn btn-xs btn-success  ico-checkmark" type="button"><span class="hidden">Cancelar</span></button> <button class="btn btn-default btn-xs ico-close" type="button"><span class="hidden">Salvar</span></button></div>')
      $tr.find('[disabled]').each(function(ii, el){
        var $el = $(el),
            originalValue = $el.val();
        $el.data('originalValue', originalValue);
        $el.removeAttr('disabled');
      }).eq(0).focus();
      actionsEditInline( $tr.find('.ls-table-actions-show button') );
      enableFormControls($tr);
    });
  }

  function actionsEditInline($buttons){
    $buttons.on('click', function(evt){
      evt.preventDefault();
      if( $(this).hasClass('ico-close') ){
        $(this).parents('tr').each(function(itr, tr){
          $(tr).find('td:gt(0):not(.ls-table-actions)').find(':input, select, div.datepicker').attr('disabled', true);
          $(tr).find('.datepicker').datepicker("destroy");
          $(tr).find('.datepicker .input-group-btn').remove();
        });
        $(this).parents('tr').find('.btn-group').show();
        $(this).parents('.lsa').remove();
      }else{
      }
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
    var $tableActions = $table.find('td.ls-table-actions');
    $tableActions.each(function(itd, td){
      var $actions = $(td).find('a, button');
      if( $actions[1] || isXsmall ){
        $(td).html((function(){
          var dropdownHtml = '<div class="btn-group ' + ( $tableActions.size() - itd  <= 2 && isXsmall ? 'dropup' : '' ) + ' "> <button type="button" class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown"><span>Ações</span></button><ul class="dropdown-menu pull-right" role="menu">';
          if( $actions.size()  ){
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
            });
          }else{
            dropdownHtml += '<li><a href="/" data-action-modal="view">Visualizar</a></li>';
          }
          dropdownHtml += '</ul></div>'
          return dropdownHtml;
        })());
      }else{
        $actions.addClass('btn btn-xs btn-default');
        // verifica necessidade e insere cor original da acao
        if( $actions.attr('class') ){
          var  textClasses = $.grep( $actions.attr('class').split(' '), function(e, i){  return e.indexOf('text-') != -1 }).join(' ');
        }
        if( textClasses ){
          $actions.wrapInner('<span class="' + textClasses + '" />');
        }
      }
    });
  }

  function confirmDanger($table){
    $('a[data-confirm-text]', $table).on('click', function(evt){
      evt.preventDefault();
      var config = {
        header : {
          title: 'Confirmação',
        },
        body: $(this).data('confirmText'),
        footer: {
          actions: [
            {label: $(this).text(), classes: 'btn-danger', link: $(this).attr('href') }
          ]
        }
      }
      var $modal = locastyle.templates.modal('body', config).modal('show');
      var $modalBody = $modal.find('.modal-body');
      $modal.on('hidden.bs.modal', function (e) {
        $modal.remove();
      });
    });
  }

  function toggleTableGroupActions ($table, checkeds) {
    $table.prev('.ls-table-group-actions, [data-target]')
      .toggleClass('hidden', checkeds < 1 )
      .find('.counterChecks').text( checkeds )
      .next('.counterChecksStr').text( checkeds > 1 ? 'itens selecionados' : 'item selecionado' );
  }

  function mobileTableGroupActions($table){
    if( isXsmall ){
      var $groupActions = $table.prev('.ls-table-group-actions, [data-target]')
      var bts = $groupActions.find('a, button')
      var headerAction = locastyle.templates.button_dropdown_single({
        label: 'Ações',
        addClass: 'pull-right',
        actions: (function(){
          var actions = [];
          $groupActions.find('a, button').each(function(i, action){
            var $action = $(action);
            var hasDivider = /danger/.test( $action.attr('class') ) || $action.find('[class*="danger"]')[0] ? true : false;
            actions.push( {label: $action.html(), link: $action.attr('href'), classes:  (hasDivider ? 'text-danger' : '') , hasDivider: hasDivider } );
          });
          return actions;
        })()
      });
      $groupActions.find('.actions').html( '<p class="pull-left"></p>' + headerAction )
      
    }
  }

  return {
    init: init
  };

}());
