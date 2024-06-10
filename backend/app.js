require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user.js");
const bookRoutes = require("./routes/book.js");
const path = require('path');

const app = express();

const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_ATLAS_URI : process.env.NODE_ENV === 'development' ? process.env.MONGODB_LOCAL_URI : undefined;
const dbName = process.env.NODE_ENV === 'production' ? 'Atlas' : process.env.NODE_ENV === 'development' ? 'Local' : undefined;

if (!MONGODB_URI || !dbName) {
  throw new Error('Invalid NODE_ENV! Set it to either "production" or "development".');
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connexion à MongoDB ${dbName} réussie !`))
  .catch(() => console.log(`Connexion à MongoDB ${dbName} échouée !`));

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