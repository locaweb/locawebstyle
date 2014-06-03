beforeEach(function () {
	jasmine.addMatchers({
		toHaveBeenBindedOnce: function () {
			return {
				compare: function (actual, eventType) {
					return { pass: $._data($(actual)[0], "events")[eventType].length === 1 }
				}
			}
		}
	});
});

