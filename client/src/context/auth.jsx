/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import Refresh from '../components/Refresh/Refresh';
import {jwtDecode} from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função de renovação de token
  const renewToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  
    // Se o token estiver perto de expirar (em menos de 15 minutos), faz a renovação
    if (decoded.exp - currentTime < 15 * 60) {
      try {
        const response = await api.post('/refresh-token', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log(token); // Verifica se o token é válido

        const newToken = response.data.token;
  
        localStorage.setItem('token', newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  
        console.log('Token renewed successfully');
      } catch (error) {
        console.error('Failed to renew token', error);
      }
    }
  };
  

  // Função para carregar dados do storage e configurar token nos headers
  const loadingStorageData = async () => {
    const storagedToken = localStorage.getItem('token');
    const storagedUser = localStorage.getItem('user');
  
    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;  // Aqui
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    loadingStorageData();
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      renewToken(); // Certifique-se de chamar renewToken após a definição
    }

      // Checar o token a cada 10 minutos
  const interval = setInterval(() => {
    renewToken();
  }, 10 * 60 * 1000); // Checa a cada 10 minutos
  
  return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  if (loading) {
    return <Refresh />;
  }

  const signIn = async (email, senha) => {
    const response = await api.post('/auth', {
      email,
      senha,
    });
  
    if (response.data.error) {
      alert(response.data.error);
    } else {
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;  // Aqui
    }
    console.log(response);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        renewToken, // Expõe a função renewToken, se necessário
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
