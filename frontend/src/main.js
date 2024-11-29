import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';  // Importando o Vue Router

// Definindo os componentes das rotas
import UserLogin from './components/UserLogin.vue'; // Componente de Login
import Menu from './components/MenuManager.vue'; // Componente de Menu

// Definindo as rotas
const routes = [
  { path: '/', component: UserLogin },  // Rota de Login
  { path: '/menu', component: Menu },   // Rota do Menu (após o login)
];

// Criando uma instância do Vue Router
const router = createRouter({
  history: createWebHistory(),  // Usando o histórico de navegação (sem hash na URL)
  routes,  // Configurando as rotas
});

// Criando a aplicação Vue e passando o Vue Router
createApp(App)
  .use(router)  // Registrando o Vue Router
  .mount('#app');  // Montando a aplicação no elemento com id "app"
