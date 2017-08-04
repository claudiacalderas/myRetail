var mongoose = require('mongoose');

// Item in Art Portfolio Schema
var CatalogSchema = mongoose.Schema({
  CatalogEntryView : []
});

module.exports = mongoose.model('catalog', CatalogSchema, 'catalog');
