
<template>
  <main class="d-flex justify-content-center align-items-center vh-100">
    <div class="container">
      <h2 class="text-center mb-4">Sign Up</h2>
      <BForm @submit="onSubmit" v-if="show" class="shadow p-4 rounded bg-light">
        <BFormGroup
          id="input-group-1"
          label="Username:"
          label-for="input-1"
          description="Choose a unique username."
          class="mb-3"
        >
          <BFormInput
            id="input-1"
            v-model="form.username"
            placeholder="Enter username"
            required
          />
        </BFormGroup>

        <BFormGroup
          id="input-group-2"
          label="Your Password:"
          label-for="input-2"
          description="Password should be at least 8 characters long."
          class="mb-3"
        >
          <BFormInput
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          />
        </BFormGroup>

        <BFormGroup
          id="input-group-3"
          label="Retype your Password:"
          label-for="input-3"
          class="mb-4"
        >
          <BFormInput
            id="input-3"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Retype password"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between mt-3">
          <BButton type="submit" variant="primary">Submit</BButton>
          <BButton type="button" variant="danger" @click="onLogin">Login</BButton>
        </div>
      </BForm>
    </div>
  </main>
</template>

  
  <script setup lang="js">
  import { reactive, ref} from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const form = reactive({
    password: '',
    confirmPassword: '',
    username: '',
  });
  
  const show = ref(true);
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        // Posting data with Axios
        await axios.post('http://localhost:3000/auth/signup', form).then(response => {
            if (response.status === 201) {
                router.push({ name: 'login' })
            } else {
                alert('Invalid credentials');
            }
        });
      } catch (error) {
        console.error(error);
      }
  };
  
  const onLogin = (event) => {
    router.push({ name: 'login' })
  };
  </script>