var lsdocs = (function() {
  'use strict';

  function init() {
    convertCodeExamples();
    copyMarkup();
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


  function convertCodeExamples(){
    $('code.language-html').each(function (i,e) {
      var html = $(this).html();
      $(this).text(html);
      $(this).removeClass('language-html').addClass('language-markup');
    });
    Prism.highlightAll();
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsdocs.init();
});
