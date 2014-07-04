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
    findButtons();
    findForms();
  }

  function findLinks(){
    var links = $("a");
    $(links).each(function (index, item) {
      var options = {}
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'open_link_#' + $(item).attr("href");
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      if($(item).attr("href").indexOf("#") === 0) {
        options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'on_page_link_' + $(item).attr("href");
      }
      bindClickEvents(item, options);
    });
  }

  function findButtons(){
    var buttons = $("button");
    $(buttons).each(function (index, item) {
      var options = {}
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'on_page_button_#';
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      bindClickEvents(item, options);
    });
  }

  function findForms(){
    var forms = $("form");
    $(forms).each(function (index, item) {
      var options = {}
      options.action = "submit_form_#" + ($(item).data("action") || $(item).attr("id") || $(item).attr("action"));
      options.label = $(item).find(":submit[type=submit]").val();
      bindFormEvents(item, options);
    });
  }

  function bindClickEvents(element, options){
    $(element).off("click.ls");
    $(element).on("click.ls", function () {
      ga('send', 'event', locastyle.trackEvents.eventCategory, options.action, options.label);
    });
  }

  function bindFormEvents(element, options) {
    $(element).on("submit", function () {
      ga('send', 'event', locastyle.trackEvents.eventCategory, options.action, options.label);
    })
  }

  return {
    init: init
  };

}());
