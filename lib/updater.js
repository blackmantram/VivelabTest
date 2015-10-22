var QualityUpdater = require('../lib/quality_updater.js');

function Updater() {
	this.items = [];
	this.qualityUpdater = new QualityUpdater();
}

Updater.prototype.addItem = function(item) {
	this.items.push(item);
};

Updater.prototype.update = function() {
	for(item in this.items)
	{
		this.updateItem(this.items[item]);
	}
};

Updater.prototype.decreaseSellIn = function(item) {
	if (item.name != 'Sulfuras, Hand of Ragnaros') {
    	item.sell_in = item.sell_in - 1;
    }
};

Updater.prototype.increaseSellIn = function(item) {
	if (item.sell_in < 0) {
		if (item.name != 'Aged Brie') {
			if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
				if (item.quality > 0) {
					if (item.name != 'Sulfuras, Hand of Ragnaros') {
					item.quality = item.quality - 1;
					}
				}
			} else {
				item.quality = item.quality - item.quality;
			}
		} else {
			if (item.quality < 50) {
				item.quality = item.quality + 1;
			}
		}
	}
};

Updater.prototype.updateItem = function(item) {
	this.qualityUpdater.update(item);
    this.decreaseSellIn(item);
    this.increaseSellIn(item);
}

module.exports = Updater;
