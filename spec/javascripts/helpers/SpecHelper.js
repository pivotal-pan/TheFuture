beforeEach(function() {
	jQuery.fx.off = true;
});

beforeEach(function() {
	Ember.testing = true; // http://ryanjm.com/js/2013/03/16/testing-an-ember-app/
	App.initialize();
	if (jasmine.store) jasmine.store.destroy();
	jasmine.store = App.__container__.lookup("store:main") // http://discuss.emberjs.com/t/recommended-testing-solution/1128/4
});

afterEach(function() {
	App.reset();
})