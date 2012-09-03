// Identificando os browsers...
if ($.browser.msie) {
  if(parseInt($.browser.version) == 9){
       // Para IE9
       $("html").addClass("ie9");
  } else if (parseInt($.browser.version) == 8){
       // Para IE8
       $("html").addClass("ie8");
  } else if(parseInt($.browser.version) == 7){
       // Para IE7
       $("html").addClass("ie7");
  } else if(parseInt($.browser.version) == 6){
       // Para IE6
       $("html").addClass("ie6");
  }
} else if ($.browser.mozilla) {
  $("html").addClass("gecko");
} else if ($.browser.webkit) {
  $("html").addClass("webkit");
}
