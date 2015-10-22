var Updater = require('../lib/updater.js');
var Item = require('../lib/item.js');

describe("updater-test", function() {

  it("can add items", function() {
  	updater = new Updater();
  	updater.addItem({});
    expect(updater.items.length).toBe(1);
  });

  it("can update", function() {
  	updater = new Updater();
  	expect(updater.update).toBeDefined();
  });

  it("item quality decreases on update", function() {
  	item = new Item('item');
  	item.quality = 10;
  	updater.addItem(item);
  	updater.update();
  	expect(item.quality).toBe(9);
  });
});