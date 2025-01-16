import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Pour générer des tableaux

function HomePage() {
    const [rapports, setRapports] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rapports')
            .then(response => setRapports(response.data))
            .catch(error => console.error("Il y a eu une erreur : ", error));
    }, []);

    const deleteReport = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/rapports/${id}`);
            setRapports(rapports.filter(rapport => rapport._id !== id)); // Mettre à jour la liste des rapports
        } catch (error) {
            console.error("Erreur lors de la suppression du rapport :", error);
        }
    };

    // Fonction pour générer le PDF pour un rapport spécifique
    const generatePDF = (rapport) => {
        const doc = new jsPDF();

        // Titre
        doc.setFontSize(18);
        doc.text("Rapport d'Intervention", 20, 20);

        // Données du rapport sous forme de tableau
        const tableData = [
            ['Nom', rapport.nom],
            ['Adresse', rapport.adresse],
            ['Date', new Date(rapport.date).toLocaleDateString()],
            ['Heure d\'arrivée', rapport.heureArrivee],
            ['Heure de départ', rapport.heureDepart],
            ['Technicien', rapport.technicien],
            ['Lieu d\'intervention', rapport.lieuxIntervention],
            ['Niveau d\'infestation', rapport.niveauInfestation],
            ['Type de nuisibles', rapport.typeNuisibles],
            ['État initial', rapport.etatInitial],
            ['Travaux réalisés', rapport.travauxRealises],
            ['Travaux à prévoir', rapport.travauxPrevoir]
        ];

        // Ajouter le tableau dans le PDF
        doc.autoTable({
            head: [["Rapport d'intervention : " + rapport._id, '']],
            body: tableData,
        });

        // Sauvegarder le fichier PDF
        doc.save(`rapport-intervention-${rapport._id}.pdf`);
    };

    return (
        <div>
            {/* Header */}
            <header style={headerStyle}>
                <h1 style={{ margin: 0 }}>Gestion des Rapports</h1>
                <nav>
                    <Link to="/" style={linkStyle}>Accueil</Link> |
                    <Link to="/add-report" style={linkStyle}>Ajouter un Rapport</Link>
                </nav>
            </header>

            {/* Tableau des Rapports */}
            <div style={tableContainerStyle}>
                <h2>Liste des Rapports</h2>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Technicien</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rapports.map(rapport => (
                        <tr key={rapport._id}>
                            <td>{rapport.nom}</td>
                            <td>{rapport.technicien}</td>
                            <td>{new Date(rapport.date).toLocaleDateString()}</td>
                            <td>
                                {/* Lien pour la modification */}
                                <Link to={`/edit-report/${rapport._id}`} style={{ marginRight: '10px' }}>
                                    <i className="fa fa-edit" style={iconStyle}></i>
                                </Link>
                                {/* Bouton pour supprimer */}
                                <button
                                    onClick={() => deleteReport(rapport._id)}
                                    style={iconButtonStyle}>
                                    <i className="fa fa-trash" style={iconStyle}></i>
                                </button>
                                {/* Icône pour générer le PDF */}
                                <button
                                    onClick={() => generatePDF(rapport)}
                                    style={iconButtonStyle}>
                                    <i className="fa fa-file" style={iconStyle}></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Styles pour la page
const headerStyle = {
    backgroundColor: '#282c34',
    padding: '10px 20px',
    color: 'white',
    textAlign: 'center',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0 10px',
};

const tableContainerStyle = {
    margin: '20px',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const iconStyle = {
    fontSize: '20px',
    color: '#007bff',
};

const iconButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
};

export default HomePage;
