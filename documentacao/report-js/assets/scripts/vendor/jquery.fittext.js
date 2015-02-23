/*!
 * FitText.js 1.1
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 */
!function(t){t.fn.fitText=function(e,i){var a=e||1,s=t.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},i);return this.each(function(){var e=t(this),i=function(){e.css("font-size",Math.max(Math.min(e.width()/(10*a),parseFloat(s.maxFontSize)),parseFloat(s.minFontSize)))};i(),t(window).on("resize",i)})}}(jQuery);