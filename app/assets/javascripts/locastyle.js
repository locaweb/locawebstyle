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
      this.linkPreventDefault();
      this.popover(dom_scope);
      this.formValidate(dom_scope);
      this.labelSelectCustom();
    },

    popover: function(dom_scope){
      $("[rel=popover]").popover()
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
      $(element).text(replacementText).data("text", text).attr("title", replacementText);
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
      $('.ui-datepicker-trigger', dom_scope).addClass('icon-calendar').html('');
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
        $(this).find('[tabindex="0"]').attr('tabindex','3');
      });
    },

    deactivateCollapseOnHide: function(dom_scope) {
      var self = this;
      $('.collapse', dom_scope).on('hide', function(){
        $(this).parents(".boxCollapse").removeClass("active");
        $(this).find('[tabindex="3"]').attr('tabindex','0');
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

    labelSelectCustom: function(){
      $(".label-for-custom2").on("click", function(){
        var target = $(this).data("target");
        $(target).select2("open");
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
    },

    formValidate: function(dom_scope) {
      $('.validate').validate({
        errorClass: "help-inline",
        errorElement: "span",
        errorPlacement: function(error, element) {
          var label = $(element).parent().find("label[for="+$(element).attr('id')+"]:first").text().replace("*", "").toLowerCase();
          error.text(error.text().replace('{label}', label));
          error.insertAfter(element);
          var msg = $(element).next('.help-inline').html();
        },
        highlight: function(element, errorClass){
          $(element).parent().addClass('error');
        },
        unhighlight: function(element, errorClass){
          $(element).parent().removeClass('error');
        }
      });
      this.validatePt_br();
    },

    validatePt_br: function(){
      $.extend($.validator.messages, {
        required: "O campo {label} n&atilde;o pode ficar em branco",
        remote: "Por favor, corrija este campo",
        email: "O campo {label} deve ser um e-mail v&aacute;lido",
        url: "O campo {label} deve ser uma url v&aacute;lido",
        date: "O campo {label} deve ser uma data v&aacute;lida",
        dateISO: "O campo {label} deve ser uma data v&aacute;lida (ISO)",
        number: "O campo {label} deve ser um n&uacute;mero v&aacute;lido",
        digits: "O campo {label} deve ser somente d&iacute;gitos",
        creditcard: "O campo {label} deve ser um cart&atilde;o de cr&eacute;dito v&aacute;lido",
        equalTo: "O campo {label} est&aacute; diferente da senha informada",
        accept: "O campo {label} Por favor, forne&ccedil;a um arquivo com uma extens&atilde;o v&aacute;lida",
        maxlength: $.validator.format("O campo {label} deve ser menor que {0} caracteres"),
        minlength: $.validator.format("O campo {label} deve ser maior que {0} caracteres"),
        rangelength: $.validator.format("O campo {label} deve ter entre {0} e {1} caracteres"),
        range: $.validator.format("Use um valor entre {0} e {1}"),
        max: $.format("O campo {label} deve ser menor do que {0}"),
        min: $.format("O campo {label} deve ser maior do que {0}"),
        maxValue: $.format("O campo {label} deve ser menor ou igual a {0}"),
        minValue: $.format("O campo {label} deve ser maior ou igual a {0}")
      });
    }

  }

});
