$(document).ready(function(){
  SyntaxHighlighter.all()
  $('.guideAreas a[href="' + window.location.pathname + '"]').parent().addClass('selected');
});
