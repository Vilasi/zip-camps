//* THIS IS OUR CAMPGROUND SCHEMA AND MODEL
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
