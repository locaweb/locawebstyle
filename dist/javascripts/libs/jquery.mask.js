/**
 * jquery.mask.js
 * @version: v1.6.4
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(window.jQuery||window.Zepto)}(function(t){"use strict";var e=function(e,n,a){var i,s=this;e=t(e),n="function"==typeof n?n(e.val(),void 0,e,a):n,s.init=function(){a=a||{},s.byPassKeys=[9,16,17,18,36,37,38,39,40,91],s.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}},s.translation=t.extend({},s.translation,a.translation),s=t.extend(!0,{},s,a),e.each(function(){a.maxlength!==!1&&e.attr("maxlength",n.length),a.placeholder&&e.attr("placeholder",a.placeholder),e.attr("autocomplete","off"),o.destroyEvents(),o.events();var t=o.getCaret();o.val(o.getMasked()),o.setCaret(t+o.getMaskCharactersBeforeCount(t,!0))})};var o={getCaret:function(){var t,n=0,a=e.get(0),i=document.selection,s=a.selectionStart;return i&&!~navigator.appVersion.indexOf("MSIE 10")?(t=i.createRange(),t.moveStart("character",e.is("input")?-e.val().length:-e.text().length),n=t.text.length):(s||"0"===s)&&(n=s),n},setCaret:function(t){if(e.is(":focus")){var n,a=e.get(0);a.setSelectionRange?a.setSelectionRange(t,t):a.createTextRange&&(n=a.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select())}},events:function(){e.on("keydown.mask",function(){i=o.val()}),e.on("keyup.mask",o.behaviour),e.on("paste.mask drop.mask",function(){setTimeout(function(){e.keydown().keyup()},100)}),e.on("change.mask",function(){e.data("changeCalled",!0)}),e.on("blur.mask",function(e){var n=t(e.target);n.prop("defaultValue")!==n.val()&&(n.prop("defaultValue",n.val()),n.data("changeCalled")||n.trigger("change")),n.data("changeCalled",!1)}),e.on("focusout.mask",function(){a.clearIfNotMatch&&o.val().length<n.length&&o.val("")})},destroyEvents:function(){e.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled")},val:function(t){var n=e.is("input");return arguments.length>0?n?e.val(t):e.text(t):n?e.val():e.text()},getMaskCharactersBeforeCount:function(t,e){for(var a=0,i=0,o=n.length;o>i&&t>i;i++)s.translation[n.charAt(i)]||(t=e?t+1:t,a++);return a},determineCaretPos:function(t,e,a,i){var r=s.translation[n.charAt(Math.min(t-1,n.length-1))];return r?Math.min(t+a-e-i,a):o.determineCaretPos(t+1,e,a,i)},behaviour:function(e){e=e||window.event;var n=e.keyCode||e.which;if(-1===t.inArray(n,s.byPassKeys)){var a=o.getCaret(),i=o.val(),r=i.length,l=r>a,c=o.getMasked(),u=c.length,d=o.getMaskCharactersBeforeCount(u-1)-o.getMaskCharactersBeforeCount(r-1);return c!==i&&o.val(c),!l||65===n&&e.ctrlKey||(8!==n&&46!==n&&(a=o.determineCaretPos(a,r,u,d)),o.setCaret(a)),o.callbacks(e)}},getMasked:function(t){var e,i,r=[],l=o.val(),c=0,u=n.length,d=0,f=l.length,h=1,p="push",m=-1;for(a.reverse?(p="unshift",h=-1,e=0,c=u-1,d=f-1,i=function(){return c>-1&&d>-1}):(e=u-1,i=function(){return u>c&&f>d});i();){var g=n.charAt(c),v=l.charAt(d),y=s.translation[g];y?(v.match(y.pattern)?(r[p](v),y.recursive&&(-1===m?m=c:c===e&&(c=m-h),e===m&&(c-=h)),c+=h):y.optional&&(c+=h,d-=h),d+=h):(t||r[p](g),v===g&&(d+=h),c+=h)}var b=n.charAt(e);return u!==f+1||s.translation[b]||r.push(b),r.join("")},callbacks:function(t){var s=o.val(),r=o.val()!==i;r===!0&&"function"==typeof a.onChange&&a.onChange(s,t,e,a),r===!0&&"function"==typeof a.onKeyPress&&a.onKeyPress(s,t,e,a),"function"==typeof a.onComplete&&s.length===n.length&&a.onComplete(s,t,e,a)}};s.remove=function(){var t=o.getCaret(),e=o.getMaskCharactersBeforeCount(t);o.destroyEvents(),o.val(s.getCleanVal()).removeAttr("maxlength"),o.setCaret(t-e)},s.getCleanVal=function(){return o.getMasked(!0)},s.init()};t.fn.mask=function(n,a){return this.unmask(),this.each(function(){t(this).data("mask",new e(this,n,a))})},t.fn.unmask=function(){return this.each(function(){try{t(this).data("mask").remove()}catch(e){}})},t.fn.cleanVal=function(){return t(this).data("mask").getCleanVal()},t("*[data-mask]").each(function(){var e=t(this),n={},a="data-mask-";"true"===e.attr(a+"reverse")&&(n.reverse=!0),"false"===e.attr(a+"maxlength")&&(n.maxlength=!1),"true"===e.attr(a+"clearifnotmatch")&&(n.clearIfNotMatch=!0),e.mask(e.attr("data-mask"),n)})});