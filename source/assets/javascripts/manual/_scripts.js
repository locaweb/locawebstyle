$(document).ready(function(){
  prettyPrint();
  $('pre.prettyprintCode').each(function() {
    var code = $(this).html();
    $(this).text(code).addClass('prettyprint')
    prettyPrint();
  });

});