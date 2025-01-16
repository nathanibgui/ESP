const express = require('express');
const mongoose = require('mongoose'); // Ajouter cette ligne
const Rapport = require('../models/Rapport');
const router = express.Router();


// Route pour créer un rapport
router.post('/', async (req, res) => {
    try {
        const rapport = new Rapport(req.body);
        await rapport.save();
        res.status(201).json({ message: 'Rapport créé avec succès', rapport });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du rapport', error: err.message });
    }
});

// Route pour récupérer tous les rapports
router.get('/dddd', async (req, res) => {
    try {
        const rapports = await Rapport.find();
        res.status(200).json(rapports);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des rapports', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { nom, technicien, date } = req.query;

        // Construire dynamiquement le filtre
        const filtre = {};

        // Log du filtre pour vérifier les valeurs passées dans la requête
        console.log('Filtre construit:', req.query);

        if (nom) {
            // Nettoyer les espaces et les retours à la ligne autour du nom
            const nomNettoye = nom.trim().replace(/\n/g, ''); // Supprime les retours à la ligne
            filtre.nom = { $regex: nomNettoye, $options: 'i' }; // Recherche insensible à la casse
        }
        if (technicien) {
            const technicienNettoye = technicien.trim().replace(/\n/g, ''); // Supprime les retours à la ligne
            filtre.technicien = { $regex: technicienNettoye, $options: 'i' }; // Recherche insensible à la casse
        }
        if (date) {
            // Convertir la date passée en paramètre au format ISO
            const dateObjet = new Date(date);
            if (isNaN(dateObjet)) {
                return res.status(400).json({ message: 'Format de date invalide' });
            }
            filtre.date = dateObjet; // Assurez-vous que la date est bien sous forme d'objet Date
        }

        // Log du filtre final avant la requête
        // console.log('Filtre final:', filtre);

        // Récupérer les rapports avec le filtre
        const rapports = await Rapport.find(filtre);

        if (rapports.length === 0) {
            return res.status(404).json({ message: 'Aucun rapport trouvé' });
        }

        res.status(200).json(rapports);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Erreur lors de la récupération des rapports',
            error: err.message,
        });
    }
});


// Route pour rechercher des rapports par nom
router.get('/search', async (req, res) => {
    let { nom } = req.query;

    if (!nom) {
        return res.status(400).json({ message: 'Le paramètre "nom" est requis' });
    }
    // Nettoyage du paramètre "nom" : suppression des espaces inutiles et des retours à la ligne
    nom = nom.trim();

    try {
        const rapports = await Rapport.find({ nom: new RegExp(nom, 'i') }); // Recherche insensible à la casse
        if (rapports.length === 0) {
            return res.status(404).json({ message: `Aucun rapport trouvé pour le nom "${nom}"` });
        }
        res.status(200).json({ message: `${rapports.length} rapport(s) trouvé(s)`, rapports });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche par nom', error: err.message });
    }
});


// Route pour récupérer un rapport spécifique par ID
router.get('/:id', async (req, res) => {
    try {
        const rapport = await Rapport.findById(req.params.id);
        if (!rapport) {
            return res.status(404).json({ message: 'Rapport non trouvé' });
        }
        res.status(200).json(rapport);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération du rapport', error: err.message });
    }
});

// Route pour modifier un rapport existant par ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedRapport = await Rapport.findByIdAndUpdate(id, req.body, {
            new: true, // Renvoie le document mis à jour
            runValidators: true, // Applique les validateurs du modèle
        });

        if (!updatedRapport) {
            return res.status(404).json({ message: `Aucun rapport trouvé avec l'ID "${id}"` });
        }

        res.status(200).json({
            message: 'Rapport mis à jour avec succès',
            rapport: updatedRapport,
        });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du rapport', error: err.message });
    }
});


// Route pour supprimer un rapport existant par ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID non valide' });
    }

    try {
        // Essayer de supprimer le rapport par ID
        const deletedRapport = await Rapport.findByIdAndDelete(id);

        // Si aucun rapport n'est trouvé
        if (!deletedRapport) {
            return res.status(404).json({ message: `Aucun rapport trouvé avec l'ID "${id}"` });
        }

        // Réponse avec succès de la suppression
        res.status(200).json({
            message: 'Rapport supprimé avec succès',
            rapport: deletedRapport,
        });
    } catch (err) {
        // En cas d'erreur
        res.status(500).json({ message: 'Erreur lors de la suppression du rapport', error: err.message });
    }
});

module.exports = router;
