$(document).ready(function(){
	prettyPrint();
	themeSelector.init();
		themeSelector.cookieManager.init();
});

window.themeSelector = window.themeSelector || {};

window.themeSelector = {
	init: function () {
		themeSelector.loadTheme();
		themeSelector.themeChangeBind();
	},

	loadTheme: function (selected_by_user) {
		var theme = themeSelector.setTheme(selected_by_user)
		regexp = new RegExp("color[A-Z][^ ]*");
		oldThemeClass = $("html").attr("class").match(regexp);
		if (oldThemeClass) {
			$("html").removeClass(oldThemeClass[0]);
		}
		$("html").addClass(theme);
		$("#theme_selector").val(theme);
	},

	setTheme: function (selected_by_user) {
		var theme;
		if (selected_by_user) {
			theme = selected_by_user;
			themeSelector.cookieManager.createCookie("_locastyle_sample_theme", selected_by_user, 1);
		} else {
			theme = themeSelector.cookieManager.checkCookie();
		}
		return theme;
	},

	themeChangeBind: function () {
		$("#theme_selector").on("change", function () {
			themeSelector.loadTheme($(this).val());
		});
	}
}


//Cookie
window.themeSelector = window.themeSelector || {};

window.themeSelector.cookieManager = {
	init: function () {
		themeSelector.cookieManager.checkCookie();
	},

	checkCookie: function () {
		var cookie = themeSelector.cookieManager.readCookie();
		if (cookie && cookie !== -1) {
			var value = cookie.split("=")[1]
			return value;
		}
	},

	createCookie: function (name, value, days) {
		if (days) {
			var today = new Date();
			var date = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	},

	readCookie: function () {
		var desiredCookieRegExp = new RegExp("_locastyle_sample_theme=[^ ]*");
		var cookies = document.cookie.split(';');
		for (var i=0; i<cookies.length; i++) {
			var cookie = cookies[i].match(desiredCookieRegExp);
			if (cookie) {
				return cookie[0];
			}
		}
		return -1;
	}
}