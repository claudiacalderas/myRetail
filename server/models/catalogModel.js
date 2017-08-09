var mongoose = require('mongoose');

// Catalog Schema
var CatalogSchema = mongoose.Schema({
  CatalogEntryView : []
});

module.exports = mongoose.model('catalog', CatalogSchema, 'catalog');
