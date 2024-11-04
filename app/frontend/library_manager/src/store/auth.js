// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),

  actions: {
    async login(username, password) {
        const response = await axios.post('http://localhost:3000/auth/login', { username, password });
        if (response.status !== 200) {
          throw new Error('Login failed');
        }
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);

        // Configurer le token pour les requêtes suivantes
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },

    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },

    checkAuth() {
      const token = localStorage.getItem('token');
      if (token && !this.isTokenExpired(token)) {
        this.isAuthenticated = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        this.logout();
      }
    },

    isTokenExpired(token) {
        try {
          const decoded = jwtDecode(token);
          return decoded.exp * 1000 < Date.now();
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
    },
  },
});