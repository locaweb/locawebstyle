// Identificando os browsers...
if ($.browser.msie) {
  if(parseInt($.browser.version) == 9){
   $("html").addClass("ie9"); // Para IE9
  } else if (parseInt($.browser.version) == 8){
   $("html").addClass("ie8"); // Para IE8
  } else if(parseInt($.browser.version) == 7){
   $("html").addClass("ie7"); // Para IE7
  } else if(parseInt($.browser.version) == 6){
   $("html").addClass("ie6"); // Para IE6
  }
} else if ($.browser.mozilla) {
  $("html").addClass("gecko");
} else if ($.browser.webkit) {
  $("html").addClass("webkit");
}
