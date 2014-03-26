var lsdocs = (function() {
  'use strict';

  function init() {
    convertCodeExamples()
  }

  function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
    });
}

  function convertCodeExamples(){
    $('code.language-html').each(function (i,e) {
      var html = $(this).html();
      // $(this).text(htmlencode(html));
      $(this).text(html);
      $(this).removeClass('language-html').addClass('language-markup')
    });
    Prism.highlightAll()
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsdocs.init();
});
