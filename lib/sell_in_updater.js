function SellinUpdater() {
}

SellinUpdater.prototype.update = function(item) {
	this.decreaseSellIn(item);
    this.updateQuality(item);
};

SellinUpdater.prototype.canSellinBeAffected = function(item) {
	return item.name != 'Sulfuras, Hand of Ragnaros';
};

SellinUpdater.prototype.decreaseSellIn = function(item) {
	if (this.canSellinBeAffected(item)) {
		item.sell_in = item.sell_in - 1;
    }
};

SellinUpdater.prototype.updateQuality = function(item) {
};

module.exports = SellinUpdater;