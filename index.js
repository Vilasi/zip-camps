const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const url = require('url');
//* Import Models
const Campground = require('./models/campground.js');
// const { mainModule } = require('process');

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

app.get('/', (req, res) => {
  //   res.send('Hello World');
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({
    title: 'Cherry Creek',
    price: '50',
    description: 'A nice little cabin in the heart of the allegheny.',
    location: 'Allegheny National Forest Cherry Creek Dark Sky Preserve',
  });

  await camp.save();
  res.send(camp);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
