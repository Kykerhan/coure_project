const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PersonSchema = new Schema({
  name: String,
  surname: String,
  position: String,
  phone: String,
  email: String,
  address: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', PersonSchema);
