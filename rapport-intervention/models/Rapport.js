const mongoose = require('mongoose');

// Définir le schéma pour un rapport
const rapportSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    heureArrivee: {
        type: String,
        required: true
    },
    heureDepart: {
        type: String,
        required: true
    },
    technicien: {
        type: String,
        required: true
    },
    lieuxIntervention: {
        type: String,
        required: true
    },
    niveauInfestation: {
        type: String,
        required: true
    },
    typeNuisibles: {
        type: String,
        required: true
    },
    etatInitial: {
        type: String,
        required: true
    },
    travauxRealises: {
        type: String,
        required: true
    },
    travauxPrevoir: {
        type: String,
        required: true
    }
});

// Créer le modèle basé sur le schéma
const Rapport = mongoose.model('Rapport', rapportSchema);

module.exports = Rapport;
