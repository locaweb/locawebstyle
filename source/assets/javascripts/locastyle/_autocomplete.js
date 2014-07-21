var locastyle = locastyle || {};
locastyle.autocomplete = (function() {
  'use strict';

  var dataModule = {
    datalistTag: 'ls-remote-list', 
    uniqueId: 0
  }

  function init() {
    $('[data-ls-module="autocomplete"]').each(function () {
      var $this = $(this);
      remoteList($this);
      if (!'options' in document.createElement('datalist')) {
        polyfill($this);
      }
    });
  }

  function polyfill ($elem) {
    var $list = $('#' + $elem.attr('list'));
    if( $list[0] ){
      $elem.after('<select class="ls-polyfill-datalist">' + $list.html() + '</select>');
      var $select = $elem.next('select');
      $select.css($elem.position()).css({width: $elem.outerWidth()});
      $elem.on('keyup change', function (evt){
        var typed = $(this).val();
        $select.find('option').prop('disabled', true);
        var $options = $select.find('option:contains(' + typed + ')').prop('disabled', false);
        $options[0] && typed ? $select.show() : $select.hide();
      });
      $select.on('change', function (argument) {
        $elem.val($select.val());
        $select.hide();
      });
    }    
  }

  function remoteList ($elem) {
    var url = $elem.data('ls-remote-list');
    if(url){
      $.getJSON(url, function(data, textStatus) {
        $elem.after('<datalist id="datalist-' + dataModule.uniqueId + '">' + data.itens.map( function (item) {
          return '<option>{$item}</option>'.replace('{$item}', item);
        } ).join('') + '</datalist>');
        $elem[0].hasAttribute('list') || $elem.attr('list', 'datalist-' + dataModule.uniqueId++ );
        polyfill($elem)
      });
    }
  }

  return {
    init: init
  };

}());
