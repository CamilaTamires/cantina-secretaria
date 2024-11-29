<template>
  <div class="login-container">
    <div class="overlay">
      <div class="login-box">
        <img src="../assets/logo.png" alt="Logo cantina" class="logo">
        <!-- Formulário de Login -->
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <input v-model="username" type="text" placeholder="Login" required />
          </div>
          <div class="input-group">
            <input v-model="password" type="password" placeholder="Senha" required />
          </div>
          <button type="submit" :disabled="isLoading">
            <span v-if="isLoading">Carregando...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
  async handleSubmit() {
   
  if (!this.username || !this.password) {
    this.errorMessage = 'Por favor, preencha ambos os campos!';
    return;
  }
    this.isLoading = true;
    this.errorMessage = ''; // Resetando a mensagem de erro
    try {
      // Requisição para o backend de autenticação
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: this.username,
       password: this.password,
      }, {
      headers: {
       'Content-Type': 'application/json'  // Garantindo que o conteúdo da requisição seja JSON
        }
      });

      if (response.status === 200) {
        // Armazenar o token de autenticação no localStorage
        localStorage.setItem('authToken', response.data.token);

         // Usar nextTick para garantir que o Vue termine a renderização antes de redirecionar
         this.$nextTick(() => {
          // Redireciona para a página /menu
          this.$router.push('/menu');
        });
      }
    } catch (error) {
      // Caso haja erro, exibe mensagem de erro
      this.errorMessage = error.response.data.message || 'Erro ao conectar com o servidor';
    } finally {
      this.isLoading = false;
    }
  },
},
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inria Serif', serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #761813;
}

.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #868180;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 590px;
  padding: 40px 20px;
  min-height: 500px;
  color: #fff;
}

.logo {
  width: 300px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 30px;
  font-family: 'Inder', sans-serif;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 75%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 80%;
  padding: 12px;
  background-color: #404353;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

button:hover {
  background-color: #14caeb;
}

.forgot-password {
  display: block;
  margin-top: 20px;
  color: #98e3e9;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.2);
}

/* Responsividade para dispositivos móveis */
@media (max-width: 600px) {
  .login-box {
    width: 90%;
    padding: 20px;
  }

  input, button {
    width: 90%;
  }

  .logo {
    width: 250px;
  }
}
</style>
