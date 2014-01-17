var locastyle = (function() {
  'use strict';

  function init(){
    bgShortcutWorkaround();
    breakpointWindowWidth();
    toggleTextOnClick();
    toggleTextOnHover();
    linkPreventDefault();
    classToggle();
    select2DefaultConfig();
    btnGroupActivationToogle();
    subMenu();
  }

  // Aquele background cinza que fica sempre atrás do elemento Shortcut
  // Não nos orgulhamos disso. Mas não havia maneira melhor de fazer. ;-)
  function bgShortcutWorkaround() {
    if ($(".shortcut-box").length > 0) {
      $('.main').prepend('<span class="bg-shortcut-workaround"></span>');
      $('.bg-shortcut-workaround').css('height', $('.shortcut-box').outerHeight());
    }

    $( window ).resize(function() {
      $('.bg-shortcut-workaround').css('height', $('.shortcut-box').outerHeight());
    });
  }

  // Verifica qual breakpoint a janela está e insere uma classe no elemento HTML
  function breakpointWindowWidth() {
    var mediaMobile = 480;
    var mediaTablet = 768;
    var mediaDesk = 992;
    var mediaDeskLg = 1200;

    // Se for mobile
    if ($(document).width() <= mediaTablet) {
      $('html').addClass('media-mobile').removeClass('media-tablet media-desk media-desk-lg');
      locastyle.breakpoint = "media-mobile";
    } else {
      $('html').removeClass('media-mobile');
    }

    // Se for Tablet
    if ($(document).width() <= mediaDesk && $(document).width() >= mediaTablet) {
      $('html').addClass('media-tablet').removeClass('media-mobile media-desk media-desk-lg');
      locastyle.breakpoint = "media-tablet";
    } else {
      $('html').removeClass('media-tablet');
    }

    // Se for Desk
    if ($(document).width() <= mediaDeskLg && $(document).width() >= mediaDesk) {
      $('html').addClass('media-desk').removeClass('media-mobile media-tablet media-desk-lg');
      locastyle.breakpoint = "media-desk";
    } else {
      $('html').removeClass('media-desk');
    }

    // Se for Desk Large
    if ($(document).width() >= mediaDeskLg) {
      $('html').addClass('media-desk-lg').removeClass('media-mobile media-tablet media-desk');
      locastyle.breakpoint = "media-desk-lg";
    } else {
      $('html').removeClass('media-desk-lg');
    }
  }

  function linkPreventDefault() {
    $("a").on("click", function(e){
      if($(this).attr("href") === "" || $(this).attr("href") === "#"){
        e.preventDefault();
      }
    })
  }

  // Troca de texto
  function toggleTextOnClick() {
    $('[data-event="click"]').on("click", function(e) {
      e.preventDefault();
      toggleText(this);
    });
  }

  function toggleTextOnHover() {
    $('[data-event="hover"]').on("mouseover", function(e) {
      e.preventDefault();
      toggleText(this);
    });
  }

  function toggleText(element) {
    var $text, $replacementText;
    $text = $(element).html();
    $replacementText = $(element).data("text");
    $(element).text($replacementText).data("text", $text).attr("title", $replacementText);
  }

  // Troca de classes
  function classToggle() {
    $('[data-classtoggle]').on('click', function(e){
      e.preventDefault();
      var classes = $(this).data('classtoggle').split(',');
      $(this).toggleClass(classes[0]).toggleClass(classes[1]);
    });
  }

  //Minimiza o resultado para a busca
  function select2DefaultConfig(exclude){
    $('.select2').not(exclude).each(function(i, el){
      var $select = $(el);
      var $optionList = $select.find('option');
      var visible;
      if( $select.data('search') == false  ){
        visible = -1;
      } else {
        visible = ( $optionList.size() <= 10 ? -1 : 7 );
      }
      if( $select.attr('placeholder') && !$select.attr('multiple') ){
        if( $select.find('[selected]').size() === 0 ){
          $select.prepend('<option selected></option>');
        }else{
          $select.prepend('<option></option>');
        }
      }
      $select.select2({
        allowClear: true,
        minimumResultsForSearch: visible
      });
    });
  }

  function btnGroupActivationToogle() {
    $(".btn-group.activation-toggle .btn").on("click", function() {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });
  }

  var subMenu = function(){
    $("[data-toggle='submenu']").on('click', function(e){
      e.preventDefault();
      $('.submenu').addClass('hidden');
      $(this).next('.submenu').removeClass('hidden');
      $(this).toggleClass("active");
    })
  }

  return {
    init: init
  };

}());
