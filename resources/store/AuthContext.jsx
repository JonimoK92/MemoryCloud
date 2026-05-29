import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);
    async function login(email, password) {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // j'envoie du json
                Accept: "application/json", // je reçois du json
            },
            body: JSON.stringify({ email, password }), // je transforme le js en json
        });

        const result = await response.json();

        if (response.ok) {
            const { user, token } = result.data
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            setToken(token);
            setUser(user);
            alert(result.message);
        } else {
            alert(result.message);
            return null;
        }
        return result.data;
    }
    async function logout() {
        const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");

            setUser(null);
            setToken(null);
        }
        return result;
    }

    async function register(name, email, password) {
        if (!name || !email || !password) {
            alert("Champs manquants");
            return;
        }
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
            return null;
        }
        return result.data;
    }
    const value = {
        user,
        token,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

//const value = useMemo(() => ({
//   user,
//   token,
//   loading,
//   setUser,
//   setToken,
//}), [user, token, loading]);

// async function login(email, password) {
//try {
//       const response = await axios.post("/api/login", {
//           email,
//          password
//      });
//
//     const { token, user, message } = response.data;
//
//     localStorage.setItem("authToken", token);
//    localStorage.setItem("user", JSON.stringify(user));

//    setToken(token);
//   setUser(user);
//
//    alert(message);
//
//   return response.data;

//  } catch (error) {
//  if (error.response) {
//      // Erreur venant de Laravel (401, 422, etc.)
//     alert(error.response.data.message || "Erreur de connexion");
//  return error.response.data;
//  } else {
// Erreur réseau
//   alert("Erreur serveur");
// }
// }
//}