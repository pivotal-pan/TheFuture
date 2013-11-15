App = Ember.Application.create();
//App.ApplicationAdapter = DS.FixtureAdapter;


App.Chart = DS.Model.extend({
   name: DS.attr(),
   progress: DS.attr('number'),
   data: DS.attr()
});


App.Router.map(function () {
   this.resource('charts', function () {
      this.route('create');
      this.resource('chart', {path: ':chart_id'}, function () {
         this.route('edit');
      });
   });
});


App.ChartsRoute = Ember.Route.extend({
   model: function () {
      return this.store.findAll('chart');
   }
});


App.ChartsController = Ember.ArrayController.extend({
   sortProperties: ['name'],
   sortAscending: true,
   chartsCount: function () {
      return this.get('model.length');
   }.property('@each')
});


App.ChartsCreateRoute = Ember.Route.extend({
   model: function () {
      return Ember.Object.create({
         name: "New Chart",
         progress: 0
      });
   }
});


App.ChartsCreateController = Ember.ObjectController.extend({
   actions: {
      save: function () {
         var chart = this.store.createRecord('chart', this.get('model'));
         chart.save();
         this.transitionToRoute('charts');
      }
   }
});


App.ChartRoute = Ember.Route.extend({
   model: function (params) {
      return this.store.find('chart', params.chart_id);
   }
});


App.ChartIndexRoute = Ember.Route.extend({
   model: function (params) {
      return this.modelFor('chart');
   }
});


App.ChartController = Ember.ObjectController.extend({
   actions: {
      reload: function () {
         this.get('model').reload();
      },
      edit: function () {
         this.transitionToRoute('chart.edit');
      },
      delete: function () {
         this.toggleProperty('deleteMode');
      },
      cancelDelete: function () {
         this.set('deleteMode', false);
      },
      confirmDelete: function () {
         var chart = this.get('model');
         chart.deleteRecord();
         chart.save();
         this.transitionToRoute('charts');
         this.set('deleteMode', false);
      }
   }
});


App.ChartEditRoute = Ember.Route.extend({
   model: function () {
      return this.modelFor('chart');
   }
});


App.ChartEditController = Ember.ObjectController.extend({
   actions: {
      save: function () {
         var chart = this.get('model');
         chart.save();
         this.transitionToRoute('chart', chart);
      }
   }
});


App.ChartIndexView = Ember.View.extend({
   didInsertElement: function () {
      this.$().highcharts({
         title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
         },
         xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
         },
         yAxis: {
            title: {
               text: 'Temperature (°C)'
            }
         },
         series: [
            {
               name: 'Tokyo',
               data: this.get('controller.model.data')
            }
         ]
      });
   },

   onRerender: function() {
      this.rerender();
      console.log('App.ChartIndexView#onRerender', this.get('controller.model.data'));
   }.observes('controller.model.data')
});