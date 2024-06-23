require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

function connectToDatabase() {
    const env = process.env.NODE_ENV;
    const localURI = process.env.MONGODB_LOCAL_URI;
    const atlasURI = `mongodb+srv://${process.env.ATLAS_DB_USERNAME}:${process.env.ATLAS_DB_PASSWORD}@${process.env.ATLAS_DB_CLUSTER}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`;

    const MONGODB_URI = env === 'production' ? atlasURI : env === 'development' ? localURI : undefined;
    const dbName = env === 'production' ? 'Atlas' : env === 'development' ? 'Local' : undefined;

    if (!MONGODB_URI || !dbName) {
        throw new Error('Invalid NODE_ENV! Set it to either "production" or "development".');
    }

    mongoose.connect(MONGODB_URI)
        .then(() => console.log(`Connexion à MongoDB ${dbName} réussie !`))
        .catch(() => console.log(`Connexion à MongoDB ${dbName} échouée !`));
}

module.exports = connectToDatabase;