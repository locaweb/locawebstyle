/*!
 * Pikaday jQuery plugin.
 *
 * Copyright © 2013 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
!function(e,t){"use strict";"object"==typeof exports?t(require("jquery"),require("../pikaday")):"function"==typeof define&&define.amd?define(["jquery","pikaday"],t):t(e.jQuery,e.Pikaday)}(this,function(e,t){"use strict";e.fn.pikaday=function(){var n=arguments;return n&&n.length||(n=[{}]),this.each(function(){var o=e(this),a=o.data("pikaday");if(a instanceof t)"string"==typeof n[0]&&"function"==typeof a[n[0]]&&a[n[0]].apply(a,Array.prototype.slice.call(n,1));else if("object"==typeof n[0]){var i=e.extend({},n[0]);i.field=o[0],o.data("pikaday",new t(i))}})}});