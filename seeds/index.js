//*THIS FILE IS FOR SEEDING OUR DATABASE WITH DUMMY DATA
const mongoose = require('mongoose');
const express = require('express');
const Campground = require('../models/campground');

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

//Start by removing everything from the database so that we can seed it fresh
async function seedMany() {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const c = new Campground({
      title: 'test',
      price: 'test',
      description: 'test',
      location: 'test',
    });

    //* Note: Since we're using await, .save() does not need a .then or .exec() tacked on
    await c.save();
  }
}
seedMany();

// seedMany()
//   .then((res) => {
//     console.log('All data removed');
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log('Error removing data in seeds/index.js');
//     console.log(err);
//   });
