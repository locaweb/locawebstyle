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

  var selectedScheme = 'colorBlue';
  $('#colorTheme').change(function(){
    $('div.row').removeClass(selectedScheme).addClass($(this).val());
    selectedScheme = $(this).val();
  });

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

