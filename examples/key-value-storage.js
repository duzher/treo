// This example shows how to use treo for simple string key/value storage.
// Often you don't need objects and indexes, and just need simple async
// localStorage. With treo-websql it can be used in all modern browsers.

var treo = require('treo');
var websql = require('treo/plugins/treo-websql');
var fn = console.log.bind(console); // use it as callback

// define schema with one storage with string key/values
var schema = treo.schema()
  .version(1)
  .addStore('storage');

// create db
var db = treo('key-value-storage', schema)
  .use(websql()); // support legacy browsers

// save link to storage
var store = db.store('storage');

// put values
store.put('foo', 'value 1', fn);
store.put('bar', 'value 2', fn);
store.put('baz', 'value 3', fn);

// get value by key
store.get('bar', fn); // 'value 2'

// get all
store.all(fn); // ['value 1', 'value 2', 'value 3']

// batch more records
store.batch([
  { 'key4': 'value 4' },
  { 'key5': 'value 5' },
  { 'key6': 'value 6' },
], fn);

// count
store.count(fn); // 6

// close db
db.close(fn);
