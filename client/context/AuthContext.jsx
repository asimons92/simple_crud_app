import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
        }
        setLoading(false);
      }, []);

      const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      };

      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
      };

      return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
          {/* We don't render children until we've checked localStorage */}
          {!loading && children}
        </AuthContext.Provider>
      );

}

export const useAuth = () => useContext(AuthContext);
