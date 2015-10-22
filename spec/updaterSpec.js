var Updater = require('../lib/updater.js');
var Item = require('../lib/item.js');

describe("updater-test", function() {

	var updater;

	function updateItem(item) {
		updater.addItem(item);
		updater.update(updater.items);
	}

	function createAndUpdateItem(params) {
		var item = new Item(params.name);
		item.quality = params.quality;
		item.sell_in = params.sell_in;
		updater.addItem(item);
		updater.update();
		return item;
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
		var item = createAndUpdateItem({name:'item', quality:10});
		expect(item.quality).toBe(9);
	});

	it("decreases item sell-in on update", function() {
		var item = createAndUpdateItem({name:'item', sell_in:10});
		expect(item.sell_in).toBe(9);
	});

	it("does not allow item quality to be less than zero", function() {
		var item = createAndUpdateItem({name:'item', quality:0});
		expect(item.quality).toBe(0);
	});

	it("doubles quality decrease when sell-in is zero", function() {
		var item = createAndUpdateItem({name:'item', sell_in:0, quality:10});
		expect(item.quality).toBe(8);
	});

	it("increases quality when item is Aged Brie ", function() {
		var item = createAndUpdateItem({name:'Aged Brie', quality:0});
		expect(item.quality).toBe(1);
	});

	it("tops item quality to 50", function() {
		var item = createAndUpdateItem({name:'Aged Brie', quality:50});
		expect(item.quality).toBe(50);
	});

	it("does not affect Sulfuras' properties", function() {
		var item = createAndUpdateItem({name:'Sulfuras, Hand of Ragnaros', quality:80, sell_in:0});
		expect(item.quality).toBe(80);
		expect(item.sell_in).toBe(0);
	});

	it("increases Backstage passes' quality by 1 when sell_in is more than 10", function() {
		var item = createAndUpdateItem(
			{name:'Backstage passes to a TAFKAL80ETC concert', 
			quality:0, 
			sell_in:11}
		);
		expect(item.quality).toBe(1);
	});

	it("increases Backstage passes' quality by 1 when sell_in is equal or less than 10 and more than 5", function() {
		var item = createAndUpdateItem(
			{name:'Backstage passes to a TAFKAL80ETC concert', 
			quality:0, 
			sell_in:10}
		);
		expect(item.quality).toBe(2);

		var item = createAndUpdateItem(
			{name:'Backstage passes to a TAFKAL80ETC concert', 
			quality:0, 
			sell_in:6}
		);
		expect(item.quality).toBe(2);
	});

	it("increases Backstage passes' quality by 2 when sell_in is equal or less than 5 and more than 0", function() {
		var item = createAndUpdateItem(
			{name:'Backstage passes to a TAFKAL80ETC concert', 
			quality:0, 
			sell_in:5}
		);
		expect(item.quality).toBe(3);
	});

	it("sets Backstage passes' quality to 0 when sell_in is equal or less than 0", function() {
		var item = createAndUpdateItem(
			{name:'Backstage passes to a TAFKAL80ETC concert', 
			quality:10, 
			sell_in:0}
		);
		expect(item.quality).toBe(0);
	});
});