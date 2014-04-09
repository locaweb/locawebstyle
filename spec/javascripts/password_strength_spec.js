describe("Password Strength: ", function() {
  beforeEach(function() {
    loadFixtures('password_strength_fixture.html');
  });

  describe('Dom scope', function () {
    it('should load password strength and add related class in scoped dom', function () {
      locastyle.passwordStrength.init($("#scoped_dom"));
      expect($("#inside_scope_monitor").hasClass('empty')).toBeTruthy();
    });

    it('should NOT load password strength and add NOTHING in scoped dom', function () {
      locastyle.passwordStrength.init($("#scoped_dom"));
      expect($("#outside_scope_monitor").hasClass('empty')).not.toBeTruthy();
    });
  });

  describe('When init with document as dom_scope', function () {
    beforeEach(function() {
      locastyle.passwordStrength.init($(document));
    });

    describe("Complexity meter", function () {
      it("should return 'strong' when I pass a string containing at least eight chars, letters, numbers, capital letters and special characters", function () {
        expect(locastyle.passwordStrength.checkIt("s0mePas$")).toEqual("strong");
      });

      it("should return 'good' when I pass a string containing at least eight chars, letters, numbers and capital letters", function () {
        expect(locastyle.passwordStrength.checkIt("somePass12")).toEqual("good");
      });

      it("should return 'medium' when I pass a string containing at least eight chars, letters and numbers", function () {
        expect(locastyle.passwordStrength.checkIt("somepass12")).toEqual("medium");
      });

      it("should return 'weak' when I pass a string containing at least eight chars and only letters", function () {
        expect(locastyle.passwordStrength.checkIt("somepass")).toEqual("weak");
      });

      it("should return 'weak' when I pass a string containing lass than eight chars", function () {
        expect(locastyle.passwordStrength.checkIt("s0mPa$")).toEqual("weak");
      });
    });

    describe("Monitor feedback", function () {
      it("should have the css 'strong' class when 's0mePas$' is typed", function () {
        $("#form_to_password_strength #user_password").val("s0mePas$").trigger("keyup");
        expect($("#form_to_password_strength .monitor").hasClass('strong') ).toBeTruthy();
      });

      it("should have the css 'good' class when 'somePass12' is typed", function () {
        $("#form_to_password_strength #user_password").val("somePass12").trigger("keyup");
        expect($("#form_to_password_strength .monitor").hasClass('good') ).toBeTruthy();
      });

      it("should have the css 'medium' class when 'somepass12' is typed", function () {
        $("#form_to_password_strength #user_password").val("somepass12").trigger("keyup");
        expect($("#form_to_password_strength .monitor").hasClass('medium') ).toBeTruthy();
      });

      it("should have the css 'weak' class when 'somepass' is typed", function () {
        $("#form_to_password_strength #user_password").val("somepass").trigger("keyup");
        expect($("#form_to_password_strength .monitor").hasClass('weak') ).toBeTruthy();
      });

      it("should have the css 'weak' class when 's0mPa$' is typed", function () {
        $("#form_to_password_strength #user_password").val("s0mPa$").trigger("keyup");
        expect($("#form_to_password_strength .monitor").hasClass('weak') ).toBeTruthy();
      });
    });
  });

});
