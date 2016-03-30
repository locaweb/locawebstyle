/*!
 * Pikaday jQuery plugin.
 *
 * Copyright © 2013 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
!function(e,t){"use strict";"object"==typeof exports?t(require("jquery"),require("../pikaday")):"function"==typeof define&&define.amd?define(["jquery","pikaday"],t):t(e.jQuery,e.Pikaday)}(this,function(e,t){"use strict";e.fn.pikaday=function(){var i=arguments;return i&&i.length||(i=[{}]),this.each(function(){var a=e(this),n=a.data("pikaday");if(n instanceof t)"string"==typeof i[0]&&"function"==typeof n[i[0]]&&n[i[0]].apply(n,Array.prototype.slice.call(i,1));else if("object"==typeof i[0]){var r=e.extend({},i[0]);r.field=a[0],a.data("pikaday",new t(r))}})}});