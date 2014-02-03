var locastyle = (function() {
  'use strict';

  function init(dom_scope){
    bgShortcutWorkaround();
    breakpointWindowWidth();
    toggleTextOnClick(dom_scope);
    toggleTextOnHover(dom_scope);
    linkPreventDefault(dom_scope);
    classToggle(dom_scope);
    select2DefaultConfig(dom_scope, '');
    btnGroupActivationToogle(dom_scope);
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

  function linkPreventDefault(dom_scope) {
    $("a", dom_scope).on("click", function(e){
      if($(this).attr("href") === "" || $(this).attr("href") === "#"){
        e.preventDefault();
      }
    })
  }

  // Troca de texto
  function toggleTextOnClick(dom_scope) {
    $('[data-event="click"]', dom_scope).on("click", function(e) {
      e.preventDefault();
      toggleText(this);
    });
  }

  function toggleTextOnHover(dom_scope) {
    $('[data-event="hover"]', dom_scope).on("mouseover", function(e) {
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
  function classToggle(dom_scope) {
    $('[data-classtoggle]', dom_scope).on('click', function(e){
      e.preventDefault();
      var classes = $(this).data('classtoggle').split(',');
      $(this).toggleClass(classes[0]).toggleClass(classes[1]);
    });
  }

  //Minimiza o resultado para a busca
  function select2DefaultConfig(dom_scope, exclude){
    $('.ls-select', dom_scope).not(exclude).each(function(i, el){
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

  function btnGroupActivationToogle(dom_scope) {
    $(".btn-group.activation-toggle .btn", dom_scope).on("click", function() {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });
  }

  return {
    init: init,
    select2DefaultConfig: select2DefaultConfig
  };

}());
