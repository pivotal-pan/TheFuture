App = Ember.Application.create();

App.Chart = Em.Object.extend();

var charts = [];
charts.push(App.Chart.create({id: 1}));

App.Router.map(function() {
	this.route('charts');
	this.route('chart', { path: 'chart/:id' });
});

App.ChartRoute = Ember.Route.extend({
	model: function(params) {
		return App.Chart.create(params);
	}
});

App.ChartsRoute = Ember.Route.extend({
	model: function() {
		return charts;
	},
	actions: {
		createChart: function(chartId) {
			var chart = this.controller.pushObject(App.Chart.create({id: chartId}));
			this.transitionTo('chart', chart);
		}
	}
});
