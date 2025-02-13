import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profil = () => {
    const auth = useContext(AuthContext);

    if (!auth || !auth.user) {
        return <Navigate to="/login" />;
    }

    // Exemple de bières favorites (tu pourras remplacer ça par des données réelles)
    const favoriteBeers = [
        { id: 1, name: "IPA", description: "Une IPA houblonnée et fruitée." },
        { id: 2, name: "Stout", description: "Une bière noire riche et crémeuse." },
        { id: 3, name: "Pilsner", description: "Légère et rafraîchissante." },
        { id: 4, name: "Blonde", description: "Douce et maltée avec une touche de miel." },
    ];

    return (
        <div className="d-flex justify-content-center align-items-start pt-5">
            <div className="p-4 w-75">
                <h1 className="mb-4 text-center">Bienvenue sur votre profil, {auth.user.firstname} !</h1>
                
                <div className="mb-4 text-center">
                    <p><strong>Email:</strong> {auth.user.email}</p>
                    <p><strong>Rôle:</strong> {auth.user.role}</p>
                </div>

                <div className="mt-5">
                    <h2 className="mb-4">Vos Favoris</h2>
                    <div className="row">
                        {favoriteBeers.map(beer => (
                            <div key={beer.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4">
                                <div 
                                    className="card shadow-sm h-100 w-100 d-flex flex-column justify-content-between text-center p-3"
                                    style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{beer.name}</h5>
                                        <p className="card-text small">{beer.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profil;
