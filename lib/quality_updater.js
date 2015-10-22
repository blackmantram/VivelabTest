function QualityUpdater() {
}

QualityUpdater.prototype.update = function(item) {
	this.decreaseQuality(item);
    this.increaseQuality(item);
};

QualityUpdater.prototype.isARegularItem = function(item) {
	return item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert';
};

QualityUpdater.prototype.canQualityBeDecreased = function(item) {
	return item.quality > 0 && this.canQualityBeAfected(item);
};

QualityUpdater.prototype.canQualityBeAfected = function(item) {
	return item.name != 'Sulfuras, Hand of Ragnaros';
};

QualityUpdater.prototype.canQualityBeIncreased = function(item) {
	return item.quality < 50;
};

QualityUpdater.prototype.getQualityIncreaseRate = function(item) {
	rate = 1;
	if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
		if (item.sell_in < 11) {
			if (item.quality < 50) {
				rate++;
			}
		}
		if (item.sell_in < 6) {
			if (item.quality < 50) {
				rate++;
			}
		}
	}
	return rate;
}

QualityUpdater.prototype.decreaseQuality = function(item) {
	if (this.isARegularItem(item) && this.canQualityBeDecreased(item)) {
		item.quality = item.quality - 1;
	}
};

QualityUpdater.prototype.increaseQuality = function(item) {
	if (!this.isARegularItem(item) && this.canQualityBeIncreased(item)) {
		item.quality = this.getQualityIncreaseRate(item);
	}
};

module.exports = QualityUpdater;