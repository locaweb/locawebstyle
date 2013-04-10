Locastyle = (function() {
  Locastyle.prototype.base = {
    init: function (dom_scope) {
      this.toggleTextOnClick(dom_scope);
      this.toggleTextOnHover(dom_scope);
      this.datePickerSetup(dom_scope, this.datePickerOptions);
      this.numbersOnly(dom_scope);
      this.activateCollapseOnShown(dom_scope);
      this.deactivateCollapseOnHide(dom_scope);
      this.htmlForceClass(dom_scope);
      this.disableClass(dom_scope);
      this.classParentLiMenu(dom_scope);
      this.modalAutoFocus(dom_scope);
      this.preventDefaultOnDisabled(dom_scope);
      this.openCollapsesWithError(dom_scope);
      this.autoOpenModal(dom_scope);
      this.modalSliderSetupBind(dom_scope);
      this.pathWayStepCounter(dom_scope);
      this.setListDetailSeparator();
      this.advancedSearchValueHandler(dom_scope);
      this.toggleChild(dom_scope);
      this.toggleChildValue(dom_scope);
      this.inputDataValue(dom_scope);
      this.carouselCounter(dom_scope);
      this.initCustomSelect(dom_scope);
      this.collapseSetAnchor();
      this.notificationInfoSet();
      this.notificationInfoHandler();
      this.minShortcutsCookieSetter();
      this.minShortcutsCookieHandler();
      this.coverAllLink(dom_scope);
      this.linkPreventDefault();
    },

    toggleTextOnClick: function(dom_scope) {
      var self = this;
      $('[data-toggle_text="click"]', dom_scope).on("click", function(e) {
        e.preventDefault();
        self.toggleText(this);
      });
    },

    toggleTextOnHover: function(dom_scope) {
      var self = this;
      $('[data-toggle_text="hover"]', dom_scope).on("mouseover", function(e) {
        e.preventDefault();
        self.toggleText(this);
      });
    },

    toggleText: function(element) {
      var text, replacementText;
      text = $(element).html();
      replacementText = $(element).data("text");
      $(element).text(replacementText).data("text", text);
    },

    datePickerOptions: {
      showOn: "button",
      dateFormat: "dd/mm/yy",
      monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
      monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
      dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
    },

    datePickerSetup: function(dom_scope, options) {
      $('.datepicker', dom_scope).datepicker(options);
    },

    numbersOnly: function(dom_scope) {
      $('.numbersOnly', dom_scope).keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g,'');
      });
    },

    activateCollapseOnShown: function(dom_scope) {
      var self = this;
      $('.collapse', dom_scope).on('shown', function(){
        $(this).parents(".boxCollapse").addClass("active");
      });
    },

    deactivateCollapseOnHide: function(dom_scope) {
      var self = this;
      $('.collapse', dom_scope).on('hide', function(){
        $(this).parents(".boxCollapse").removeClass("active");
      });
    },

    htmlForceClass: function(dom_scope) {
      $("html", dom_scope).addClass("forceClass");
    },

    disableClass: function(dom_scope) {
      $("input[disabled], select[disabled], textarea[disabled], input[readonly], select[readonly], textarea[readonly]", dom_scope).addClass("disabled");
    },

    classParentLiMenu: function(dom_scope) {
      $("#menuPrincipal li", dom_scope).has('ul').addClass("parent");
    },

    modalAutoFocus: function(dom_scope) {
      $(".modal", dom_scope).on("shown", function () {
        $(".autoFocus", this).focus();
      });
    },

    preventDefaultOnDisabled: function(dom_scope) {
      $(".btn.disabled").click( function(event) {
        event.preventDefault();
      })
    },

    openCollapsesWithError: function(dom_scope) {
      $(".collapse .error", dom_scope).parents(".collapse").collapse("show");
    },

    autoOpenModal: function(dom_scope) {
      $(".modalAutoOpen").modal("show");
    },

    modalSliderSetupBind: function(dom_scope) {
      var self = this;
      var btnPrev = ".modal [data-slide='prev']";
      var btnSave = ".modal .modal-footer .btn.btn-primary";
      $("[data-toggle='modal']").on("click", function(){
        self.setupModalSlider(btnPrev);
        self.hideElement(btnSave);
      });
      self.modalSliderActionController();
    },

    setupModalSlider: function(element) {
      var self = this;
      self.hideElement(element);
    },

    modalSliderActionController: function(dom_scope) {
      var self = this;
      var btnPrev = ".modal.in [data-slide='prev']";
      var btnSave = ".modal .modal-footer .btn.btn-primary";
      var btnNext = ".modal.in [data-slide='next']";

      $(".carousel").on("slid", function(dom_scope) {
        if ($(".item:first-child").is(".active")) {
          self.hideElement(btnPrev);
        } else {
          self.showElement(btnPrev);
        }

        if ($(".item:last-child").is(".active")) {
          self.hideElement(btnNext);
          self.showElement(btnSave);
        } else {
          self.showElement(btnNext);
          self.hideElement(btnSave);
        }

      });
    },

    showElement: function(element) {
      $(element).removeClass("dNone");
    },

    hideElement: function(element) {
      $(element).addClass("dNone");
    },

    pathWayStepCounter: function() {
      $(".pathWay").each(function() {
        var steps = $(this).find("li").size();
        $(this).addClass('steps' + steps);
      });
    },

    setListDetailSeparator: function() {
      $(".listDetail dd").each(function(i, el){
        $(el).after("<hr class='sep'/>");
      });
    },

    advancedSearchValueHandler: function(dom_scope) {
      $(".inputAdvancedSearchField", dom_scope).each(function(i, el){
        if($(el).val() !== ""){
          $(this).parents().addClass("in");
        }
      });
    },

    toggleChild: function(dom_scope) {
      self = this;
      $(".lnkToggle").on("click", function(e){
        e.preventDefault();
        $(this).parents(".toggleChild").find(".itemToToggle").toggleClass("dNone");
        $(this).parents(".toggleChild").toggleClass($(this).parents(".toggleChild").data("class"));
        self.toggleChildValue(dom_scope);
        $(this).trigger($.Event('lnkToggleFinish'));
      });
    },

    toggleChildValue: function(dom_scope) {
      $(".btn.lnkToggle").on("click", function(e){
        var inputs = $(this).parents(".toggleChild").find('[data-value]')
        inputs.each(function(){
          $(this).val($(this).data('value'));
        });
      });
    },

    inputDataValue: function(dom_scope) {
      $.each($('input[type="url"], input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]'), function(i, e){
        var value = $(this).attr("value");
        $(this).attr("data-value", value);
      });
    },

    collapseAutoOpen: function(target) {
      $("[data-target=" + target + "]").click();
      $("[data-target=" + target + "]").parent().addClass("active");
    },

    collapseSetAnchor: function(){
      var collapseAnchor = window.location.hash.replace("!/", "");
      this.collapseAnchorHandler(collapseAnchor);
    },

    collapseAnchorHandler: function(anchor){
      if(anchor != ''){
        this.collapseAutoOpen(anchor);
      }
    },

    carouselCounter: function(dom_scope){
      $.each($(".carousel"), function() {
        var items = $(".carousel-inner", this).children().size();
        $(".carouselNav i", this).html(items);
        $(this).on('slid', function() {
          $(this).find(".carouselNav b").html($(this).find(".active").index() + 1);
        });
      });
    },

    initCustomSelect: function(dom_scope){
      $("select.customSelect").select2();
    },

    notificationInfoSet: function(){
      $('.lnkNoShow').on("click", function(){
        $.cookie( $(this).data("target") , true );
        $($(this).data("target")).remove();
      });
    },

    notificationInfoHandler: function(){
      $.each($(".lnkNoShow"), function() {
        var target = $(this).data("target");
        if($.cookie(target) === "true"){
          $(target).remove();
        }
      });
    },

    minShortcutsCookieSetter: function(){
      var self = this;
      $(".minShortcuts").on('click', function(){
        if($.cookie("minShortcuts") === "true"){
          $.cookie("minShortcuts", false);
          self.toggleText($(this));
        }else{
          $.cookie("minShortcuts", true);
          self.toggleText($(this));
        }
        $(this).siblings(".expandBox").toggleClass("microBox");
      });
    },

    minShortcutsCookieHandler: function(){
      if($.cookie("minShortcuts") === "true"){
        self.toggleText($(".minShortcuts"));
        $(".expandBox").addClass("microBox");
      }
    },

    coverAllLink: function(dom_scope) {
      $('.chamadasBox div', dom_scope).each(function(){
        var title = $(this).find('p').text()
        $(this).append( $(this).find('h3 a').clone().addClass('lnkCoverAll').attr('title',title).attr('aria-label',title) );
      });
    },

    // look down here to cover tests
    collapsesWeirdBehavior: function(dom_scope) {
      $('body').on('change.collapse.data-api', '[data-toggle=hide]', function (e) {
        e.preventDefault();
        $($(this).data('target')).collapse('hide');
      });

      $('body').on('change.collapse.data-api', '[data-toggle=show]', function (e) {
        e.preventDefault();
        $($(this).data('target')).collapse('show');
      });

      $('[data-toggle=show]', dom_scope).filter(':checked').change();
    },

    linkPreventDefault: function(){
      $("a").on("click", function(e){
        if($(this).attr("href") === "" || $(this).attr("href") === "#"){
          e.preventDefault();
        }
      })
    },

    clearForms: function(dom_scope) {
      $('.clearFormBt').live('click', function(e){
        e.preventDefault();
        $(this).closest('.boxFiltro').find('.clearForm').not('.in').find(':input').each(function(){
          switch(this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                    this.selected = false;
                    break;
                case 'radio':
                    this.checked = false;
            }
        });
      });
    }
  }
});
