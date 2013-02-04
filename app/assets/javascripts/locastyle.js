Locastyle = (function() {
  Locastyle.prototype.base = {
    init: function (dom_scope) {
      this.toggleTextOnClick(dom_scope)
      this.toggleTextOnHover(dom_scope)
    },

    toggleTextOnClick: function(dom_scope) {
      var self = this;
      $('[data-toggle_text="click"]', dom_scope).on("click", function(e) {
        e.preventDefault();
        self.toggleText(this);
      });
    },

    toggleTextOnHover: function(dom_scope) {
      var self = this;
      $('[data-toggle_text="hover"]', dom_scope).on("mouseover", function(e) {
        e.preventDefault();
        self.toggleText(this);
      });
    },

    toggleText: function(element) {
      var text, replacementText;
      text = $(element).html();
      replacementText = $(element).data("text");
      $(element).text(replacementText).data("text", text);
    }
  }
});
