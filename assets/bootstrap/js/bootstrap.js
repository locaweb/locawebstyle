/*!
 * Bootstrap v3.0.3 (http://getbootstrap.com)
 * Copyright 2013 Twitter, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap requires jQuery");/* ========================================================================
 * Bootstrap: transition.js v3.0.3
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";function t(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==e.style[i])return{end:t[i]}}e.fn.emulateTransitionEnd=function(t){var i=!1,n=this;e(this).one(e.support.transition.end,function(){i=!0});var s=function(){i||e(n).trigger(e.support.transition.end)};return setTimeout(s,t),this},e(function(){e.support.transition=t()})}(jQuery),/* ========================================================================
 * Bootstrap: alert.js v3.0.3
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t='[data-dismiss="alert"]',i=function(i){e(i).on("click",t,this.close)};i.prototype.close=function(t){function i(){r.trigger("closed.bs.alert").remove()}var n=e(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var r=e(s);t&&t.preventDefault(),r.length||(r=n.hasClass("alert")?n:n.parent()),r.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(r.removeClass("in"),e.support.transition&&r.hasClass("fade")?r.one(e.support.transition.end,i).emulateTransitionEnd(150):i())};var n=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var n=e(this),s=n.data("bs.alert");s||n.data("bs.alert",s=new i(this)),"string"==typeof t&&s[t].call(n)})},e.fn.alert.Constructor=i,e.fn.alert.noConflict=function(){return e.fn.alert=n,this},e(document).on("click.bs.alert.data-api",t,i.prototype.close)}(jQuery),/* ========================================================================
 * Bootstrap: button.js v3.0.3
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(i,n){this.$element=e(i),this.options=e.extend({},t.DEFAULTS,n)};t.DEFAULTS={loadingText:"loading..."},t.prototype.setState=function(e){var t="disabled",i=this.$element,n=i.is("input")?"val":"html",s=i.data();e+="Text",s.resetText||i.data("resetText",i[n]()),i[n](s[e]||this.options[e]),setTimeout(function(){"loadingText"==e?i.addClass(t).attr(t,t):i.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons"]'),t=!0;if(e.length){var i=this.$element.find("input");"radio"===i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}t&&this.$element.toggleClass("active")};var i=e.fn.button;e.fn.button=function(i){return this.each(function(){var n=e(this),s=n.data("bs.button"),r="object"==typeof i&&i;s||n.data("bs.button",s=new t(this,r)),"toggle"==i?s.toggle():i&&s.setState(i)})},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=i,this},e(document).on("click.bs.button.data-api","[data-toggle^=button]",function(t){var i=e(t.target);i.hasClass("btn")||(i=i.closest(".btn")),i.button("toggle"),t.preventDefault()})}(jQuery),/* ========================================================================
 * Bootstrap: carousel.js v3.0.3
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(t,i){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},t.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},t.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},t.prototype.to=function(t){var i=this,n=this.getActiveIndex();return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){i.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},t.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},t.prototype.next=function(){return this.sliding?void 0:this.slide("next")},t.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},t.prototype.slide=function(t,i){var n=this.$element.find(".item.active"),s=i||n[t](),r=this.interval,a="next"==t?"left":"right",o="next"==t?"first":"last",l=this;if(!s.length){if(!this.options.wrap)return;s=this.$element.find(".item")[o]()}this.sliding=!0,r&&this.pause();var c=e.Event("slide.bs.carousel",{relatedTarget:s[0],direction:a});if(!s.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var t=e(l.$indicators.children()[l.getActiveIndex()]);t&&t.addClass("active")})),e.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(c),c.isDefaultPrevented())return;s.addClass(t),s[0].offsetWidth,n.addClass(a),s.addClass(a),n.one(e.support.transition.end,function(){s.removeClass([t,a].join(" ")).addClass("active"),n.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(c),c.isDefaultPrevented())return;n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")}return r&&this.cycle(),this}};var i=e.fn.carousel;e.fn.carousel=function(i){return this.each(function(){var n=e(this),s=n.data("bs.carousel"),r=e.extend({},t.DEFAULTS,n.data(),"object"==typeof i&&i),a="string"==typeof i?i:r.slide;s||n.data("bs.carousel",s=new t(this,r)),"number"==typeof i?s.to(i):a?s[a]():r.interval&&s.pause().cycle()})},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=i,this},e(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(t){var i,n=e(this),s=e(n.attr("data-target")||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),r=e.extend({},s.data(),n.data()),a=n.attr("data-slide-to");a&&(r.interval=!1),s.carousel(r),(a=n.attr("data-slide-to"))&&s.data("bs.carousel").to(a),t.preventDefault()}),e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var t=e(this);t.carousel(t.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: collapse.js v3.0.3
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(i,n){this.$element=e(i),this.options=e.extend({},t.DEFAULTS,n),this.transitioning=null,this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.DEFAULTS={toggle:!0},t.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"},t.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t=e.Event("show.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var i=this.$parent&&this.$parent.find("> .panel > .in");if(i&&i.length){var n=i.data("bs.collapse");if(n&&n.transitioning)return;i.collapse("hide"),n||i.data("bs.collapse",null)}var s=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[s](0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("in")[s]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return r.call(this);var a=e.camelCase(["scroll",s].join("-"));this.$element.one(e.support.transition.end,e.proxy(r,this)).emulateTransitionEnd(350)[s](this.$element[0][a])}}},t.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=e.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return e.support.transition?(this.$element[i](0).one(e.support.transition.end,e.proxy(n,this)).emulateTransitionEnd(350),void 0):n.call(this)}}},t.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var i=e.fn.collapse;e.fn.collapse=function(i){return this.each(function(){var n=e(this),s=n.data("bs.collapse"),r=e.extend({},t.DEFAULTS,n.data(),"object"==typeof i&&i);s||n.data("bs.collapse",s=new t(this,r)),"string"==typeof i&&s[i]()})},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=i,this},e(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(t){var i,n=e(this),s=n.attr("data-target")||t.preventDefault()||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),r=e(s),a=r.data("bs.collapse"),o=a?"toggle":n.data(),l=n.attr("data-parent"),c=l&&e(l);a&&a.transitioning||(c&&c.find('[data-toggle=collapse][data-parent="'+l+'"]').not(n).addClass("collapsed"),n[r.hasClass("in")?"addClass":"removeClass"]("collapsed")),r.collapse(o)})}(jQuery),/* ========================================================================
 * Bootstrap: dropdown.js v3.0.3
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";function t(){e(n).remove(),e(s).each(function(t){var n=i(e(this));n.hasClass("open")&&(n.trigger(t=e.Event("hide.bs.dropdown")),t.isDefaultPrevented()||n.removeClass("open").trigger("hidden.bs.dropdown"))})}function i(t){var i=t.attr("data-target");i||(i=t.attr("href"),i=i&&/#/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var n=i&&e(i);return n&&n.length?n:t.parent()}var n=".dropdown-backdrop",s="[data-toggle=dropdown]",r=function(t){e(t).on("click.bs.dropdown",this.toggle)};r.prototype.toggle=function(n){var s=e(this);if(!s.is(".disabled, :disabled")){var r=i(s),a=r.hasClass("open");if(t(),!a){if("ontouchstart"in document.documentElement&&!r.closest(".navbar-nav").length&&e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click",t),r.trigger(n=e.Event("show.bs.dropdown")),n.isDefaultPrevented())return;r.toggleClass("open").trigger("shown.bs.dropdown"),s.focus()}return!1}},r.prototype.keydown=function(t){if(/(38|40|27)/.test(t.keyCode)){var n=e(this);if(t.preventDefault(),t.stopPropagation(),!n.is(".disabled, :disabled")){var r=i(n),a=r.hasClass("open");if(!a||a&&27==t.keyCode)return 27==t.which&&r.find(s).focus(),n.click();var o=e("[role=menu] li:not(.divider):visible a",r);if(o.length){var l=o.index(o.filter(":focus"));38==t.keyCode&&l>0&&l--,40==t.keyCode&&l<o.length-1&&l++,~l||(l=0),o.eq(l).focus()}}}};var a=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var i=e(this),n=i.data("bs.dropdown");n||i.data("bs.dropdown",n=new r(this)),"string"==typeof t&&n[t].call(i)})},e.fn.dropdown.Constructor=r,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=a,this},e(document).on("click.bs.dropdown.data-api",t).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",s,r.prototype.toggle).on("keydown.bs.dropdown.data-api",s+", [role=menu]",r.prototype.keydown)}(jQuery),/* ========================================================================
 * Bootstrap: modal.js v3.0.3
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(t,i){this.options=i,this.$element=e(t),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};t.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},t.prototype.toggle=function(e){return this[this.isShown?"hide":"show"](e)},t.prototype.show=function(t){var i=this,n=e.Event("show.bs.modal",{relatedTarget:t});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',e.proxy(this.hide,this)),this.backdrop(function(){var n=e.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(document.body),i.$element.show(),n&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var s=e.Event("shown.bs.modal",{relatedTarget:t});n?i.$element.find(".modal-dialog").one(e.support.transition.end,function(){i.$element.focus().trigger(s)}).emulateTransitionEnd(300):i.$element.focus().trigger(s)}))},t.prototype.hide=function(t){t&&t.preventDefault(),t=e.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),e(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),e.support.transition&&this.$element.hasClass("fade")?this.$element.one(e.support.transition.end,e.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},t.prototype.enforceFocus=function(){e(document).off("focusin.bs.modal").on("focusin.bs.modal",e.proxy(function(e){this.$element[0]===e.target||this.$element.has(e.target).length||this.$element.focus()},this))},t.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",e.proxy(function(e){27==e.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},t.prototype.hideModal=function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden.bs.modal")})},t.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},t.prototype.backdrop=function(t){var i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=e.support.transition&&i;if(this.$backdrop=e('<div class="modal-backdrop '+i+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",e.proxy(function(e){e.target===e.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;n?this.$backdrop.one(e.support.transition.end,t).emulateTransitionEnd(150):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t).emulateTransitionEnd(150):t()):t&&t()};var i=e.fn.modal;e.fn.modal=function(i,n){return this.each(function(){var s=e(this),r=s.data("bs.modal"),a=e.extend({},t.DEFAULTS,s.data(),"object"==typeof i&&i);r||s.data("bs.modal",r=new t(this,a)),"string"==typeof i?r[i](n):a.show&&r.show(n)})},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=i,this},e(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var i=e(this),n=i.attr("href"),s=e(i.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),r=s.data("modal")?"toggle":e.extend({remote:!/#/.test(n)&&n},s.data(),i.data());t.preventDefault(),s.modal(r,this).one("hide",function(){i.is(":visible")&&i.focus()})}),e(document).on("show.bs.modal",".modal",function(){e(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){e(document.body).removeClass("modal-open")})}(jQuery),/* ========================================================================
 * Bootstrap: tooltip.js v3.0.3
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(e,t){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",e,t)};t.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},t.prototype.init=function(t,i,n){this.enabled=!0,this.type=t,this.$element=e(i),this.options=this.getOptions(n);for(var s=this.options.trigger.split(" "),r=s.length;r--;){var a=s[r];if("click"==a)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=a){var o="hover"==a?"mouseenter":"focus",l="hover"==a?"mouseleave":"blur";this.$element.on(o+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},t.prototype.getDefaults=function(){return t.DEFAULTS},t.prototype.getOptions=function(t){return t=e.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},t.prototype.getDelegateOptions=function(){var t={},i=this.getDefaults();return this._options&&e.each(this._options,function(e,n){i[e]!=n&&(t[e]=n)}),t},t.prototype.enter=function(t){var i=t instanceof this.constructor?t:e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show),void 0):i.show()},t.prototype.leave=function(t){var i=t instanceof this.constructor?t:e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide),void 0):i.hide()},t.prototype.show=function(){var t=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(t),t.isDefaultPrevented())return;var i=this.tip();this.setContent(),this.options.animation&&i.addClass("fade");var n="function"==typeof this.options.placement?this.options.placement.call(this,i[0],this.$element[0]):this.options.placement,s=/\s?auto?\s?/i,r=s.test(n);r&&(n=n.replace(s,"")||"top"),i.detach().css({top:0,left:0,display:"block"}).addClass(n),this.options.container?i.appendTo(this.options.container):i.insertAfter(this.$element);var a=this.getPosition(),o=i[0].offsetWidth,l=i[0].offsetHeight;if(r){var c=this.$element.parent(),d=n,u=document.documentElement.scrollTop||document.body.scrollTop,p="body"==this.options.container?window.innerWidth:c.outerWidth(),h="body"==this.options.container?window.innerHeight:c.outerHeight(),m="body"==this.options.container?0:c.offset().left;n="bottom"==n&&a.top+a.height+l-u>h?"top":"top"==n&&a.top-u-l<0?"bottom":"right"==n&&a.right+o>p?"left":"left"==n&&a.left-o<m?"right":n,i.removeClass(d).addClass(n)}var f=this.getCalculatedOffset(n,a,o,l);this.applyPlacement(f,n),this.$element.trigger("shown.bs."+this.type)}},t.prototype.applyPlacement=function(e,t){var i,n=this.tip(),s=n[0].offsetWidth,r=n[0].offsetHeight,a=parseInt(n.css("margin-top"),10),o=parseInt(n.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(o)&&(o=0),e.top=e.top+a,e.left=e.left+o,n.offset(e).addClass("in");var l=n[0].offsetWidth,c=n[0].offsetHeight;if("top"==t&&c!=r&&(i=!0,e.top=e.top+r-c),/bottom|top/.test(t)){var d=0;e.left<0&&(d=-2*e.left,e.left=0,n.offset(e),l=n[0].offsetWidth,c=n[0].offsetHeight),this.replaceArrow(d-s+l,l,"left")}else this.replaceArrow(c-r,c,"top");i&&n.offset(e)},t.prototype.replaceArrow=function(e,t,i){this.arrow().css(i,e?50*(1-e/t)+"%":"")},t.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},t.prototype.hide=function(){function t(){"in"!=i.hoverState&&n.detach()}var i=this,n=this.tip(),s=e.Event("hide.bs."+this.type);return this.$element.trigger(s),s.isDefaultPrevented()?void 0:(n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?n.one(e.support.transition.end,t).emulateTransitionEnd(150):t(),this.$element.trigger("hidden.bs."+this.type),this)},t.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||"string"!=typeof e.attr("data-original-title"))&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},t.prototype.hasContent=function(){return this.getTitle()},t.prototype.getPosition=function(){var t=this.$element[0];return e.extend({},"function"==typeof t.getBoundingClientRect?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},t.prototype.getCalculatedOffset=function(e,t,i,n){return"bottom"==e?{top:t.top+t.height,left:t.left+t.width/2-i/2}:"top"==e?{top:t.top-n,left:t.left+t.width/2-i/2}:"left"==e?{top:t.top+t.height/2-n/2,left:t.left-i}:{top:t.top+t.height/2-n/2,left:t.left+t.width}},t.prototype.getTitle=function(){var e,t=this.$element,i=this.options;return e=t.attr("data-original-title")||("function"==typeof i.title?i.title.call(t[0]):i.title)},t.prototype.tip=function(){return this.$tip=this.$tip||e(this.options.template)},t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},t.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},t.prototype.enable=function(){this.enabled=!0},t.prototype.disable=function(){this.enabled=!1},t.prototype.toggleEnabled=function(){this.enabled=!this.enabled},t.prototype.toggle=function(t){var i=t?e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;i.tip().hasClass("in")?i.leave(i):i.enter(i)},t.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var i=e.fn.tooltip;e.fn.tooltip=function(i){return this.each(function(){var n=e(this),s=n.data("bs.tooltip"),r="object"==typeof i&&i;s||n.data("bs.tooltip",s=new t(this,r)),"string"==typeof i&&s[i]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=i,this}}(jQuery),/* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};if(!e.fn.tooltip)throw new Error("Popover requires tooltip.js");t.DEFAULTS=e.extend({},e.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype),t.prototype.constructor=t,t.prototype.getDefaults=function(){return t.DEFAULTS},t.prototype.setContent=function(){var e=this.tip(),t=this.getTitle(),i=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](i),e.removeClass("fade top bottom left right in"),e.find(".popover-title").html()||e.find(".popover-title").hide()},t.prototype.hasContent=function(){return this.getTitle()||this.getContent()},t.prototype.getContent=function(){var e=this.$element,t=this.options;return e.attr("data-content")||("function"==typeof t.content?t.content.call(e[0]):t.content)},t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},t.prototype.tip=function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip};var i=e.fn.popover;e.fn.popover=function(i){return this.each(function(){var n=e(this),s=n.data("bs.popover"),r="object"==typeof i&&i;s||n.data("bs.popover",s=new t(this,r)),"string"==typeof i&&s[i]()})},e.fn.popover.Constructor=t,e.fn.popover.noConflict=function(){return e.fn.popover=i,this}}(jQuery),/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";function t(i,n){var s,r=e.proxy(this.process,this);this.$element=e(i).is("body")?e(window):e(i),this.$body=e("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",r),this.options=e.extend({},t.DEFAULTS,n),this.selector=(this.options.target||(s=e(i).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=e([]),this.targets=e([]),this.activeTarget=null,this.refresh(),this.process()}t.DEFAULTS={offset:10},t.prototype.refresh=function(){var t=this.$element[0]==window?"offset":"position";this.offsets=e([]),this.targets=e([]);var i=this;this.$body.find(this.selector).map(function(){var n=e(this),s=n.data("target")||n.attr("href"),r=/^#\w/.test(s)&&e(s);return r&&r.length&&[[r[t]().top+(!e.isWindow(i.$scrollElement.get(0))&&i.$scrollElement.scrollTop()),s]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},t.prototype.process=function(){var e,t=this.$scrollElement.scrollTop()+this.options.offset,i=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=i-this.$scrollElement.height(),s=this.offsets,r=this.targets,a=this.activeTarget;if(t>=n)return a!=(e=r.last()[0])&&this.activate(e);for(e=s.length;e--;)a!=r[e]&&t>=s[e]&&(!s[e+1]||t<=s[e+1])&&this.activate(r[e])},t.prototype.activate=function(t){this.activeTarget=t,e(this.selector).parents(".active").removeClass("active");var i=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(i).parents("li").addClass("active");n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate.bs.scrollspy")};var i=e.fn.scrollspy;e.fn.scrollspy=function(i){return this.each(function(){var n=e(this),s=n.data("bs.scrollspy"),r="object"==typeof i&&i;s||n.data("bs.scrollspy",s=new t(this,r)),"string"==typeof i&&s[i]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=i,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: tab.js v3.0.3
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype.show=function(){var t=this.element,i=t.closest("ul:not(.dropdown-menu)"),n=t.data("target");if(n||(n=t.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var s=i.find(".active:last a")[0],r=e.Event("show.bs.tab",{relatedTarget:s});if(t.trigger(r),!r.isDefaultPrevented()){var a=e(n);this.activate(t.parent("li"),i),this.activate(a,a.parent(),function(){t.trigger({type:"shown.bs.tab",relatedTarget:s})})}}},t.prototype.activate=function(t,i,n){function s(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),a?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),n&&n()}var r=i.find("> .active"),a=n&&e.support.transition&&r.hasClass("fade");a?r.one(e.support.transition.end,s).emulateTransitionEnd(150):s(),r.removeClass("in")};var i=e.fn.tab;e.fn.tab=function(i){return this.each(function(){var n=e(this),s=n.data("bs.tab");s||n.data("bs.tab",s=new t(this)),"string"==typeof i&&s[i]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=i,this},e(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(jQuery),/* ========================================================================
 * Bootstrap: affix.js v3.0.3
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e){"use strict";var t=function(i,n){this.options=e.extend({},t.DEFAULTS,n),this.$window=e(window).on("scroll.bs.affix.data-api",e.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",e.proxy(this.checkPositionWithEventLoop,this)),this.$element=e(i),this.affixed=this.unpin=null,this.checkPosition()};t.RESET="affix affix-top affix-bottom",t.DEFAULTS={offset:0},t.prototype.checkPositionWithEventLoop=function(){setTimeout(e.proxy(this.checkPosition,this),1)},t.prototype.checkPosition=function(){if(this.$element.is(":visible")){var i=e(document).height(),n=this.$window.scrollTop(),s=this.$element.offset(),r=this.options.offset,a=r.top,o=r.bottom;"object"!=typeof r&&(o=a=r),"function"==typeof a&&(a=r.top()),"function"==typeof o&&(o=r.bottom());var l=null!=this.unpin&&n+this.unpin<=s.top?!1:null!=o&&s.top+this.$element.height()>=i-o?"bottom":null!=a&&a>=n?"top":!1;this.affixed!==l&&(this.unpin&&this.$element.css("top",""),this.affixed=l,this.unpin="bottom"==l?s.top-n:null,this.$element.removeClass(t.RESET).addClass("affix"+(l?"-"+l:"")),"bottom"==l&&this.$element.offset({top:document.body.offsetHeight-o-this.$element.height()}))}};var i=e.fn.affix;e.fn.affix=function(i){return this.each(function(){var n=e(this),s=n.data("bs.affix"),r="object"==typeof i&&i;s||n.data("bs.affix",s=new t(this,r)),"string"==typeof i&&s[i]()})},e.fn.affix.Constructor=t,e.fn.affix.noConflict=function(){return e.fn.affix=i,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),i=t.data();i.offset=i.offset||{},i.offsetBottom&&(i.offset.bottom=i.offsetBottom),i.offsetTop&&(i.offset.top=i.offsetTop),t.affix(i)})})}(jQuery);