Locastyle = (function() {
  Locastyle.prototype.base = {
    init: function (dom_scope) {
      this.toggleTextOnClick(dom_scope);
      this.toggleTextOnHover(dom_scope);
      this.datePickerSetup(dom_scope, this.datePickerOptions);
      this.numbersOnly();
      this.collapseActivate();
      this.activateCollapseOnShown();
      this.deactivateCollapseOnHide();
      this.htmlForceClass();
      this.disableClass();
      this.classParentLiMenu();
      this.modalAutoFocus(dom_scope);
      this.preventDefaultOnDisabled(dom_scope);
      this.openCollapsesWithError(dom_scope);
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

    numbersOnly: function() {
      $('.numbersOnly').keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g,'');
      });
    },

    activateCollapseOnShown: function() {
      var self = this;
      $('.collapse').on('shown', function(){
        self.collapseActivate();
      });
    },

    deactivateCollapseOnHide: function() {
      var self = this;
      $('.collapse').on('hide', function(){
        self.collapseDeactivate();
      });
    },

    collapseActivate: function() {
      $(".collapse.in").parents(".boxCollapse").addClass("active");
    },

    collapseDeactivate: function() {
      $(".collapse.in").parents(".boxCollapse").removeClass("active");
    },

    htmlForceClass: function() {
      $("html").addClass("forceClass");
    },

    disableClass: function() {
      $("input[disabled], select[disabled], textarea[disabled], input[readonly], select[readonly], textarea[readonly]").addClass("disabled");
    },

    classParentLiMenu: function() {
      $("#menuPrincipal li").has('ul').addClass("parent");
    },

    modalAutoFocus: function(dom_scope) {
      $('.modal', dom_scope).on('shown', function () {
        $('.autoFocus', this).focus();
      });
    },

    preventDefaultOnDisabled: function(dom_scope) {
      $('.btn.disabled').click( function(event) {
        event.preventDefault();
      })
    },

    openCollapsesWithError: function(dom_scope) {
      $('.collapse .error', dom_scope).parents('.collapse').collapse('show');
    }
  }
});
