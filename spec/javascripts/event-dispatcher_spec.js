describe("Event Dispatcher: ", function(){
  beforeEach(function(){
    loadFixtures('event-dispatcher.html');

    // Function called when the event is fired
    window.test = {
      eventFunctionTest: function() {
        // fake function
      }
    };

    spyOnEvent(window, 'eventTest');
    spyOnEvent($('#btn-event-dispatcher'), 'click');
    spyOn(window.test, "eventFunctionTest");

    // Subscribe the function to event
    ls.eventDispatcher.eventSubscribe('eventTest', window.test.eventFunctionTest);

    // When click on button, trigger the event
    $('#btn-event-dispatcher').on('click', function(){
      ls.eventDispatcher.trigger('eventTest');
    });

    $('#btn-event-dispatcher').trigger('click');

  });


  it("the event 'eventTest' need to be fired and function called", function(){

    // Test if the evnet is called
    expect('eventTest').toHaveBeenTriggeredOn(window);

    // Test if the function related to event is called
    expect(window.test.eventFunctionTest).toHaveBeenCalled()

  });

});
