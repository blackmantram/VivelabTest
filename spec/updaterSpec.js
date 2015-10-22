var Updater = require('../lib/updater.js');
var Item = require('../lib/item.js');

describe("updater-test", function() {

	updater = new Updater();

	it("can add items", function() {
		updater.addItem({});
		expect(updater.items.length).toBe(1);
	});

	it("can update", function() {
		expect(updater.update).toBeDefined();
	});

	it("item quality decreases on update", function() {
		item = new Item('item');
		item.quality = 10;
		updater.addItem(item);
		updater.update(updater.items);
		expect(item.quality).toBe(9);
	});
});