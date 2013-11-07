App = Ember.Application.create();

App.Chart = DS.Model.extend({
	progress: DS.attr('number')
});

App.Router.map(function() {
	this.route('charts');
	this.route('chart', { path: 'chart/:id' });
});

App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		var store = this.get('store');
		store.push('chart', {
			id: 1,
			progress: 0
		});
	},
});

App.ChartRoute = Ember.Route.extend({
	model: function(params) {
		return App.Chart.create(params);
	},
	activate: function() {
		//
	}
});

App.ChartsRoute = Ember.Route.extend({
	model: function() {
		var store = this.get('store');
		return store.all('chart');
	},
	actions: {
		createChart: function(chartId) {
			var chart = this.controller.pushObject(this.get('store').createRecord(App.Chart, {id: chartId}));
			this.transitionTo('chart', chart);
		}
	}
});
