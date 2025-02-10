import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: { email: string } | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const hardcodedUser = {
        email: "test@test.com",
        password: "123456789"
    };

    // Récupération user depuis localStorage
    const storedUser = localStorage.getItem("user");

    // Si user stocké dans localStorage, le définir comme l'utilisateur actuel
    const [user, setUser] = useState<{ email: string } | null>(
        storedUser ? JSON.parse(storedUser) : null
    );

    // Connexion
    const login = (email: string, password: string): boolean => {
        if (email === hardcodedUser.email && password === hardcodedUser.password) {
            const user = { email };
            setUser(user);  // Màj état user
            localStorage.setItem("user", JSON.stringify(user));  // Stocker l'user localStorage
            navigate("/profil");
            return true;
        }
        return false;
    };

    // Déconnexion
    const logout = () => {
        setUser(null); 
        localStorage.removeItem("user");  // Supprimer user localStorage
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
