
var resizeBoxes = function(){
  var contentHeight = $('.main').outerHeight();
  var sidebarHeight = $('aside.boxes').height();

  if (contentHeight > sidebarHeight) {
    $('aside.boxes').css("min-height", contentHeight);
  } else {
    $('aside.boxes').css("height", "auto");
  }

  if (sidebarHeight > contentHeight) {
    $('.main').css("min-height", sidebarHeight - 20);
  } else {
    $('.main').css("height", "auto");
  }
};

$('.main').on('shown', function(){resizeBoxes()});

$(".clippy").live({
  clippycopy: function(e, data) {
    data.text = $(this).children(".clippy_code").text();
  },
  clippyover: function() {
    $(this).children(".clippy_label").text("copiar");
  },
  clippyout: function() {
    $(this).children(".clippy_label").text("");
  },
  clippycopied: function() {
    $(this).children(".clippy_label").text("texto copiado");
  }
});
