// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/UserLogin.vue'
import MenuManager from './components/MenuManager.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/menu-manager', component: MenuManager, meta: { requiresAuth: true } }, // Página protegida
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Adicionando o guard de navegação
router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação e se o token de autenticação existe no localStorage
  if (to.meta.requiresAuth && !localStorage.getItem('authToken')) {
    next('/login') // Redireciona para a página de login
  } else {
    next() // Continua para a próxima rota
  }
})

export default router

