function Updater() {
	this.items = [];
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

Updater.prototype.isARegularItem = function(item) {
	return item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert';
};

Updater.prototype.canQualityBeDecreased = function(item) {
	return item.quality > 0 && this.canQualityBeAfected(item);
};

Updater.prototype.canQualityBeAfected = function(item) {
	return item.name != 'Sulfuras, Hand of Ragnaros';
};

Updater.prototype.canQualityBeIncreased = function(item) {
	return item.quality < 50;
};

Updater.prototype.decreaseQuality = function(item) {
	if (this.isARegularItem(item)) {
		if (this.canQualityBeDecreased(item)) {
			item.quality = item.quality - 1;
		}
	}
};

Updater.prototype.increaseQuality = function(item) {
	if (!this.isARegularItem(item)) {
		if (this.canQualityBeIncreased(item)) {
			item.quality = item.quality + 1;

			if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
				if (item.sell_in < 11) {
					if (item.quality < 50) {
						item.quality = item.quality + 1
					}
				}
				if (item.sell_in < 6) {
					if (item.quality < 50) {
						item.quality = item.quality + 1
					}
				}
			}
		}
	}
};

Updater.prototype.updateItem = function(item) {
	this.decreaseQuality(item);
    this.increaseQuality(item);


    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sell_in = item.sell_in - 1;
    }
    if (item.sell_in < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
  	}
}

module.exports = Updater;
