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
    });
  }

  function remoteList ($elem) {
    var url = $elem.data('ls-remote-list');
    if(url){
      $.getJSON(url, function(data, textStatus) {
        $elem.after('<datalist id="datalist-' + dataModule.uniqueId + '">' + data.itens.map( function (item) {
          return '<option>{$item}</option>'.replace('{$item}', item);
        } ).join('') + '</datalist>');
        $elem[0].hasAttribute('list') || $elem.attr('list', 'datalist-' + dataModule.uniqueId++ );
      });
    }
  }

  //http://playground.onereason.eu/2013/04/ie10s-lousy-support-for-datalists/

  return {
    init: init
  };

}());