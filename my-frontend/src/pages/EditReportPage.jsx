import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
//import '../assets/EditReportPage2.css'; // Importation du CSS


function EditReportPage() {
    const { id } = useParams(); // Récupérer l'ID depuis les paramètres de la route
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
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/rapports/${id}`)
            .then(response => setRapport(response.data))
            .catch(error => console.error('Erreur lors de la récupération du rapport :', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRapport((prevRapport) => ({
            ...prevRapport,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/rapports/${id}`, rapport)
            .then(response => {
                console.log('Rapport mis à jour', response);
                navigate('/'); // Rediriger vers la page d'accueil après la modification
            })
            .catch(error => console.error('Erreur lors de la mise à jour :', error));
    };

    return (
        <div>
            <h1>Modifier le Rapport</h1>
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
                        value={rapport.date.substring(0, 10)}
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
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
}

export default EditReportPage;
