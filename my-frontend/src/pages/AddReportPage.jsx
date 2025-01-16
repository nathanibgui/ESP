import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../assets/AddReportPage2.css';  // Assurez-vous que le chemin d'accès est correct


function AddReportPage() {
    const [rapport, setRapport] = useState({
        nom: '',
        adresse: '',
        date: '',
        heureArrivee: '',
        heureDepart: '',
        technicien: '',
        lieuxIntervention: '',
        niveauInfestation: '',
        typeNuisibles: '',
        etatInitial: '',
        travauxRealises: '',
        travauxPrevoir: ''
    });

    const navigate = useNavigate();  // Initialisation du hook de navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRapport((prevRapport) => ({
            ...prevRapport,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/rapports', rapport)
            .then(response => {
                console.log('Rapport créé', response);
                navigate('/');  // Redirection vers la page d'accueil après l'ajout
            })
            .catch(error => console.error('Erreur lors de la création :', error));
    };

    return (
        <div>
            <h1>Ajouter un Rapport</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input
                        type="text"
                        name="nom"
                        value={rapport.nom}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Adresse :
                    <input
                        type="text"
                        name="adresse"
                        value={rapport.adresse}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Date :
                    <input
                        type="date"
                        name="date"
                        value={rapport.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Heure d'arrivée :
                    <input
                        type="time"
                        name="heureArrivee"
                        value={rapport.heureArrivee}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Heure de départ :
                    <input
                        type="time"
                        name="heureDepart"
                        value={rapport.heureDepart}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Technicien :
                    <input
                        type="text"
                        name="technicien"
                        value={rapport.technicien}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Lieu d'intervention :
                    <input
                        type="text"
                        name="lieuxIntervention"
                        value={rapport.lieuxIntervention}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Niveau d'infestation :
                    <input
                        type="text"
                        name="niveauInfestation"
                        value={rapport.niveauInfestation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Type de nuisibles :
                    <input
                        type="text"
                        name="typeNuisibles"
                        value={rapport.typeNuisibles}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    État initial :
                    <input
                        type="text"
                        name="etatInitial"
                        value={rapport.etatInitial}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Travaux réalisés :
                    <textarea
                        name="travauxRealises"
                        value={rapport.travauxRealises}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Travaux à prévoir :
                    <textarea
                        name="travauxPrevoir"
                        value={rapport.travauxPrevoir}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Ajouter le rapport</button>
            </form>
        </div>
    );
}

export default AddReportPage;
