$(document).ready(function() {

  // Amostra do Masked Input em funcionamento
  $("#data").mask("99/99/9999");
  $("#data2").mask("99/99/9999",{completed:function(){alert("Você digitou a data: "+this.val());}});

  // Input de Telefone com 8 ou 9 digitos
  $('#telefone').mask("(99) 9999-9999?9").ready(function(event) {
      var target, phone, element;
      target = (event.currentTarget) ? event.currentTarget : event.srcElement;
      if (target) {
        phone = target.value.replace(/\D/g, '');
      }
      element = $(target);
      element.unmask();
      if(phone && phone.length > 10) {
          element.mask("(99) 99999-999?9");
      } else {
          element.mask("(99) 9999-9999?9");
      }
  });

  $("#cpf").mask("999.999.999-99");
  $("#cpf2").mask("999.999.999-99",{placeholder:" "});
});

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

window.themeSelector = window.themeSelector || {};

window.themeSelector = {
  init: function () {
    themeSelector.loadTheme();
    themeSelector.themeChangeBind();
  },

  loadTheme: function (selected_by_user) {
    var theme = themeSelector.setTheme(selected_by_user)
    regexp = new RegExp("color[A-Z][^ ]*");
    oldThemeClass = $("html").attr("class").match(regexp);
    if (oldThemeClass) {
      $("html").removeClass(oldThemeClass[0]);
    }
    $("html").addClass(theme);
    $("#theme_selector").val(theme);
  },

  setTheme: function (selected_by_user) {
    var theme;
    if (selected_by_user) {
      theme = selected_by_user;
      themeSelector.cookieManager.createCookie("_locastyle_sample_theme", selected_by_user, 1);
    } else {
      theme = themeSelector.cookieManager.checkCookie();
    }
    return theme;
  },

  themeChangeBind: function () {
    $("#theme_selector").on("change", function () {
      themeSelector.loadTheme($(this).val());
    });
  }
}

$(document).ready(function () {
  themeSelector.init();
});
window.themeSelector = window.themeSelector || {};

window.themeSelector.cookieManager = {
  init: function () {
    themeSelector.cookieManager.checkCookie();
  },

  checkCookie: function () {
    var cookie = themeSelector.cookieManager.readCookie();
    if (cookie && cookie !== -1) {
      var value = cookie.split("=")[1]
      return value;
    }
  },

  createCookie: function (name, value, days) {
    if (days) {
      var today = new Date();
      var date = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  readCookie: function () {
    var desiredCookieRegExp = new RegExp("_locastyle_sample_theme=[^ ]*");
    var cookies = document.cookie.split(';');
    for (var i=0; i<cookies.length; i++) {
      var cookie = cookies[i].match(desiredCookieRegExp);
      if (cookie) {
        return cookie[0];
      }
    }
    return -1;
  }
}

$(document).ready(function () {
  themeSelector.cookieManager.init();
});



