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
			this.notificationInfoSet(dom_scope);
			this.notificationInfoHandler(dom_scope);
			this.minShortcutsCookieSetter(dom_scope);
			this.minShortcutsCookieHandler();
			this.linkPreventDefault();
			this.popover(dom_scope);
			this.labelSelectCustom();
			this.collapsedRadios(dom_scope);
			this.closedAllCollapse(dom_scope);
			this.collapseWithTooltip(dom_scope);
			this.collapseNavButtons(dom_scope);
			this.listChecked(dom_scope);
			this.clickListChecked(dom_scope);
			this.togglePassword(dom_scope);
			this.classToggle(dom_scope);
		},

		popover: function(dom_scope){
			$("[rel=popover]", dom_scope).popover()
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
			$(".btn.disabled", dom_scope).click( function(event) {
				event.preventDefault();
			})
		},

		openCollapsesWithError: function(dom_scope) {
			$(".collapse .error", dom_scope).parents(".collapse").collapse("show");
		},

		autoOpenModal: function(dom_scope) {
			$(".modalAutoOpen", dom_scope).modal("show");
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
			$(".lnkToggle", dom_scope).on("click", function(e){
				e.preventDefault();
				$(this).parents(".toggleChild").find(".itemToToggle").toggleClass("dNone");
				$(this).parents(".toggleChild").toggleClass($(this).parents(".toggleChild").data("class"));
				self.toggleChildValue(dom_scope);
				$(this).trigger($.Event('lnkToggleFinish'));
			});
		},

		toggleChildValue: function(dom_scope) {
			$(".btn.lnkToggle", dom_scope).on("click", function(e){
				var inputs = $(this).parents(".toggleChild").find('[data-value]')
				inputs.each(function(){
					$(this).val($(this).data('value'));
				});
			});
		},

		inputDataValue: function(dom_scope) {
			$.each($('textarea, input[type="url"], input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]', dom_scope), function(i, e){
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
			$.each($(".carousel", dom_scope), function() {
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
			$("select.customSelect", dom_scope).select2();
		},

		notificationInfoSet: function(dom_scope){
			$('.lnkNoShow', dom_scope).on("click", function(){
				$.cookie( $(this).data("target") , true );
				$($(this).data("target")).remove();
			});
		},

		notificationInfoHandler: function(dom_scope){
			$.each($(".lnkNoShow", dom_scope), function() {
				var target = $(this).data("target");
				if($.cookie(target) === "true"){
					$(target).remove();
				}
			});
		},

		minShortcutsCookieSetter: function(dom_scope){
			var self = this;
			$(".minShortcuts", dom_scope).on('click', function(){
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
		collapsedRadios: function(dom_scope) {
			$(".collapsedRadios [data-toggle='collapse']").on("click", function(){
				var dataTarget = $(this).data('target');
				if( $(dataTarget).hasClass('in') ){
					return false
				}
				$(this).parents('.collapsedRadios').find('.in').collapse('hide');
			});
		},

		closedAllCollapse: function(dom_scope) {
			$('.closeAllCollapse').on('click', function(){
				$(this).parents('.collapsedRadios').find('.in').collapse('hide');
			})
		},

		collapseWithTooltip: function(dom_scope){
			$(".collapse", dom_scope).each(function(i, collapse){
				if( $(collapse).find('[rel="popover"]')[0] ){
					$(collapse)
						.on('shown', function(){
							$(collapse).addClass('with-tooltip');
						})
						.on('hidden', function(){
							$(collapse).removeClass('with-tooltip');
						});
				}
			});
		},

		collapseNavButtons: function(dom_scope){
			$(".collapseGroup", dom_scope).each(function(i, collapse){
				var hasValidate = false;
				if( $(collapse).hasClass('step-validate') &&  jQuery().validate ){
					hasValidate = true;
				}
				$(collapse).find('[data-collapse-nav]').on('click', function(evt){
						evt.preventDefault();
						var $step = $(this).parents('.collapse')
						if( hasValidate && !$(':input:visible', $step ).valid() ){
							return false;
						}
						var dest = $(this).data('collapse-nav');
						$step.collapse('hide');
						$( dest ).collapse('show');
				});
			});
		},

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
			$('.clearFormBt', dom_scope).live('click', function(e){
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


		listChecked: function(dom_scope) {
			$('.selectableCheck').each(function(){
				var inputChecked = $(this).is(':checked');
				if (inputChecked == true) {
					$('.selectable').removeClass('active');	
					$(this).parents('.selectable').addClass('active');	
				};
			})
		},

		clickListChecked: function(dom_scope) {
			$('.selectableCheck').on('change', function(){
				locastyle.base.listChecked();
			})
		},

		// Troca de input password para text
		togglePassword: function(dom_scope)  {
			$('.togglePass', dom_scope).on("click", function(e){
				e.preventDefault();
				var $self = $(this).data('target');
				if ($($self).attr('type') == 'password'){
					$($self).removeAttr('attr').prop('type','text');
				} else {
					$($self).removeAttr('attr').prop('type','password');
				}
			});
		},

		classToggle: function(dom_scope) {
		    $('[data-classtoggle]', dom_scope).on('click', function(e){
		      e.preventDefault();
		      var classes = $(this).data('classtoggle').split(',');
		      $(this).toggleClass(classes[0]).toggleClass(classes[1]);
		    });
		}


	}

});
