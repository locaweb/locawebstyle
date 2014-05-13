var locastyle = locastyle || {};

locastyle.tables = (function() {
  'use strict';

  var config = {
    selectors: {
      table         : '.ls-table',
      actionsColumn : 'td.ls-table-actions'
    },
    trClasses: {
      success : 'success',
      warn    : 'warning',
      error   : 'danger'
    },
    dropdownLabel: 'Ações',
    actionsExclude: '.dropdown-toggle',
    actionDangerClass: 'danger',
    actions:{
      view: {
        label: 'Visualizar',
        attr: 'data-action-modal="view"'
      },
      edit: {
        label: 'Editar',
        attr: 'data-action-modal="edit"'
      }
    },
    groupActions:{
      one: 'item selecionado',
      other: 'itens selecionados'
    },

    isXsmall : window.innerWidth <= 767

  }

  function init(dom_scope){
    var $tables = $( config.selectors.table, dom_scope);
    $tables.each(function(it, table){
      var $table = $(table);
      applyHeaderBehavior($table);
      enableGroupActions($table);
      toggleHeaderCheckbox($table);
      addViewClickLine($table);
      toggleInputsEdit($table);
      showModal($table);
      confirmDanger($table);
      mobileTableGroupActions($table);
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

  function enableGroupActions($table){
    $table.find('tr').each(function(itr, tr){
      $(tr).find('td:eq(0) input[type="checkbox"], th:eq(0) input[type="checkbox"]').prop('disabled', false);
    });
    $table.prev('.ls-table-group-actions').find('button').prop('disabled', false);
  }

  // Insere dropdown para cada linha da coluna de acoes se for necessário
  function lineActions($table){
    var $tableActions = $table.find( config.selectors.actionsColumn);
    var tableLines = $table.find('tbody tr').size();
    $tableActions.each(function(itd, td){
      var $actions = $(td).find('a, button').not(config.actionsExclude);
      var line = $(td).parent('tr').index() ;
      if ( $actions[1] || config.isXsmall ){
        var dropdown = locastyle.templates.button_dropdown_single({
          label     : config.isXsmall ? "" : config.dropdownLabel,
          labelClass: 'btn-xs',
          addClass  : 'pull-right' + ( tableLines - line < 3 ? ' dropup' : '' ),
          actions   : (function(){
            var actions = [];
            if ( !$(td).find('[' + config.actions.view.attr + ']')[0] && config.isXsmall && $(td).parent('tr').find('.hidden-xs')[0]  ){
              actions.push({label: config.actions.view.label, link: '#', extras: config.actions.view.attr })
            }
            $actions.each(function(i, action){
              var extraData = '';
              $.each($(action).data(), function(name, value){
                extraData += 'data-' + name.replace(/[A-Z]/g, '-$&').toLowerCase() + '="' + value + '" ';
              });
              var $action = $(action);
              var hasDivider = /danger/.test( $action.attr('class') ) || $action.find('[class*="' + config.actionDangerClass  + '"]')[0] ? true : false;
              actions.push( {label: $action.html(), link: $action.attr('href'), classes: (hasDivider ? 'text-danger' : ''), extras: extraData, hasDivider: ( hasDivider ? true : false ) } );
            });
            return actions;
          })()
        });
        $(td).html(dropdown);
      } else {
        $actions.addClass('btn btn-xs btn-default');
        // verifica necessidade e insere cor original da acao
        if ( $actions.attr('class') ){
          var  textClasses = $.grep( $actions.attr('class').split(' '), function(e, i){  return e.indexOf('text-') != -1 }).join(' ');
        }
        if ( textClasses ){
          $actions.wrapInner('<span class="' + textClasses + '" />');
        }
      }
    });
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

  function toggleTableGroupActions ($table, checkeds) {
    $table.prev('.ls-table-group-actions, [data-target]')
      .toggle( checkeds >= 1 )
      .find('.counterChecks').text( checkeds )
      .next('.counterChecksStr').text( checkeds > 1 ? config.groupActions.other : config.groupActions.one );
  }

  function addViewClickLine($table){
    if ( config.isXsmall ){
      $table.find('tbody tr').each(function(itr, tr){
        if ( $(tr).find('.hidden-xs')[0] ){
          $(tr).find('td').not(  config.selectors.actionsColumn).attr('data-action-modal', 'view');
        }
      });
    }
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
    });
  }

  function actionsEditInline($buttons){
    $buttons.on('click', function(evt){
      evt.preventDefault();
      if ( $(this).hasClass('ico-close') ){
        $(this).parents('tr').find('.btn-group').show();
        $(this).parents('.lsa').remove();
      }
    });
  }

  function showModal($table){
    $('[data-action-modal]', $table).on('click', function(evt) {
      var config = locastyle.tables.config;
      if ($(this).index() === 0 && this.nodeName === 'TD' ){
        return;
      }
      evt.preventDefault();
      var modalActionType = $(this).data('action-modal');
      var headerTitle = this.nodeName == 'TD' ? 'Visualizar' : $(this).text();
      var actionModal = $(this).data('actionModal');
      var headerAction;
      var hasEdit = $(this).parents('td').find('[data-action-modal="edit"]')[0] && $(this).parents('tr').find(':input, select');
      if ( hasEdit && config.isXsmall ){
        headerAction = locastyle.templates.button_dropdown_single({
          label: config.dropdownLabel,
          addClass: 'pull-right',
          actions: [
            {label: config.actions.view.label, link: '#view', classes: 'ls-modal-action'},
            {label: config.actions.edit.label, link: '#edit', classes: 'ls-modal-action'}
          ]
        });
      }
      var formData = {}
      formData.fields = formModalFields($table, $(this).parents('tr'));
      formData.action = $(this).attr('href');
      var config = {
        header : {
          title: headerTitle,
          close: false,
          action: headerAction
        },
        body: locastyle.templates.form( formData ),
        footer: {
          actions: [
            (function(){
              if ( modalActionType === 'edit' ){
                return {label: 'Salvar', classes: 'btn-primary table-modal-save'}
              } else {
                return {}
              }
            })()
          ]
        }
      }
      var $modal = locastyle.templates.modal('body', config).modal('show');
      var editable = modalActionType == 'edit' ? true : false;
      locastyle.forms.formEditable($modal.find('form'), editable)
      locastyle.forms.formAsText($modal.find('form'), !editable)
      var $modalBody = $modal.find('.modal-body');
      $modal
        .on('hidden.bs.modal', function (e) {
          $modal.remove();
        })
        .on('shown.bs.modal', function (e) {
          $modalBody.find(':input').eq(0).focus();
        })
      modalDropdownActions($modal);
      saveModalEdit($modal, $(this).parents('tr'));
    });
  }

  function saveModalEdit($modal, $tr){
    $modal.find('form').on('submit', function(e){
      e.preventDefault();
      $modal.find('.table-modal-save').trigger('click');
    });
    $modal.find('.table-modal-save').on('click', function(e){
      e.preventDefault();
      var $addInputs = $tr.parents('form').find('input').filter(function () {
        return $(this).parents('table').length === 0;
      });
      var dataForm = $modal.find('form').serialize()  + '&' + $addInputs.serialize();
      $.ajax({
        data        : dataForm,
        type        : 'POST',
        url         : $modal.find('form').attr('action'),
        beforeSend  : blockModal($modal, true),
        complete    : blockModal($modal, false),
        error       : function(jqXHR, textStatus, errorThrown){
          showMessage($modal, $tr, config.trClasses.error);
        },
        success     : function(data){
          updateTable($modal, $tr, data);
          $tr.trigger("change");
        }
      });
    });
  }

  function showMessage($modal, $tr, type){
    $tr.addClass(type);
    setTimeout(function(){
      $tr.removeClass(type);
    }, 1500);
    $modal.modal('hide');
  }

  function blockModal($modal, block){
    $modal.find('.modal-footer').find('button').prop('disabled', block);
  }

  function updateTable($modal, $tr, data){
    showMessage($modal, $tr, config.trClasses.success);
    $modal.find('form').find(':input').each(function(indM, inputModal){
      $tr.find(':input').each(function(indT, inputTr){
        if ( $(inputTr).attr('name') == $(inputModal).attr('name') ){
          $(inputTr).val( $(inputModal).val() );
        }
      });
    });
  }

  // busca os campos da linha, label sendo o th da coluna, descarta as colunas checkAll e Acoes
  function formModalFields($table, $tr){
    var fields = {},
        labels = [];
    fields = [];
    $table.find('thead th').each(function(itr, th){
      labels.push( $.trim($(th).text()) );
    });
    var $trClone = $tr.clone();
    $trClone.find('td').each(function(itd, td){
      fields.push({ label: labels[itd], input: $(td).html() });
    });
    fields = fields.slice(1, fields.length -1 );
    return fields;
  }

  function modalDropdownActions($modal){
    $('.ls-modal-action', $modal).off().on('click', function(evt){
      evt.preventDefault();
      $modal.find('.modal-title-text').text( $(this).text() );
      var $modalBody = $modal.find('.modal-body');
      var $modalFooter = $modal.find('.modal-footer');
      var isEdit = $(this).attr('href') === '#edit';
      locastyle.forms.formEditable($modal.find('form'), isEdit)
      locastyle.forms.formAsText($modal.find('form'), !isEdit)
      if ( isEdit ){
        $modalFooter.find('.btn.btn-primary').show();
      } else {
        $modalFooter.find('.btn.btn-primary').hide();
      }
    });

  }

  function confirmDanger($table){
    $('[data-confirm-text]', $table).on('click', function(evt){
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
      var $tr = $(this).parents('tr');
      excludeLine($modal, $table, $tr);
    });
  }

  function  excludeLine($modal, $table, $tr) {
    $modal.find('.modal-footer .btn-danger').on('click', function(evt){
      evt.preventDefault();
      var $addInputs = $table.parents('form').find('input').filter(function () {
        return $(this).parents('table').length === 0;
      });
      var dataForm = $modal.find('form').serialize()  + '&' + $addInputs.serialize();
      var url = $(this).attr('href');
      $.ajax({
        data        : dataForm,
        type        : 'POST',
        url         : url,
        beforeSend  : blockModal($modal, true),
        complete    : blockModal($modal, false),
        error       : function(jqXHR, textStatus, errorThrown){
          showMessage($modal, $tr, 'danger');
        },
        success     : function(data){
          removeLine($modal, $tr);
        }
      });
    });
  }

  function removeLine ($modal, $tr) {
    $modal.modal('hide');
    $tr.addClass( config.trClasses.warn);
    $tr.find('td:eq(0) :checkbox').prop('checked', false).trigger('change');
    setTimeout(function(){
      $tr.slideUp('fast', function(){
        $tr.remove();
      });
    }, 1000);
  }

  function mobileTableGroupActions($table){
    if ( config.isXsmall ){
      var $groupActions = $table.prev('.ls-table-group-actions, [data-target]')
      var bts = $groupActions.find('a, button')
      var headerAction = locastyle.templates.button_dropdown_single({
        label: 'Ações',
        addClass: 'pull-right',
        actions: (function(){
          var actions = [];
          $groupActions.find('a, button:not(.dropdown-toggle)').each(function(i, action){
            var $action = $(action);
            var hasDivider = /danger/.test( $action.attr('class') ) || $action.find('[class*="danger"]')[0] ? true : false;
            actions.push( {label: $action.html(), link: $action.attr('href'), classes:  (hasDivider ? 'text-danger' : ''), hasDivider: hasDivider } );
          });
          return actions;
        })()
      });
      $groupActions.find('.actions').html( '<p class="pull-left"></p>' + headerAction )

    }
  }

  return {
    init: init,
    config: config
  };

}());
