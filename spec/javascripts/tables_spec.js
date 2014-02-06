describe("Tables", function() {

  beforeEach(function() {
    loadFixtures('tables.html');
    locastyle.init();
    // locastyle.forms.init();
  });

  describe("Always", function() {

    beforeEach(function() {
      locastyle.forms.init();
      locastyle.tables.init();
    });

    it("group actions checkbox are always enabled", function(){
        expect( $('#groupCheckbox1') ).toHaveAttr('disabled');
    });

    it("check line, show group actions", function(){
      // $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
      console.log( $('.ls-table-group-actions') )
      alert('a')
      expect( $('.ls-table-group-actions') ).not.toBeHidden();
    });



    // on delete row, if only checked, hide group actions
    it("have same classes in tbody>tr>td  that the equivalent cell header", function(){
      var $complexTable = $('#complex-table'),
          hasSameClasses = true;
      $( 'th', $complexTable).each(function(ith, th){
        var thHeaderClasses = $(th).attr('class');
        $( 'tbody tr', $complexTable).each(function(itr, tr){
          $( 'td', tr).eq( ith ).hasClass(thHeaderClasses);
            if( thHeaderClasses  ){
              if( !$( 'td', tr).eq( ith ).hasClass(thHeaderClasses) ){
                hasSameClasses = false;
                return hasSameClasses;
              }
            }
        });
      });
      expect( hasSameClasses ).toBe( true );;
    });


    //dropup

  });

  describe("Desktop", function() {

    beforeEach(function() {
      locastyle.tables.config.isXsmall = false;
      locastyle.tables.init();
    });

    it("if has only one action, show one button", function(){
      var $complexTable = $('#complex-table'),
          isButton = true;
      $('tbody td.ls-table-actions', $complexTable).each(function(itd, td){
        var $actions = $(td).find('a, button');
        if( $actions.size() === 1 ){
          if ( !$actions.eq(0).hasClass('btn') && !( $(td).find('.btn-group').size() === 0 ) ){
            isButton = false;
            return isButton;
          }
        }
      });
      expect( isButton ).toBe( true );;
    });

    it("if has more than one action, show dropdow", function(){
      var $complexTable = $('#complex-table'),
          hasDropdown = false;
      $('tbody td.ls-table-actions', $complexTable).each(function(itd, td){
        var $actions = $(td).find('a, button');
        if( $actions.size() > 1 ){
          if ( $(td).find('.btn-group').size() === 1  ){
            hasDropdown = true;
            return hasDropdown;
          }
        }
      });
      expect( hasDropdown ).toBe( true );;
    });


  });

  describe("Mobile", function() {

    beforeEach(function() {
      locastyle.tables.config.isXsmall = true;
      locastyle.tables.init();
    });

    afterEach(function() {
      $('#template-modal').remove();
      $('.overlay-bar').remove();
      $('.modal-backdrop').remove();
    });


    it("actions always inside dropdown", function(){
      var $complexTable  = $('#complex-table');
      var numberLines    = $complexTable.find('tbody tr').size();
      var numberDropdown = $complexTable.find('td.ls-table-actions .btn-group').size();
      expect( numberLines === numberDropdown ).toBe( true );;
    });

    it("always have action 'Visualizar'", function(){
      var $complexTable  = $('#complex-table');
      var numberLines    = $complexTable.find('tbody tr').size();
      var numberActionView = $complexTable.find('td.ls-table-actions [data-action-modal="view"]').size();
      expect( numberLines === numberActionView ).toBe( true );;
    });

    it("actions dropdown dont have text 'Ações'", function(){
      var $complexTable  = $('#complex-table');
      var textDropdown = $complexTable.find('td.ls-table-actions .dropdown-toggle').text();
      expect( jQuery.trim( textDropdown ) === '' ).toBe( true );
    });

    it("click everywhere in line, except actions column, open modal", function(){
      $('#complex-table tbody tr:eq(0) td:eq(0)').trigger('click');
      $('#complex-table tbody tr:eq(0) td:eq(1)').trigger('click');
      $('#complex-table tbody tr:eq(0) td.ls-table-actions').trigger('click');
      expect( $('#template-modal').size() === 1 ).toBe( true );
    });

  });






});
