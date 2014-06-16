var lsdocs = (function() {
  'use strict';

  function init() {
    convertCodeExamples();
    sidebarAffix();
    // copyMarkup();
    // markupExamples();
    Prism.highlightAll();
  }

  function copyMarkup(){

    ZeroClipboard.config( { moviePath: '/assets/flash/ZeroClipboard.swf' } );

    var client = new ZeroClipboard($(".copy-button")[0]);


    client.on( "ready", function( readyEvent ) {
    console.log( "ZeroClipboard SWF is ready!" );

  client.on( "aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"] );
  } );
} );
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
      Prism.highlightAll();
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
      // doc-example-menu-code
      // doc-example-menu-demo

    });
  }

  function convertCodeExamples(){
    $('code.language-html').each(function (i,e) {
      var html = $(this).html();
      $(this).text(html);
      $(this).removeClass('language-html').addClass('language-markup');
    });
    Prism.highlightAll();
  }

  function sidebarAffix(){
    if($('html').hasClass('ls-screen-lg') || $('html').hasClass('ls-screen-md')){
      var docSidebarWidth = $('.doc-sidebar-menu').width();
      $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop >= '435'){
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
});
