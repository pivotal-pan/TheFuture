PAx = new Backbone.Marionette.Application();

PAx.addRegions({
   mainRegion: "#content"
});

PAx.Chart = Backbone.Model.extend({

});

PAx.Charts = Backbone.Collection.extend({
   model: PAx.Chart
});

PAx.ChartsView = Backbone.Marionette.CompositeView.extend({
   template: "#charts-template",
   itemView: PAx.ChartView,

   appendHtml: function(collectionView, itemView){
      collectionView.$("ul").append(itemView.el);
   }
});

PAx.addInitializer(function(options) {
   var chartsView = new PAx.ChartsView({
      collection: options.charts
   });

   PAx.mainRegion.show(chartsView);
});

$(function() {
   var charts = new PAx.Charts([
      new PAx.Chart({
         name: "The First Chart",
         progress: 0,
         data: []
      })
   ]);

   PAx.start({
      charts: charts
   });
});