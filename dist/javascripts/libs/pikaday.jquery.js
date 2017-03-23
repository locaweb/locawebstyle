/*!
 * Pikaday jQuery plugin.
 *
 * Copyright © 2013 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
!function(t,e){"use strict";"object"==typeof exports?e(require("jquery"),require("../pikaday")):"function"==typeof define&&define.amd?define(["jquery","pikaday"],e):e(t.jQuery,t.Pikaday)}(this,function(t,e){"use strict";t.fn.pikaday=function(){var n=arguments;return n&&n.length||(n=[{}]),this.each(function(){var a=t(this),s=a.data("pikaday");if(s instanceof e)"string"==typeof n[0]&&"function"==typeof s[n[0]]&&s[n[0]].apply(s,Array.prototype.slice.call(n,1));else if("object"==typeof n[0]){var i=t.extend({},n[0]);i.field=a[0],a.data("pikaday",new e(i))}})}});