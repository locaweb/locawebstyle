var locastyle = locastyle || {};

locastyle.trackEvents = (function() {
  'use strict';

  function init(){
    if(window.ga){
      locastyle.trackEvents.gaPresent = true;
      setCategory(locastyle.trackEvents);
      findTriggers();
    } else {
      locastyle.trackEvents.gaPresent = false;
    }
  }

  function setCategory(module){
    module.eventCategory = $("body").attr("data-ls-te-category") || window.location.pathname;
  }

  function findTriggers(){
    findLinks();
    findButtons();
    findForms();
    findSelects();
    bindGuidedTour();
  }

  function findLinks(){
    var links = $("a");
    $(links).each(function (index, item) {
      var options = {};
      options.category = $(item).data("ls-te-category") ? $(item).data("ls-te-category") : null;
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'open_link_#' + $(item).attr("href");
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      if($(item).attr("href")) {
        if($(item).attr("href").indexOf("#") === 0) {
          options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'on_page_link_' + $(item).attr("href");
        }
      }
      if($(item).attr("data-ls-module") === "tabs"){
        options.action = 'tab_navigation';
      }
      if($(item).parent().attr("data-ls-module") === "dropdown"){
        if($(item).parents(".ls-topbar").length > 0){
          options.action = 'top_bar_action';
          options.label = 'Toggle user dropdown';
        } else {
          options.action = 'dropdown_toggle';
        }
      }
      if($(item).attr("data-ls-module") === "modal"){
        var modal = $(item).data("target") ? $(item).data("target") : $(item).attr("href");
        options.action = 'open_modal_' + modal;
      }
      if($(item).parent().attr("data-ls-module") === "collapse"){
        options.type = "collapse";
      }
      if($(item).attr("data-ls-module") === "topbarCurtain"){
        options.action = "top_bar_action";
      }
      bindClickEvents(item, options);
    });
  }

  function findButtons(){
    var buttons = $("button");
    $(buttons).each(function (index, item) {
      var options = {};
      options.category = $(item).data("ls-te-category") ? $(item).data("ls-te-category") : null;
      options.action = $(item).data("ls-te-action") ? $(item).data("ls-te-action") : 'on_page_button_#';
      options.label = $(item).data("ls-te-label") ? $(item).data("ls-te-label") : $(item).text();
      var modal;
      if($(item).attr("data-ls-module") === "modal"){
        modal = $(item).data("target") ? $(item).data("target") : $(item).attr("href");
        options.action = 'open_modal_' + modal;
      }
      if($(item).attr("data-dismiss") === "modal"){
        modal = $($(item).parents(".ls-modal")).attr("id");
        options.action = 'close_modal_#' + modal;
      }
      bindClickEvents(item, options);
    });
  }

  function findForms(){
    var forms = $("form");
    $(forms).each(function (index, item) {
      var options = {};
      if($(item).parents('.ls-modal').length) {
        options.action = "submit_form_#" + ($(item).data("action") || $(item).attr("id") || $(item).attr("action")) + "#inside_modal#" + $(item).parents('.ls-modal').attr("id");
      } else {
        options.action = "submit_form_#" + ($(item).data("action") || $(item).attr("id") || $(item).attr("action"));
      }
      options.label = $(item).find(":submit[type=submit]").val() || $(item).find(":submit[type=submit]").text();
      bindFormEvents(item, options);
    });
  }

  function findSelects() {
    var selects = $("select");
    $(selects).each(function (index, item) {
      var options = {};
      options.category = $(item).data("ls-te-category") ? $(item).data("ls-te-category") : null;
      options.action = "select_change_#" + ($(item).attr("id") || $(item).attr("name"));
      options.label = "option";
      bindSelects(item, options);
    });
  }

  function bindClickEvents(element, options){
    $(element).off("click.lsTrackEvent");
    $(element).on("click.lsTrackEvent", function () {
      if(options.type === "collapse"){
        var targetCollapse = $(element).parent().attr("id");
        if($("#" + targetCollapse).hasClass("ls-collapse-open")){
          options.action = 'close_collapse_#' + targetCollapse;
          options.label = "Close collapse";
        } else {
          options.action = 'open_collapse_#' + targetCollapse;
          options.label = "Open collapse";
        }
      }
      ga('send', 'event', options.category || locastyle.trackEvents.eventCategory, options.action, options.label);
    });
  }

  function bindFormEvents(element, options) {
    $(element).find(":submit[type=submit]").off("click.lsTrackEvent");
    $(element).off("submit.ls");
    $(element).on("submit.ls", function () {
      ga('send', 'event', locastyle.trackEvents.eventCategory, options.action, options.label);
    });
  }

  function bindSelects(element, options) {
    $(element).off("change.ls");
    $(element).on("change.ls", function () {
      options.label = $(this).val();
      ga('send', 'event', options.category || locastyle.trackEvents.eventCategory, options.action, options.label);
    });
  }

  function bindGuidedTour() {
    $("body").off("click.lsTrackEvents");
    $("body").on("click.lsTrackEvents", ".hopscotch-bubble .hopscotch-nav-button", function() {
      var currentStep = $(this).parents(".hopscotch-bubble").find(".hopscotch-bubble-number").text();
      ga('send', 'event', locastyle.trackEvents.eventCategory, 'go_to_tour_step[' + currentStep + ']', $(this).text());
    });
  }

  return {
    init: init
  };

}());
