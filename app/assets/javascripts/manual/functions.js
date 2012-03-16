$(document).ready(function(){
  SyntaxHighlighter.all()
  $('.model').hide();
  $('.model:first').show();

  $('.guideAreas li').removeClass('selected');
  $('.guideAreas li:first').addClass('selected');

  $('.guideAreas li a').live("click", function(){
    var idTab = $(this).attr('href');
    if (!$('.model' + idTab).is(":visible")) {
      $('.model').hide();
      $('.model' + idTab).show();
      $('.guideAreas li').removeClass('selected');
      $(this).parent().addClass('selected');
    }
    return false;
  });

  $('.guideLoca *').removeClass('first-child')
  $('.guideLoca *').removeClass('last-child')
});
