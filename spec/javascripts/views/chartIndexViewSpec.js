describe("ChartIndexView", function() {
   var view, controller, model;

   beforeEach(function () {
      spyOn(Highcharts, 'Chart');

      view = App.ChartIndexView.create();
      controller = Ember.ObjectController.create();

      Ember.run(function() {
         model = jasmine.store.createRecord('chart', {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
         });
         controller.set('model', model);
         view.set('controller', controller);
         view.appendTo('#jasmine_content');
      });
   });

   it("draws a chart", function () {
      expect(Highcharts.Chart).toHaveBeenCalled();
   });

   describe("when the chart data changes", function () {
      it("redraws the chart", function () {
         Ember.run(function() {
            view.get('controller.model').set('data', []);
         });
debugger;
         expect(Highcharts.Chart.calls.length).toEqual(2);
      });
   });
});