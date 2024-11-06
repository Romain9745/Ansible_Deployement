<script setup lang="js">
import {computed, ref} from 'vue';
import axios from "axios";
import {useAuthStore} from "@/store/auth.js";
import Navbar from "@/components/Navbar.vue";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const selectedItem = ref('2');
const searchText = ref('');
const booksFound = ref([]);
const isLoading = ref(false);

function search() {
  if(searchText.value === '') {
    alert('Please enter a search term')
    return
  }
  isLoading.value = true
  let valueToSearch = searchText.value.replace(/\s+/g, '+')
  if (selectedItem.value === '1') {
    searchByAuthor(valueToSearch)
  } else {
    searchByTitle(valueToSearch)
  }
}

function searchByTitle(title) {
  axios.get('http://localhost:3000/protected/findBooks', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      title: title
    }
  }).then(response => {
    booksFound.value = response.data
    if(booksFound.value.length === 0) {
      alert('No books found')
    }
  })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        isLoading.value = false
      })
}

function searchByAuthor(author) {
  axios.get('http://localhost:3000/protected/findBooks', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      author: author
    }
  }).then(response => {
    booksFound.value = response.data
    console.log(booksFound.value)
  })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        isLoading.value = false
      })
}

function addBookToLibrary(book) {
  console.log(book.title, book.author[0], book.publish_date)
  axios.post('http://localhost:3000/protected/books', {
        title: book.title,
        author: book.author[0],
        publish_date: book.publish_date
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          user_id: userId.value
        }
      }
  ).then(response => {
    console.log(response)
  })
      .catch(error => {
        console.log(error)
      })
}
</script>

<template>
  <Navbar/>
  <main class="d-flex flex-column align-items-center justify-content-start vh-100">
    <h1>Add book</h1>
    <div class="d-flex w-100 mb-3">
      <select v-model="selectedItem" class="form-select me-2 w-25">
        <option value="1">Author</option>
        <option value="2">Title</option>
      </select>
      <BInput class="w-75" placeholder="your search" v-model="searchText"></BInput>
      <BButton @click="search" class="btn btn-primary ms-2">Search</BButton>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <BTable :items="booksFound" :fields="['title', 'author', 'publish_date', { key: 'actions', label: 'Action' }]" class="w-100">
        <template #cell(actions)="row">
          <BButton class="btn btn-primary" @click="addBookToLibrary(row.item)">Add to library</BButton>
          <i class="bi bi-plus"></i>
        </template>
      </BTable>
    </div>
  </main>
</template>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>