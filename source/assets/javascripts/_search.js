var locastyle = locastyle || {};

locastyle.search = (function() {
  'use strict';

  function init(){
    search()
  }

  function search(){

    $('#search').keyup(function(){
      var searchField = $('#search').val();
      var myExp = new RegExp(searchField, "i");
      var output = '<ul class="ls-search">';
      $.getJSON('/documentacao/data.json', function(data) {
        $.each(data, function(key, val){
          if ((val.name.search(myExp) != -1) || (val.location.search(myExp) != -1)) {
            output += '<li class="ls-no-list-style"><a class="ls-display-block" href="'+ val.location +'">' + val.name + '</a></li>';
          }
        });
        $('#results').html(output);
      });
    });

  }

  return {
    init: init
  }

}());
