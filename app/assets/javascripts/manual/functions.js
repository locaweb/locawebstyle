
var resizeBoxes = function(){
  var contentHeight = $('.main').outerHeight();
  var sidebarHeight = $('aside').height();

  if (contentHeight > sidebarHeight) {
    $('aside').css("min-height", contentHeight);
  } else {
    $('aside').css("height", "auto");
  }

  if (sidebarHeight > contentHeight) {
    $('.main').css("min-height", sidebarHeight - 20);
  } else {
    $('.main').css("height", "auto");
  }
  // var mainDivHeight;
  // mainDivHeight = $(".main").height();
  // $("aside.boxes").css("height", mainDivHeight+60);
};

$('.main').on('shown', function(){resizeBoxes()});

$(document).ready(function(){
  SyntaxHighlighter.all()
  resizeBoxes()
});