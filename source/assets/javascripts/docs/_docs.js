var lsdocs = (function() {
  'use strict';

  function init() {
    convertCodeExamples();
    sidebarAffix();
    toggleMenuActive();
    toggleThemes();
  }

  function toggleThemes (argument) {
    $('.doc-test-themes').find('a').on('click', function () {
      var classeAdd = $(this).data('toggle-class');
      $('html')
        .attr('class', $('html').attr('class').split(' ').map(function(classe){
          return /ls-theme/.test(classe) ? '': classe
        }).join(' ').replace(/  /g, '') )
        .addClass(classeAdd);
    });
  }

  function toggleMenuActive() {
    $('.doc-menu').on('click', function() {
      $(this).toggleClass('active')
    })
  }

  function markupExamples () {
    $('.doc-example-markup').each(function (i, example) {
      var $example = $(example);

      // $(this).text(html);
      // $(this).removeClass('language-html').addClass('language-markup');

      $example
        .append('<menu class="doc-example-menu"> <button class="doc-example-menu-demo doc-example-menu-active"> <i class="ls-ico-cog"></i> </button> <button class="doc-example-menu-code"> <i class="ls-ico-chevron-left"></i> <i class="ls-ico-chevron-right"></i> </button> </menu>')
        .append('<div class="doc-example-markup-area"><code class="language-markup"></code></div>');
      var html = $example.html();
      $example.find('.doc-example-markup-area code').text(html);
      menuExamples($example);
    });
  }

  function menuExamples ($example) {
    $example.find('.doc-example-menu button').on('click', function (evt) {
      evt.preventDefault();
      $example.find('.doc-example-menu-active').removeClass('doc-example-menu-active');
      $(this).addClass('doc-example-menu-active');
      if( $(this).hasClass('doc-example-menu-code')  ){
        $example.find('.doc-example-markup-area').show()
      }else{
        $example.find('.doc-example-markup-area').hide()
      }
    });
  }

  function convertCodeExamples(){
    $('code.language-html').each(function (i,e) {
      var html = $(this).html();
      $(this).text(html);
      $(this).removeClass('language-html').addClass('language-markup');
    });
  }

  function sidebarAffix(){
    if($('html').hasClass('ls-screen-lg') || $('html').hasClass('ls-screen-md')){
      var docSidebarWidth = $('.doc-sidebar-menu').width();
      $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop + $(window).height() + 40 == $(document).height() + 40) {
          $('.doc-sidebar-menu').css('margin-top', '-30px')
        }

        if(scrollTop >= '391'){
          $('.doc-sidebar-menu').addClass('doc-affix').css('width', docSidebarWidth)
        }else{
          $('.doc-sidebar-menu').removeClass('doc-affix').removeAttr('style');
        }
      });
    }
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsdocs.init();
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    $('html').addClass('ls-show-barbecue');
    $('.doc-highlight').prepend('<video autoplay loop id="bgvid"><source src="http://tableless.com.br/coisas/porkbbq3.mp4" type="video/mp4"></video>');
  });
});
