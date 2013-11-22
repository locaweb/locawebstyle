var locastyle = locastyle || {};

locastyle.trackEvents = (function() {
  'use strict';

  function init(){
    findLinks();
    findButtons();
    findForms();
  }

  function findLinks(){
    var links = $("a");
    $(links).each(function (index, item) {
      var options = {}
      options.category = $("body").data("controller") + "#" + $("body").data("action");
      options.action = 'open_link_#' + $(item).attr("href");
      if($(item).attr("href") === "#") {
        options.action = 'on_page_link';
        options.reload = true;
      }
      if($(item).data("toggle") === "modal"){
        var modal = $(item).data("target") ? $(item).data("target") : $(item).attr("href");
        options.action = 'open_modal_' + modal;
      }
      if($(item).data("toggle") === "collapse"){
        options.type = "collapse";
        options.action = 'open_collapse';
      }
      if($(this).parents(".nav-tabs").length > 0){
        options.action = 'tab_navigation';
      }
      options.label = $(item).attr("title") ? $(item).attr("title") : $(item).text();
      bindSendEvent(item, options);
    });
  }

  function findButtons(){
    var buttons = $("button");
    $(buttons).each(function (index, item) {
      var options = {}
      options.category = $("body").data("controller") + "#" + $("body").data("action");
      options.action = 'open_button';
      if($(item).attr("href") === "#") {
        options.action = 'on_page_button';
      }
      if($(item).data("dismiss") === "modal"){
        var modal = $($(item).parents(".modal")).attr("id");
        options.action = 'close_modal_' + modal;
      }
      if($(item).data("toggle") === "dropdown"){
        var modal = $($(item).parents(".modal")).attr("id");
        options.action = 'dropdown_toggle';
      }
      options.label = $(item).attr("title") ? $(item).attr("title") : $(item).text();
      bindSendEvent(item, options);
    });
  }

  function findForms() {
    var forms = $("form");
    $(forms).each(function (index, item) {
      var options = {}
      options.category = $("body").data("controller") + "#" + $("body").data("action");
      options.action = "submit_form_#" + ($(item).data("action") || $(item).attr("id") || $(item).attr("action"));
      options.label = $(item).find(":submit[type=submit]").val();
      bindFormEvent(item, options);
    });
  }

  function bindSendEvent(element, options){
    $(element).on("click", function () {
      if(options.reload){
        options.label = $(element).text();
      }
      if(options.type === "collapse"){
        var targetCollapse = $(element).attr("href");
        if($(targetCollapse).hasClass("in")){
          options.action = 'close_collapse_' + targetCollapse;
        } else {
          options.action = 'open_collapse_' + targetCollapse;
        }
      }
      ga('send', 'event', options.category, options.action, options.label);
    });
  }

  function bindFormEvent(element, options) {
    $(element).on("submit", function () {
      ga('send', 'event', options.category, options.action, options.label);
    })
  }

  return {
    init: init,
  };

}());
