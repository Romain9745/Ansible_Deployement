<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* Set html and body to full height */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Ensure main fills the viewport */
main {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers content vertically */
  align-items: center;     /* Centers content horizontally */
  min-height: 100vh;
  width: 100%;
}


</style>
