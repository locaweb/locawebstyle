describe("Password Strength", function() {
  beforeEach(function() {
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
});
