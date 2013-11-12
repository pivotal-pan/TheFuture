App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter;


App.Chart = DS.Model.extend({
	name: DS.attr(),
	progress: DS.attr('number')
});


App.Chart.FIXTURES = [
	{
		id: '1',
		name: 'My Chart',
		progress: 1.0,
	}
];


App.Router.map(function() {
	this.resource('charts', function() {
		this.route('create');
		this.resource('chart', {path: ':chart_id'}, function() {
			this.route('edit');
		});
	});
});


App.ChartsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('chart');
	}
});


App.ChartsController = Ember.ArrayController.extend({
	sortProperties: ['name'],
	sortAscending: true,
	chartsCount: function() {
		return this.get('model.length');
	}.property('@each')
});


App.ChartsCreateRoute = Ember.Route.extend({
	model: function() {
		return Ember.Object.create({
			name: "New Chart",
			progress: 0
		});
	}
});

App.ChartsCreateController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			var chart = this.store.createRecord('chart', this.get('model'));
			chart.save();
			this.transitionToRoute('chart', chart);
		}
	}
});


App.ChartRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('chart', params.chart_id);
	}
});


App.ChartController = Ember.ObjectController.extend({
	actions: {
		edit: function() {
			this.transitionToRoute('chart.edit');
		}
	}
});


App.ChartEditRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('chart');
	}
});


App.ChartEditController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			var chart = this.get('model');
			chart.save();
			this.transitionToRoute('chart', chart);
		}
	}
});
