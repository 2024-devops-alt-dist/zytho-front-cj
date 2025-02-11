import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profil = () => {
    const auth = useContext(AuthContext);

    if (!auth || !auth.user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Bienvenue sur votre profil, {auth.user.email} !</h1>
            <p>Votre rôle est : {auth.user.role}</p>
        </div>
    );
};

export default Profil;
