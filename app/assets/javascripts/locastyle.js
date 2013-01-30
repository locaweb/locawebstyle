Locastyle = (function() {
  Locastyle.prototype.methods = {
    init: function (dom_scope) {
    },

    toggleTextOnClick: function(dom_scope) {
      var self = this;
      $('[data-toggle_text="click"]', dom_scope).on("click", function(e) {
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
