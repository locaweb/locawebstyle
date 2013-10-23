describe("Password Strength", function() {
  beforeEach(function() {
    loadFixtures('password_strength_fixture.html');
    locastyle.passwordStregth.init();
  });

  describe("Complexity meter", function () {
    it("should return 'strong' when I pass a string containing at least eight chars, letters, numbers, capital letters and special characters", function () {
      expect(locastyle.passwordStregth.checkIt("s0mePas$")).toEqual("strong");
    });

    it("should return 'good' when I pass a string containing at least eight chars, letters, numbers and capital letters", function () {
      expect(locastyle.passwordStregth.checkIt("somePass12")).toEqual("good");
    });

    it("should return 'medium' when I pass a string containing at least eight chars, letters and numbers", function () {
      expect(locastyle.passwordStregth.checkIt("somepass12")).toEqual("medium");
    });

    it("should return 'weak' when I pass a string containing at least eight chars and only letters", function () {
      expect(locastyle.passwordStregth.checkIt("somepass")).toEqual("weak");
    });

    it("should return 'weak' when I pass a string containing lass than eight chars", function () {
      expect(locastyle.passwordStregth.checkIt("s0mPa$")).toEqual("weak");
    });
  });

  describe("Monitor feedback", function () {
    it("should have the css 'strong' class when 's0mePas$' is typed", function () {
      $("#form_to_password_strength #user_password").val("s0mePas$").trigger("keyup");
      expect($("#form_to_password_strength .monitor")).toHaveClass("strong");
    });

    it("should have the css 'good' class when 'somePass12' is typed", function () {
      $("#form_to_password_strength #user_password").val("somePass12").trigger("keyup");
      expect($("#form_to_password_strength .monitor")).toHaveClass("good");
    });

    it("should have the css 'medium' class when 'somepass12' is typed", function () {
      $("#form_to_password_strength #user_password").val("somepass12").trigger("keyup");
      expect($("#form_to_password_strength .monitor")).toHaveClass("medium");
    });

    it("should have the css 'weak' class when 'somepass' is typed", function () {
      $("#form_to_password_strength #user_password").val("somepass").trigger("keyup");
      expect($("#form_to_password_strength .monitor")).toHaveClass("weak");
    });

    it("should have the css 'weak' class when 's0mPa$' is typed", function () {
      $("#form_to_password_strength #user_password").val("s0mPa$").trigger("keyup");
      expect($("#form_to_password_strength .monitor")).toHaveClass("weak");
    });
  });
});
