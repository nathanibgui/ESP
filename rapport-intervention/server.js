require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Initialisation de l'application
const app = express();

// Validation de la configuration
if (!process.env.MONGO_URI) {
    console.error('Erreur : La configuration MongoDB est incomplète.');
    process.exit(1);
}

// Middlewares
app.use('*', cors({
    origin: '*',
}));
app.use(bodyParser.json());

// Connexion à MongoDB
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@money.uldl9rx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err.message);
        process.exit(1);
    });


// Routes
const rapportRoutes = require('./routes/rapportRoutes');
app.use('/api/rapports', rapportRoutes);

// Route principale
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'API de rapports d\'intervention',
        status: 'En ligne',
        endpoints: {
            rapports: '/api/rapports',
        },
    });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
