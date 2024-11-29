<template>
  <div id="app">
    <!-- Exibe o componente de Login caso o usuário não esteja autenticado -->
    <UserLogin v-if="!isAuthenticated" />

    <!-- Exibe o conteúdo do menu ou da tela principal do sistema após o login -->
    <div v-else class="menu-container">
      <h1>Bem-vindo ao Sistema de Gerenciamento </h1>
      <img src="./assets/fotobanner.png" alt="">
      <!-- Aqui pode vir o conteúdo do menu, opções de gerenciamento de pratos, etc. -->
      <router-view /> <!-- Essa tag vai carregar o conteúdo da rota atual -->
    </div>
  </div>
</template>

<script>
// Importa o componente UserLogin.vue
import UserLogin from './components/UserLogin.vue'


export default {
  name: 'App',
  components: {
    UserLogin
  },
  data() {
    return {
      // Verifica se o usuário está autenticado com base no token no localStorage
      isAuthenticated: !!localStorage.getItem('authToken')
    }
  },
  mounted() {
    // Altera o título da aba do navegador
    document.title = "Sistema de Gerenciamento - Cantina On"; // 
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu-container {
  margin-top: 60px;
  padding: 20px;
  font-size: 20px;
  color: #333;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  color: #666;
}


</style>