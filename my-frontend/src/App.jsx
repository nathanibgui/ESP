import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.jsx'; // Page d'accueil
import AddReportPage from './pages/AddReportPage.jsx'; // Page de création de rapport
import EditReportPage from './pages/EditReportPage.jsx'; // Page de modification de rapport

function App() {
    const [count, setCount] = useState(0);

    return (
        <Router>
            <div className="navbar">
                {/* Menu de navigation */}
                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/add-report" className="nav-link">Ajouter un rapport</Link>
            </div>

            <Routes>
                {/* Définition des différentes routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/add-report" element={<AddReportPage />} />
                <Route path="/edit-report/:id" element={<EditReportPage />} />
            </Routes>
        </Router>
    );
}

export default App;
