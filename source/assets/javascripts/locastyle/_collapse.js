// @todo: prevent-open
// @todo: hash init
// @todo: hash change
// @todo: toggle hover ?

var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  var config = {
        selectors: {
          container: '[data-ls-module="collapse"]', // .ls-collapse
          header: '.ls-collapse-header',
          content: '.ls-collapse-body',
          groupContainer: '.ls-collapse-group'
        },
        classes: {
          open: 'ls-collapse-open',
          alwaysOpen: 'ls-collapse-open-always'
        }
      }
  ;
  var _list;

  function init() {        
    _list = [];
    $(config.selectors.container).each(function() {
      _list.push(new Collapse($(this)));
    });    
    $('[data-toggle-collapse]').off('click.ls.collapse').on('click.ls.collapse', onButtonToggleCollapseClick);
  } 

  function onButtonToggleCollapseClick(event) {
    event.preventDefault();
    event.stopPropagation();
    var id = $(this).data('toggle-collapse');
    $(id).find(config.selectors.header).trigger('click');
  }

  function toggle($collapse) {
    $($collapse).find(config.selectors.header).trigger('click');
  }

  // 
  // Collapase
  // 
  function Collapse( element ) {      
    this.$el      = $(element);
    this.$header  = this.$el.find(config.selectors.header);
    this.$content = this.$el.find(config.selectors.content);
    this.$group   = this.$el.parents(config.selectors.groupContainer);
    this.$inputs  = this.$header.find('input[type="radio"], input[type="checkbox"]');
    this.addEvents();
    // Apenas para setar o aria no elemento
    if ( this.isOpen() ) {
      this.show();
    } else {
      this.hide();
    }
  }

  Collapse.prototype = {
    addEvents : function() {        
      if (!this.$el.hasClass(config.classes.alwaysOpen)) {
        if (this.$inputs[0])
        {          
          this.$inputs.on('change.ls.collapse', this.onInputChange.bind(this));
          this.$inputs.on('verify.ls.collapse', this.onInputVerify.bind(this)).trigger('verify.ls.collapse');
        } else {
          this.$header.off('click.ls.collapse').on('click.ls.collapse', this.onHeaderClick.bind(this));  
        }
        this.$el.on('hide.ls.collapse', this.hide.bind(this));
      }
    },
    isOpen : function() {        
      return this.$el.hasClass(config.classes.open);
    },
    show : function() {
      if ( this.$group[0] ) {
        this.$group.find(config.selectors.container).not(this.$el).trigger('hide.ls.collapse');
      }
      this.$el.addClass(config.classes.open);
      this.$header.attr({ 'aria-expanded' : true });
      this.$content.attr({ 'aria-hidden' : false });        
    },
    hide : function() {        
      if (!this.$el.hasClass(config.classes.alwaysOpen)) {
        this.$el.removeClass(config.classes.open);
        this.$header.attr({ 'aria-expanded' : false });
        this.$content.attr({ 'aria-hidden' : true });  
      }      
    },
    toggle : function() {        
      if ( this.isOpen() ) {
        this.hide();
      } else {
        this.show();
      }
    },
    verifyInput : function(input) {
      if ( input.is(':checked') ) {
        this.show();
      } else {
        this.hide();
      }
    },  
    onHeaderClick : function() {
      this.toggle();
    },
    onInputChange : function(event) {      
      $('input[name="'+$(event.currentTarget).attr('name')+'"]').trigger('verify.ls.collapse');
    },
    onInputVerify : function(event) {
      this.verifyInput($(event.currentTarget)); 
    }
  };

  return {
    init: init,
    toggle : toggle
  };

}());
