var locastyle = locastyle || {};

locastyle.trackEvents = (function() {
  'use strict';

  function init(){
    if(window.ga){
      this.gaPresent = true;
      setCategory(this);
      findTriggers();
    } else {
      this.gaPresent = false;
    }
  }

  function setCategory(module){
    module.eventCategory = $("body").attr("data-ls-te-category") || window.location.pathname;
  }

  function findTriggers(){
    findLinks();
  }

  function findLinks(){
    var links = $("a");
    $(links).each(function (index, item) {
      var options = {}
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'open_link_#' + $(item).attr("href");
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      bindClickEvents(item, options);
    });
  }

  function bindClickEvents(element, options){
    $(element).off("click.ls");
    $(element).on("click.ls", function () {
      ga('send', 'event', locastyle.trackEvents.eventCategory, options.action, options.label);
    });
  }

  return {
    init: init
  };

}());
