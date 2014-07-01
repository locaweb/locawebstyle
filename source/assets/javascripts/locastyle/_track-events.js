var locastyle = locastyle || {};

locastyle.trackEvents = (function() {
  'use strict';

  function init(){
    if(window.ga){
      this.gaPresent = true;
      findTriggers();
    } else {
      this.gaPresent = false;
    }
  }

  function findTriggers(){
    findLinks();
  }

  function findLinks(){
    var links = $("a");
    $(links).each(function (index, item) {
      var options = {}
      options.category = $("body").data("ls-te-category");
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'open_link_#' + $(item).attr("href");
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      bindClickEvents(item, options);
    });
  }

  function bindClickEvents(element, options){
    $(element).off("click.ls");
    $(element).on("click.ls", function () {
      ga('send', 'event', options.category, options.action, options.label);
    });
  }

  return {
    init: init
  };

}());
