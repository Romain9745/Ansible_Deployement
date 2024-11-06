<script setup>

import router from "@/router.js";

function goToLibrary() {
  router.push({name: "home"})
}

function goToAddBook() {
  router.push({name: "addBook"})
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
    <ul class="navbar-nav">
      <BButton @click="goToLibrary" class="m-3">Library</BButton>
      <BButton @click="goToAddBook" class="m-3"> Add book</BButton>
    </ul>
  </nav>
</template>

<style scoped>

</style>