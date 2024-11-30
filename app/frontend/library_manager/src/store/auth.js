// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
      userId: null,
  }),

  actions: {
    async login(username, password) {
        const response = await axios.post('http://localhost:3000/auth/login', { username, password });
        if (response.status !== 200) {
          throw new Error('Login failed');
        }
        this.isAuthenticated = true;
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        const decoded = jwtDecode(this.token);
        this.userId = decoded.user.id;
        // Configurer le token pour les requêtes suivantes
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },

    logout() {
      this.isAuthenticated = false;
      this.userId = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

    },

    checkAuth() {
      const token = localStorage.getItem('token');
      if (token && !this.isTokenExpired(token)) {
        this.isAuthenticated = true;
        const decoded = jwtDecode(token);
        this.userId = decoded.user.id;
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