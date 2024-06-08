require('dotenv').config({ path: '.env.local' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user.js");
const bookRoutes = require("./routes/book.js");
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;