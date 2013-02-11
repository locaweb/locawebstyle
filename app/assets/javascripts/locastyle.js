Locastyle = (function() {
  Locastyle.prototype.base = {
    init: function (dom_scope) {
      this.toggleTextOnClick(dom_scope);
      this.toggleTextOnHover(dom_scope);
      this.datePickerSetup(dom_scope, this.datePickerOptions);
      this.numbersOnly(dom_scope);
      this.collapseActivate(dom_scope);
      this.activateCollapseOnShown(dom_scope);
      this.deactivateCollapseOnHide(dom_scope);
      this.htmlForceClass(dom_scope);
      this.disableClass(dom_scope);
      this.classParentLiMenu(dom_scope);
      this.modalAutoFocus(dom_scope);
      this.preventDefaultOnDisabled(dom_scope);
      this.openCollapsesWithError(dom_scope);
      this.autoOpenModal(dom_scope);
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
        self.collapseActivate();
      });
    },

    deactivateCollapseOnHide: function(dom_scope) {
      var self = this;
      $('.collapse', dom_scope).on('hide', function(){
        self.collapseDeactivate();
      });
    },

    collapseActivate: function(dom_scope) {
      $(".collapse.in", dom_scope).parents(".boxCollapse").addClass("active");
    },

    collapseDeactivate: function() {
      $(".collapse.in").parents(".boxCollapse").removeClass("active");
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
    },

    autoOpenModal: function(dom_scope) {
      $(".modalAutoOpen").modal("show");
    }
  }
});
