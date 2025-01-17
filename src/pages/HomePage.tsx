import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePage.css';
import { Beer } from '../interfaces/beer';
import { getBeers } from '../services/api';

const HomePage: React.FC = () => {
    // État pour les types de bières
    const [types, setTypes] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBeerTypes();
    }, []);

    const fetchBeerTypes = async () => {
        try {
            const response = await getBeers();
            // Extraire les types uniques des bières
            const uniqueTypes = [...new Set(response.data.map((beer: Beer) => beer.type))];
            setTypes(uniqueTypes);
        } catch (err) {
            console.error('Erreur lors de la récupération des types de bières :', err);
            setError('Impossible de charger les types de bières pour le moment.');
        }
    };

    return (
        <>
            <div className="homepage">
                {/* Bannière */}
                <header className="banner d-flex align-items-center justify-content-center text-center">
                    <div className="banner-content">
                        <h1 className="display-4 text-white">Bienvenue dans le Monde des Bières Artisanales</h1>
                        <p className="lead text-white">
                            Découvrez, explorez et savourez les meilleures bières du monde entier.
                        </p>
                        <Link to="/beers" className="btn btn-two mt-5">
                            Découvrir les Bières {">"}
                        </Link>
                    </div>
                </header>
            </div>

            <section className="categories py-5">
                <div className="mx-5 px-5">
                    <h2 className="text-center mb-4">Nos Catégories de Bières</h2>
                    {error ? (
                        <p className="text-center text-danger">{error}</p>
                    ) : (
                        <div className="d-flex overflow-auto categories-list py-1">
                            {types.map((type, index) => (
                                <Link key={index} to={`/beers?category=${type}`} className="category-card-link">
                                    <div className="category-card me-3">
                                        <div className="card-img-container" style={{ backgroundImage: `url('src/assets/pictures/bannerpicture2.jpg')` }}>
                                            <div className="card-overlay">
                                                <h5 className="card-title custom-title-color">{type}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container text-center my-3">
                    <h2>Rejoignez notre Communauté</h2>
                    <p className="lead">Inscrivez-vous à notre newsletter pour recevoir des informations sur nos dernières bières et promotions.</p>
                    
                    <form>
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <input type="email" className="form-control me-2" placeholder="Votre email" required style={{ maxWidth: '300px' }}/>
                            <button type="submit" className="btn btn-three">S'inscrire</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default HomePage;
