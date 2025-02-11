import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../interfaces/users";

interface AuthContextType {
    user: { email: string, role: 'admin' | 'user' } | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const hardcodedUsers: Users[] = [
        { id: 1, firstname: "Admin", email: "admin@gmail.com", password: "123456789", role: 'admin' },
        { id: 2, firstname: "User", email: "user@gmail.com", password: "123456789", role: 'user' }
    ];

    // Récupération user depuis localStorage
    const storedUser = localStorage.getItem("user");

    // Si user stocké dans localStorage, le définir comme l'utilisateur actuel
    const [user, setUser] = useState<{ email: string, role: 'admin' | 'user' } | null>(
        storedUser ? JSON.parse(storedUser) : null
    );

    // Connexion
    const login = (email: string, password: string): boolean => {
        const user = hardcodedUsers.find(user => user.email === email && user.password === password);
        if (user) {
            // Ici, on met à jour le user avec son rôle 'admin' ou 'user'
            setUser({ email, role: user.role });
            localStorage.setItem("user", JSON.stringify({ email, role: user.role }));
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
