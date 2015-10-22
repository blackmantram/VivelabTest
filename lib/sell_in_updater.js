function SellinUpdater() {
}

SellinUpdater.prototype.update = function(item) {
	this.decreaseSellIn(item);
    this.increaseSellIn(item);
};

SellinUpdater.prototype.decreaseSellIn = function(item) {
	if (item.name != 'Sulfuras, Hand of Ragnaros') {
    	item.sell_in = item.sell_in - 1;
    }
};

SellinUpdater.prototype.increaseSellIn = function(item) {
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

module.exports = SellinUpdater;