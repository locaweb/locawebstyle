// $(function(){
	$.fn.passwordStrength = function(options) {
		var getPasswordStrength;
		getPasswordStrength = function(pass) {
			var easy, medium, medium_easy, passReturnStrength, strong, strong_easy;
			easy = pass.length;
			if (easy > 3) {
				easy = 3;
			}
			medium_easy = pass.replace(/[0-9]/g, "");
			medium = pass.length - medium_easy.length;
			if (medium > 4) {
				medium = 4;
			}
			strong_easy = pass.replace(/\W/g, "");
			strong = pass.length - strong_easy.length;
			if (strong > 5) {
				strong = 5;
			}
			passReturnStrength = ((easy * 10) - 30) + (medium * 10) + (strong * 10);
			if (passReturnStrength < 0) {
				passReturnStrength = 0;
			}
			if (passReturnStrength > 100) {
				passReturnStrength = 100;
			}
			return passReturnStrength;
		};
		return this.each(function() {
			var _this;
			_this = this;
			_this.opts = {};
			_this.opts = $.extend({}, $.fn.passwordStrength.defaults, options);
			_this.div = $(_this.opts.targetDiv);
			_this.defaultClass = _this.div.attr("class");
			_this.percents = (_this.opts.classes.length ? 100 / _this.opts.classes.length : 100);
			return $(this).keyup(function() {
				var largeNumber;
				if (typeof el === "undefined") {
					this.el = $(this);
				}
				largeNumber = Math.floor(getPasswordStrength(this.value) / this.percents);
				if (100 <= getPasswordStrength(this.value)) {
					largeNumber = this.opts.classes.length - 1;
				}
				return this.div.removeAttr("class").addClass(this.defaultClass).addClass(this.opts.classes[largeNumber]);
			}).next();
		});
	};

	$.fn.passwordStrength.defaults = {
		classes: Array("np10", "np20", "np30", "np40", "np50", "np60", "np70", "np80", "np90", "np100"),
		targetDiv: "#passwordStrength",
		cache: {}
	};

	$(document).ready(function() {
		return $("#user_password, #account_password").passwordStrength();
	});
// })