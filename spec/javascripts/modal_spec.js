describe("Modal: ", function() {

  beforeEach(function() {
    loadFixtures('modal_fixture.html');
    locastyle.modal.init();
  });

  afterEach(function() {
    locastyle.modal.close();
  });

  describe('When click on element with data-ls-module="modal"', function() {
    beforeEach(function() {
      $('[data-ls-module="modal"]').trigger("click");
    });

    it('should add class ls-opened on .ls-modal', function() {
      expect($("body .ls-modal")).toHaveClass('ls-opened');
    });

    describe('When modal is opened', function() {
      it('tag body should have class .ls-overflow-hidden', function() {
        expect($("body").hasClass('ls-overflow-hidden')).toEqual(true);
      });

      it("should trigger the event modal:opened", function() {
        var spyEvent = spyOnEvent('body .ls-modal', 'modal:opened');
        $('[data-ls-module="modal"]').trigger("click");
        expect('modal:opened').toHaveBeenTriggeredOn('body .ls-modal')
      });
    });

    describe('When modal is closed', function() {
      it('tag body not should have class .ls-overflow-hidden', function() {
        locastyle.modal.close();
        expect($("body").hasClass('ls-overflow-hidden')).toEqual(false);
      });
    });
  });

  describe('When click submit button on modal', function() {
    it('should submit the form when you press button', function() {
      var spyEvent = spyOnEvent($('#modalSubmitSample'), 'submit');
      $("#submitFormModalSample").trigger("click");
      expect(spyEvent).toHaveBeenTriggered();
    });
  });

  describe('When click on data-dismiss on modal', function() {
    it('should remove class opened on .ls-modal', function() {
      locastyle.modal.close();
      $('[data-dismiss="modal"]').trigger("click");
      expect($("#myModalOpened .ls-modal").hasClass('opened')).toBeFalsy();
    });

    it("should trigger the event modal:closed", function() {
      var spyEvent = spyOnEvent('.ls-modal', 'modal:closed');
      $('[data-dismiss="modal"]').trigger("click");
      expect('modal:closed').toHaveBeenTriggeredOn('.ls-modal');
    });
  });

  describe('When click on data-ls-module="modal" with data-custom-attrs', function() {
    it('should add attr on .ls-modal button', function() {
      $('#myModalCustomAttr [data-ls-module="modal"]').trigger("click");
      expect($("#myAwesomeModalCustomAttr button").data('method')).toEqual('delete');
    });
  });

  describe("When attribute data-modal-blocked is true", function(){
    it('should remove data-dismiss and not allowed to close modal', function() {
      $('#myModalOpenedNotAllowedToClose #triggerMyAwesomeModalNotAllowdClose').trigger("click");
      expect($('#myAwesomeModalNotAllowdClose button').data('dismiss')).toBeFalsy();
    });
  });

  describe("When modal have wai-aria:", function() {

    it("if modal opened should has attribute aria-hidden equal false", function() {
      $('#myModalOpened #myModal').trigger('click');
      expect($('#myModalOpened .ls-modal').attr('aria-hidden')).toEqual('false')
    });

    it("if modal opened should has attribute aria-hidden equal true", function() {
      $('#myModalClosed #myModal').trigger('click');
      $('#myModalClosed #modalDismiss').trigger('click');
      expect($('#myModalClosed .ls-modal').attr('aria-hidden')).toEqual('true')
    });

    it("should has attribute role equal dialog", function() {
      $('#myModalOpened #myModal').trigger('click');
      expect($('#myModalOpened .ls-modal').attr('role')).toEqual('dialog');
    });

    it("should has attribute aria-labelledby equal value ID of title modal", function() {
      var titleID = $('.ls-modal-title').attr('id')
      expect($('.ls-modal').attr('aria-labelledby')).toEqual(titleID);
    });

  });

  describe("Unbind:", function() {
    describe("when ESC keyup", function() {
      it("should unbind $document keyup event", function() {
        locastyle.modal.close();
        $('#myModalESC [data-ls-module="modal"]').trigger("click");
        var spy = spyOn(locastyle.modal, "close");
        locastyle.modal.init();
        locastyle.modal.init();
        locastyle.modal.init();

        var e = $.Event("keyup.ls-esc", { keyCode: 27 });
        $("body").trigger(e);
        expect(locastyle.modal.close.calls.count()).toEqual(1);
      });
    });

    describe("when unbind is called in module init", function() {
      it("should prevent open modal from being called twice or more times", function() {
        var spy = spyOn(locastyle.modal, "open");
        locastyle.modal.init();
        locastyle.modal.init();
        $('#myModalClosed [data-ls-module="modal"]').trigger("click");
        expect(locastyle.modal.open.calls.count()).toEqual(1);
      });

      it("should prevent close modal from being called more times than needed", function() {

        var config = {
          modal: '.ls-modal',
          open: {
            trigger: '[data-ls-module="modal"]'
          },
          close: {
            classes: '#myAwesomeModalClosed .ls-modal',
            trigger: '#myAwesomeModalClosed [data-dismiss="modal"]'
          },
          template: {
            classes: '.ls-modal-template'
          }
        };

        var spy = spyOn(locastyle.modal, "close");
        $('[data-target="#myAwesomeModalClosed"]').trigger("click");
        var timesToBeCalled = $(config.close.classes + ", " + config.close.trigger).length + 2;
        $('#myAwesomeModalClosed [data-dismiss="modal"]').trigger("click");
        expect(locastyle.modal.close.calls.count()).toEqual(timesToBeCalled);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $('[data-ls-module="modal"]').on("click", function () {
          window.test.method();
        });
        locastyle.modal.unbind();
        $('[data-ls-module="modal"]').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });

  });

});
