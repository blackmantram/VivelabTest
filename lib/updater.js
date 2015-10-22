var QualityUpdater = require('../lib/quality_updater.js');
var SellinUpdater = require('../lib/sell_in_updater.js');

function Updater() {
	this.items = [];
	this.qualityUpdater = new QualityUpdater();
	this.sellinUpdater = new SellinUpdater();
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

Updater.prototype.updateItem = function(item) {
	this.sellinUpdater.update(item);
	this.qualityUpdater.update(item);
}

module.exports = Updater;
