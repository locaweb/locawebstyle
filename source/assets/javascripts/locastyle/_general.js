var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  function init() {

    // $(config.selector).each(function(i, collapse){
    //   console.log(collapse);
    // });

    showHide.addEventListener('click', showSidebar);
  }

  var showHide = document.querySelector('.ls-ico-menu'),
  body = document.querySelector('body');

  function showSidebar() {
    if (body.className.match(/ls-show-sidebar/g)) {
      body.classList.remove('ls-show-sidebar');
    } else {
      body.classList.add('ls-show-sidebar');
    }
  }

  return {
    init:init
  };

}());
