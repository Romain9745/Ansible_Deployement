<template>
  <main class="d-flex justify-content-center align-items-center vh-100">
    <div class="container">
      <h2 class="text-center mb-4">Log in</h2>
      <BForm @submit="onSubmit" v-if="show" class="shadow p-4 rounded bg-light">
        <BFormGroup
          id="input-group-1"
          label="Username:"
          label-for="input-1"
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
          class="mb-4"
        >
          <BFormInput
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between mt-3">
          <BButton type="submit" variant="primary">Submit</BButton>
          <BButton type="button" variant="danger" @click="onSignup">Signup</BButton>
        </div>
      </BForm>
    </div>
  </main>
</template>

<script setup lang="js">
import { reactive, ref} from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth';

const router = useRouter()

const form = reactive({
  password: '',
  username: '',
});

const show = ref(true);

const AuthStore = useAuthStore();

const onSubmit = async (event) => {
  event.preventDefault();
      try {
          await AuthStore.login(form.username, form.password);
          router.push({ name: 'library' });
      } catch (error) {
          if (error.response.status === 401) {
              alert('Invalid credentials');
          } else {
              alert('An error occurred');
          }
      }
};

const onSignup = (event) => {
  router.push({ name: 'signup' })
};

</script>