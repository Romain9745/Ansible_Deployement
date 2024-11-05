import { createMemoryHistory, createRouter } from 'vue-router'
import { useAuthStore } from './store/auth';

import login from './components/Login.vue'
import signup from './components/Signup.vue'
import main from './components/Main.vue'

const routes = [
  { path: '/login',name: 'login' ,component: login },
  { path: '/signup',name: 'signup', component: signup },
    {path: '/', name:"home", component: main}
  //{ path: '/library', component:  },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(async (to, from,next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && (to.path !== '/login' && to.path !== '/signup')) {
    next('/login');
  } else {
    next();
  }
})

export default router