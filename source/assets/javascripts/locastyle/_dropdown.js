var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  var config = {
        selectors : {
          area: 'body',    
          nav: '.ls-dropdown-nav',
          firstLink: ' > [class*="ls-btn"]:first-child,  > a:first-child',
        },        
        classes : {
          disabled : 'ls-disabled',
          open : 'ls-active',
          alignToRight : 'ls-pos-right'
        }
      }
  ;
  var _list;

  function init() {
    _list = [];
    $('[data-ls-module="dropdown"], .ls-dropdown.ls-user-account').each(function() {
      _list.push(new Dropdown($(this)));
    });
  }
  function unbind() {
    for (var i = 0; i < _list.length; i++) {
      _list[i].removeEvents();
    };
  }
  function toggleDropdown($target) {
    $($target).find(config.selectors.firstLink).trigger('click');
  }
  function closeDropdown() {
    for (var i = 0; i < _list.length; i++) {
      _list[i].close();
    };
  }

  // 
  // Dropdown
  // 
  function Dropdown(element) {
    this.$el        = $(element); 
    this.$firstLink = this.$el.find(config.selectors.firstLink);
    this.$nav       = this.$el.find(config.selectors.nav);
    this.$body      = $('body');

    this.addEvents();   

    this.$nav.find('a').attr({ role : 'option' });
    this.$firstLink.attr({ role : 'combobox' });

    if(this.isOpen()) {        
      this.open();
    } else {
      this.close();
    }
    
  }  
  Dropdown.prototype = {
    addEvents : function() {
      this.$body.on('click.ls.dropdown', this.onDocumentClick.bind(this));
      this.$firstLink.on('click.ls.dropdown', this.onFirstLinkClick.bind(this));      
    },

    removeEvents : function() {
      this.$body.off('click.ls.dropdown');
      this.$firstLink.off('click.ls.dropdown');
    },
    isOpen : function() {
      return this.$el.hasClass(config.classes.open);
    },
    isDisable : function() {
      return this.$firstLink.hasClass(config.classes.disabled);
    },
    open : function() {      
      if(!this.isDisable()) {
        this.$el.addClass(config.classes.open);

        if(this.$body.get(0).scrollWidth > this.$body.width()) {
          this.$el.addClass(config.classes.alignToRight);
        }

        this.$firstLink.attr({ 'aria-expanded' : 'true' });
        this.$nav.attr({ 'aria-hidden' : 'false' });
      }      
    },

    close : function() {
      console.log("close");
      this.$el.removeClass(config.classes.open).removeClass(config.classes.alignToRight);

      this.$firstLink.attr({ 'aria-expanded' : 'false' });
      this.$nav.attr({ 'aria-hidden' : 'true' });
    },
    toggle : function() {
      if(this.isOpen()) {        
        this.close();
      } else {
        this.open();
      }
        
      locastyle.topbarCurtain.hideCurtains();
    },

    onDocumentClick : function(event) {      
      if ( !$(event.target).is(this.$firstLink) && this.isOpen() ) {        
        this.close();
      }
    },
    onFirstLinkClick : function(event) {
      event.preventDefault();
      this.toggle();
    }
  };

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  };

}());
