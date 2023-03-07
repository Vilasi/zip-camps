const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const url = require('url');

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
