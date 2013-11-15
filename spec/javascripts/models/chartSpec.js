describe("Chart", function() {
	var chart;
	beforeEach(function () {
		Ember.run(function() {
			chart = jasmine.store.createRecord('chart', {name: "The Chart", progress: 1.0});
		});
		expect(chart).toBeTruthy();
	});
	
	it("has a name", function() {
		expect(chart.get('name')).toEqual("The Chart")
	});
	
	it("has progress", function() {
		expect(chart.get('progress')).toEqual(1.0);
	});
});