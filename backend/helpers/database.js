require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

function connectToDatabase() {
    const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_ATLAS_URI : process.env.NODE_ENV === 'development' ? process.env.MONGODB_LOCAL_URI : undefined;
    const dbName = process.env.NODE_ENV === 'production' ? 'Atlas' : process.env.NODE_ENV === 'development' ? 'Local' : undefined;

    if (!MONGODB_URI || !dbName) {
        throw new Error('Invalid NODE_ENV! Set it to either "production" or "development".');
    }

    mongoose.connect(MONGODB_URI)
        .then(() => console.log(`Connexion à MongoDB ${dbName} réussie !`))
        .catch(() => console.log(`Connexion à MongoDB ${dbName} échouée !`));
}

module.exports = connectToDatabase;