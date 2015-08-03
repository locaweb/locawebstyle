(function() {
    this.JST || (this.JST = {}), this.JST["locastyle/templates/_popover"] = function(s) {
        s || (s = {});
        var t, n = [],
            e = function(s) {
                return s && s.ecoSafe ? s : "undefined" != typeof s && null != s ? i(s) : ""
            },
            l = s.safe,
            i = s.escape;
        return t = s.safe = function(s) {
                if (s && s.ecoSafe) return s;
                ("undefined" == typeof s || null == s) && (s = "");
                var t = new String(s);
                return t.ecoSafe = !0, t
            }, i || (i = s.escape = function(s) {
                return ("" + s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            }),
            function() {
                (function() {
                    n.push('<div id="ls-popover-'), n.push(e(this.index)), n.push('" class="ls-popover ls-popover-'), n.push(e(this.placement)), n.push(" "), n.push(e(this.customClasses)), n.push('" style="top: 13px; left: 13px;">'), this.title && (n.push('\n  <div class="ls-popover-header">\n    <h3 class="title-3"> '), n.push(e(this.title)), n.push(" </h3>\n  </div>\n  ")), n.push("\n  "), this.content && n.push("\n  "), n.push('\n  <div class="ls-popover-content"> '), n.push(this.content), n.push(" </div>\n</div>\n")
                }).call(this)
            }.call(s), s.safe = l, s.escape = i, n.join("")
    }
}).call(this),
    function() {
        this.JST || (this.JST = {}), this.JST["locastyle/templates/_dropdown"] = function(s) {
            s || (s = {});
            var t, n = [],
                e = s.safe,
                l = s.escape;
            return t = s.safe = function(s) {
                    if (s && s.ecoSafe) return s;
                    ("undefined" == typeof s || null == s) && (s = "");
                    var t = new String(s);
                    return t.ecoSafe = !0, t
                }, l || (l = s.escape = function(s) {
                    return ("" + s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
                }),
                function() {
                    (function() {
                        var s, t, e, l;
                        for (n.push('<div data-ls-module="dropdown" class="ls-dropdown">\n  <a href="#" class="ls-btn"></a>\n  <ul class="ls-dropdown-nav">\n    '), l = this.elements, t = 0, e = l.length; e > t; t++) s = l[t], n.push("\n      "), "" !== s.text && (n.push("\n        <li>"), n.push(s.outerHTML), n.push("</li>\n      ")), n.push("\n    ");
                        n.push("\n  </ul>\n</div>\n")
                    }).call(this)
                }.call(s), s.safe = e, s.escape = l, n.join("")
        }
    }.call(this),
    function() {
        this.JST || (this.JST = {}), this.JST["locastyle/templates/_modal"] = function(s) {
            s || (s = {});
            var t, n = [],
                e = function(s) {
                    return s && s.ecoSafe ? s : "undefined" != typeof s && null != s ? i(s) : ""
                },
                l = s.safe,
                i = s.escape;
            return t = s.safe = function(s) {
                    if (s && s.ecoSafe) return s;
                    ("undefined" == typeof s || null == s) && (s = "");
                    var t = new String(s);
                    return t.ecoSafe = !0, t
                }, i || (i = s.escape = function(s) {
                    return ("" + s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
                }),
                function() {
                    (function() {
                        n.push('<div class="ls-modal fade opened ls-modal-template '), n.push(e(this.lsModule)), n.push(' ">\n  '), "link" !== this.actionType && (n.push('\n    <form action="'), n.push(e(this.action)), n.push('" method="post">\n  ')), n.push('\n    <div class="ls-modal-box">\n      <div class="ls-modal-header">\n        <button type="button" data-dismiss="modal" class="close">&times;</button>\n        <h4 class="ls-modal-title">'), n.push(e(this.title)), n.push('</h4>\n      </div>\n      <div class="ls-modal-body">\n        <p>'), n.push(this.content), n.push('</p>\n      </div>\n      <div class="ls-modal-footer">\n        <button class="ls-btn ls-float-right" data-dismiss="modal">\n          '), n.push(e(this.close)), n.push("\n        </button>\n        "), "link" !== this.actionType ? (n.push("\n          <button "), n.push(e(this.customAttrs)), n.push(' type="submit" class=" ls-btn '), n.push(e(this["class"])), n.push('">'), n.push(e(this.save)), n.push("</button>\n        ")) : (n.push('\n          <a href="'), n.push(e(this.action)), n.push('" '), n.push(e(this.customAttrs)), n.push(' class=" ls-btn '), n.push(e(this["class"])), n.push('">'), n.push(e(this.save)), n.push("</a>\n        ")), n.push("\n      </div>\n    </div>\n  </form>\n  "), "link" !== this.actionType && (n.push('\n    <form action="'), n.push(e(this.action)), n.push('" method="post">\n  ')), n.push('\n  <div class="ls-modal-overlay"></div>\n</div>\n')
                    }).call(this)
                }.call(s), s.safe = l, s.escape = i, n.join("")
        }
    }.call(this);
