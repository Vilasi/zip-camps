const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const url = require('url');
//* Import Models
const Campground = require('./models/campground.js');
// const { mainModule } = require('process');
//* Import Seed Data

//*Connect to Mongoose
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zip-camps');
}

//* Mongoose Error Logging
mongoose.connection.on('error', (err) => {
  logError(err);
});

mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

//* Assign Express to app
const app = express();

//* Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//* Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//* Set POST Body Parser
app.use(express.urlencoded({ extended: true }));

//* Set JSON parser
app.use(express.json());

//* Set Method Override
app.use(methodOverride('_method'));

const PORT = 3000;

//! Routes
app.get('/', (req, res) => {
  //   res.send('Hello World');
  res.render('home');
});

//* Route - Index
app.get('/campgrounds', async (req, res) => {
  const camps = await Campground.find({});

  res.render('campgrounds/index', { camps });
});

app.post('/campgrounds', async (req, res) => {
  console.log(req.body.campground);
  const newCamp = new Campground(req.body.campground);
  await newCamp.save();

  //* Redirect to our newly created campground (via the show route `/campground/:id`)
  res.redirect(`/campgrounds/${newCamp._id}`);

  // const {title, location} = req.body;
  // const newCamp = new Campground({
  //   title: title,
  //   description:

  // })
});

//* Route - Make New
app.get('/campgrounds/new', async (req, res) => {
  res.render('campgrounds/new');
});

//* Route - Show
app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);

  res.render('campgrounds/show', { camp });
});

//* Route - Edit
app.get('/campgrounds/:id/edit', async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);

  res.render('campgrounds/edit', { camp });
});

//* Route - Patch
app.patch('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const camp = req.body.campground;
  console.log(camp);

  await Campground.findByIdAndUpdate(id, camp, {
    new: true,
  });

  res.redirect('/campgrounds');
});

//* Route - Delete
app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);

  res.redirect('/campgrounds');
});

// app.get('/makecampground', async (req, res) => {
//   const camp = new Campground({
//     title: 'Cherry Creek',
//     price: '50',
//     description: 'A nice little cabin in the heart of the allegheny.',
//     location: 'Allegheny National Forest Cherry Creek Dark Sky Preserve',
//   });

//   await camp.save();
//   res.send(camp);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
