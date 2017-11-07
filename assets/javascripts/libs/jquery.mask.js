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
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.Zepto)}(function(e){"use strict";var t=function(t,n,a){var o,i=this;t=e(t),n="function"==typeof n?n(t.val(),void 0,t,a):n,i.init=function(){a=a||{},i.byPassKeys=[9,16,17,18,36,37,38,39,40,91],i.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}},i.translation=e.extend({},i.translation,a.translation),i=e.extend(!0,{},i,a),t.each(function(){a.maxlength!==!1&&t.attr("maxlength",n.length),a.placeholder&&t.attr("placeholder",a.placeholder),t.attr("autocomplete","off"),r.destroyEvents(),r.events();var e=r.getCaret();r.val(r.getMasked()),r.setCaret(e+r.getMaskCharactersBeforeCount(e,!0))})};var r={getCaret:function(){var e,n=0,a=t.get(0),o=document.selection,i=a.selectionStart;return o&&!~navigator.appVersion.indexOf("MSIE 10")?(e=o.createRange(),e.moveStart("character",t.is("input")?-t.val().length:-t.text().length),n=e.text.length):(i||"0"===i)&&(n=i),n},setCaret:function(e){if(t.is(":focus")){var n,a=t.get(0);a.setSelectionRange?a.setSelectionRange(e,e):a.createTextRange&&(n=a.createTextRange(),n.collapse(!0),n.moveEnd("character",e),n.moveStart("character",e),n.select())}},events:function(){t.on("keydown.mask",function(){o=r.val()}),t.on("keyup.mask",r.behaviour),t.on("paste.mask drop.mask",function(){setTimeout(function(){t.keydown().keyup()},100)}),t.on("change.mask",function(){t.data("changeCalled",!0)}),t.on("blur.mask",function(t){var n=e(t.target);n.prop("defaultValue")!==n.val()&&(n.prop("defaultValue",n.val()),n.data("changeCalled")||n.trigger("change")),n.data("changeCalled",!1)}),t.on("focusout.mask",function(){a.clearIfNotMatch&&r.val().length<n.length&&r.val("")})},destroyEvents:function(){t.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled")},val:function(e){var n=t.is("input");return arguments.length>0?n?t.val(e):t.text(e):n?t.val():t.text()},getMaskCharactersBeforeCount:function(e,t){for(var a=0,o=0,r=n.length;r>o&&e>o;o++)i.translation[n.charAt(o)]||(e=t?e+1:e,a++);return a},determineCaretPos:function(e,t,a,o){var s=i.translation[n.charAt(Math.min(e-1,n.length-1))];return s?Math.min(e+a-t-o,a):r.determineCaretPos(e+1,t,a,o)},behaviour:function(t){t=t||window.event;var n=t.keyCode||t.which;if(-1===e.inArray(n,i.byPassKeys)){var a=r.getCaret(),o=r.val(),s=o.length,l=s>a,c=r.getMasked(),d=c.length,u=r.getMaskCharactersBeforeCount(d-1)-r.getMaskCharactersBeforeCount(s-1);return c!==o&&r.val(c),!l||65===n&&t.ctrlKey||(8!==n&&46!==n&&(a=r.determineCaretPos(a,s,d,u)),r.setCaret(a)),r.callbacks(t)}},getMasked:function(e){var t,o,s=[],l=r.val(),c=0,d=n.length,u=0,h=l.length,f=1,m="push",p=-1;for(a.reverse?(m="unshift",f=-1,t=0,c=d-1,u=h-1,o=function(){return c>-1&&u>-1}):(t=d-1,o=function(){return d>c&&h>u});o();){var g=n.charAt(c),b=l.charAt(u),w=i.translation[g];w?(b.match(w.pattern)?(s[m](b),w.recursive&&(-1===p?p=c:c===t&&(c=p-f),t===p&&(c-=f)),c+=f):w.optional&&(c+=f,u-=f),u+=f):(e||s[m](g),b===g&&(u+=f),c+=f)}var v=n.charAt(t);return d!==h+1||i.translation[v]||s.push(v),s.join("")},callbacks:function(e){var i=r.val(),s=r.val()!==o;s===!0&&"function"==typeof a.onChange&&a.onChange(i,e,t,a),s===!0&&"function"==typeof a.onKeyPress&&a.onKeyPress(i,e,t,a),"function"==typeof a.onComplete&&i.length===n.length&&a.onComplete(i,e,t,a)}};i.remove=function(){var e=r.getCaret(),t=r.getMaskCharactersBeforeCount(e);r.destroyEvents(),r.val(i.getCleanVal()).removeAttr("maxlength"),r.setCaret(e-t)},i.getCleanVal=function(){return r.getMasked(!0)},i.init()};e.fn.mask=function(n,a){return this.unmask(),this.each(function(){e(this).data("mask",new t(this,n,a))})},e.fn.unmask=function(){return this.each(function(){try{e(this).data("mask").remove()}catch(t){}})},e.fn.cleanVal=function(){return e(this).data("mask").getCleanVal()},e("*[data-mask]").each(function(){var t=e(this),n={},a="data-mask-";"true"===t.attr(a+"reverse")&&(n.reverse=!0),"false"===t.attr(a+"maxlength")&&(n.maxlength=!1),"true"===t.attr(a+"clearifnotmatch")&&(n.clearIfNotMatch=!0),t.mask(t.attr("data-mask"),n)})});