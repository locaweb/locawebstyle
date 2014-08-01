/*!
 * Pikaday jQuery plugin.
 *
 * Copyright © 2013 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
!function(t,e){"use strict";"object"==typeof exports?e(require("jquery"),require("../pikaday")):"function"==typeof define&&define.amd?define(["jquery","pikaday"],e):e(t.jQuery,t.Pikaday)}(this,function(t,e){"use strict";t.fn.pikaday=function(){var n=arguments;return n&&n.length||(n=[{}]),this.each(function(){var a=t(this),i=a.data("pikaday");if(i instanceof e)"string"==typeof n[0]&&"function"==typeof i[n[0]]&&i[n[0]].apply(i,Array.prototype.slice.call(n,1));else if("object"==typeof n[0]){var s=t.extend({},n[0]);s.field=a[0],a.data("pikaday",new e(s))}})}});