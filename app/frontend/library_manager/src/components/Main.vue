<script setup lang="js">
import {useAuthStore} from '../store/auth.js';
import {computed, onMounted, ref} from 'vue';
import axios from "axios";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const books = ref()

onMounted(async () => {
  axios.get('http://localhost:3000/protected/books', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      user_id: userId.value
    }
  }).then(response => {
    books.value = response.data
    console.log(books.value)
  })
      .catch(error => {
        console.log(error)
      })
})

function onDelete(itemId) {
  axios.delete(`http://localhost:3000/protected/books`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      book_id: itemId
    }
  }).then(response => {
    books.value = books.value.filter(book => book.id !== itemId)
  })
      .catch(error => {
        console.log(error)
      })
}
</script>

<template>
  <BTable :items="books" :fields="['title', 'author', 'date', { key: 'actions', label: 'Actions' }]">
    <template #cell(actions)="row">
      <BButton class="button" variant="danger" @click="onDelete(row.item.id)">Delete</BButton>
    </template>
  </BTable>
</template>

<style scoped>

.button {
  margin-right: 10px;
}

</style>