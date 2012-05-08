//= require manual/functions

$(document).keypress(function(e) {
  if(e.keyCode == 13) {
    $('.gridShow').remove();
    $('body').append('<div class="gridShow"></div>')
  }
});