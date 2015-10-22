var Updater = require('../lib/updater.js');
var Item = require('../lib/item.js');

describe("updater-test", function() {

	var updater;

	function updateItem(item) {
		updater.addItem(item);
		updater.update(updater.items);
	}

	beforeEach(function(){
		updater = new Updater();
	});

	it("can add items", function() {
		updater.addItem({});
		expect(updater.items.length).toBe(1);
	});

	it("can update", function() {
		expect(updater.update).toBeDefined();
	});

	it("decreases item quality on update", function() {
		var item = new Item('item');
		item.quality = 10;
		updateItem(item);
		expect(item.quality).toBe(9);
	});

	it("decreases item sell-in on update", function() {
		var item = new Item('item');
		item.sell_in = 10;
		updateItem(item);
		expect(item.sell_in).toBe(9);
	});

	it("does not allow item quality to be less than zero", function() {
		var item = new Item('item');
		item.quality = 0;
		updateItem(item);
		expect(item.quality).toBe(0);
	});

	it("doubles quality decrease when sell-in is zero", function() {
		var item = new Item('item');
		item.sell_in = 0;
		item.quality = 10;
		updateItem(item);
		expect(item.quality).toBe(8);
	});
});