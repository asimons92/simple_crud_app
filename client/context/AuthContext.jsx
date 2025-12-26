import { createContext, useState, useContext, useEffect } from 'react';
import { isTokenExpired } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            if (!isTokenExpired(savedToken)) {
                const payload = JSON.parse(atob(savedToken.split('.')[1]));
                setUser(payload);
            }
        }
        setLoading(false);
    }, []);

      const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        if (!isTokenExpired(newToken)) {
            const payload = JSON.parse(atob(newToken.split('.')[1]));
            setUser(payload);
        }
      };

      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
          {/* We don't render children until we've checked localStorage */}
          {!loading && children}
        </AuthContext.Provider>
      );

}

export const useAuth = () => useContext(AuthContext);
