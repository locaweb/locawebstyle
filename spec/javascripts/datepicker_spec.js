describe("Datepicker: ", function(){
  beforeEach(function(){
    loadFixtures('datepicker_fixture.html');
  });

  describe("when input has class .datepicker", function(){
    
    it("pikaday binded", function(){
      var $input = $('#datepickerClass');
      $input.trigger('focus');
      var $datepicker = $('.pika-single');
      expect( $datepicker.hasClass("is-hidden") ).toBe(false);
    });

  });

  describe("init by javascript", function(){

    it("pikaday binded", function(){
      locastyle.datepicker.newDatepicker('#datepickerJs');
      var $datepicker = $('.pika-single');
      expect( $datepicker ).toExist();
    });

  });

});
