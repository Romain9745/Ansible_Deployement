<script setup>
import { useAuthStore } from '../store/auth.js';
import { computed } from 'vue';

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<template>
  <h1>Hello world {{userId}}</h1>
  <h1>{{isAuthenticated}}</h1>
</template>

<style scoped>

</style>