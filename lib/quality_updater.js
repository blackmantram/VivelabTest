function QualityUpdater() {
}

QualityUpdater.prototype.update = function(item) {
	this.increaseQuality(item);
	this.decreaseQuality(item);
};

QualityUpdater.prototype.canQualityBeDecreased = function(item) {
	return item.name != 'Aged Brie' && item.name != 'Sulfuras, Hand of Ragnaros';
};

QualityUpdater.prototype.canQualityBeIncreased = function(item) {
	return item.name == 'Aged Brie' || item.name == 'Backstage passes to a TAFKAL80ETC concert';
};

QualityUpdater.prototype.getQualityIncreaseRate = function(item) {
	rate = 1;
	if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
		if (item.sell_in < 10) {
			rate++;
		}
		if (item.sell_in < 5) {
			rate++;
		}
	}
	return rate;
}

QualityUpdater.prototype.getQualityDecreaseRate = function(item) {
	rate = 0;
	if (item.name != 'Backstage passes to a TAFKAL80ETC concert')
	{
		rate++;	
		if (item.name == 'Conjured')
			rate++;
	}
	if (item.sell_in <= 0)
	{
		rate++;
		if (item.name == 'Backstage passes to a TAFKAL80ETC concert')
		{
			rate = item.quality;	
		}
	}
	return rate;
};

QualityUpdater.prototype.increaseQuality = function(item) {
	if (this.canQualityBeIncreased(item)) {
		item.quality = item.quality + this.getQualityIncreaseRate(item);
		if (item.quality > 50) item.quality = 50;
	}
};

QualityUpdater.prototype.decreaseQuality = function(item) {
	if (this.canQualityBeDecreased(item)) {
		item.quality = item.quality - this.getQualityDecreaseRate(item);
		if (item.quality<0) item.quality = 0;
	}
};

module.exports = QualityUpdater;