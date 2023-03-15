//*THIS FILE IS FOR SEEDING OUR DATABASE WITH DUMMY DATA
const mongoose = require('mongoose');
const express = require('express');
const Campground = require('../models/campground');
const cities = require('./cities');
// const seedHelper = require('./seedHelpers');
const { descriptors, places } = require('./seedHelpers');
// console.log(cities);

//*Connect to db

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zip-camps');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().catch((err) => console.log(err));

//* Mongoose Error Logging
mongoose.connection.on('error', (err) => {
  logError(err);
});

mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

//* Seeds the database - generating 50 random things
async function seedMany() {
  //Start by removing everything from the database so that we can seed it fresh
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random999 = Math.floor(Math.random() * 1000);
    const randomDescriptor =
      descriptors[Math.floor(Math.random() * descriptors.length)];
    const randomPlace = places[Math.floor(Math.random() * places.length)];

    const camp = new Campground({
      title: `${randomDescriptor} ${randomPlace}`,
      price: 'test price',
      description: `Null Description`,
      location: `${cities[random999].city}, ${cities[random999].state}`,
    });

    //* Previous version with title and description swapped
    // const camp = new Campground({
    //   title: `Campground ${i + 1}`,
    //   price: 'test',
    //   description: `${randomDescriptor} ${randomPlace}`,
    //   location: `${cities[random999].city}, ${cities[random999].state}`,
    // });

    //* Note: Since we're using await, .save() does not need a .then or .exec() tacked on
    await camp.save();
  }
}
seedMany().then(() => {
  //* Closes the connection at the end of creating the seed data
  mongoose.connection.close();
});
