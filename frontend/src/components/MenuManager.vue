<template>
  <div>
    <h2>Gerenciamento de Menu</h2>
    <!-- Tabela de menus -->
    <table>
      <thead>
        <tr>
          <th>Dia</th>
          <th>Guarnição 1</th>
          <th>Guarnição 2</th>
          <th>Guarnição 3</th>
          <th>Guarnição 4</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <!-- Exibe as linhas para cada dia da semana -->
        <tr v-for="menu in menus" :key="menu._id">
          <!-- O nome do dia (ex.: Segunda-feira, Terça-feira, etc.) é fixo -->
          <td>{{ menu.dia }}</td>

          <!-- Os campos de guarnições são editáveis -->
          <td><input v-model="menu.guarnicao1" /></td>
          <td><input v-model="menu.guarnicao2" /></td>
          <td><input v-model="menu.guarnicao3" /></td>
          <td><input v-model="menu.guarnicao4" /></td>

          <!-- Botão para editar o menu (atualizar os dados no banco) -->
          <td><button @click="editMenu(menu)">Editar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuthToken } from '../utils/auth';  // Utilitário para obter o token

export default {
  data() {
    return {
      menus: [],  // Lista de menus para os dias da semana
    };
  },
  mounted() {
    this.loadMenus();  // Carrega os menus quando o componente for montado
  },
  methods: {
    // Método para carregar os menus
    async loadMenus() {
      try {
        const token = getAuthToken();  // Verifica o token antes de carregar os menus

        if (!token) {
          this.$router.push('/login');  // Redireciona para login caso não haja token
          return;
        }

        // Requisição GET para carregar os menus
        const response = await axios.get("cantina-secretaria.vercel.app/api/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.menus = response.data;  // Atualiza a lista de menus com os dados recebidos
      } catch (error) {
        console.error("Erro ao carregar menus", error);
        alert('Erro ao carregar os menus. Tente novamente mais tarde.');
      }
    },

    // Método para editar o menu de um dia específico
    async editMenu(menu) {
      try {
        const token = getAuthToken();  // Verifica o token antes de editar

        if (!token) {
          this.$router.push('/login');  // Redireciona para o login caso o token não seja válido
          return;
        }

        // Requisição PUT para atualizar os dados do menu no backend
        const response = await axios.put(`cantina-secretaria.vercel.app/api/menu/${menu._id}`, menu, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          alert("Menu atualizado com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao editar menu", error);
        alert('Erro ao editar o menu. Tente novamente mais tarde.');
      }
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Isso ajuda a centralizar verticalmente na tela */
}

.menu-container {
  margin-top: 60px;
  padding: 20px;
  font-size: 20px;
  color: #333;
  width: 80%; /* Adiciona um limite para o tamanho da tabela */
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

/* Estilos para a tabela */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto; /* Centraliza horizontalmente a tabela */
}

th, td {
  padding: 10px;
  text-align: center; /* Centraliza o conteúdo das células da tabela */
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

input {
  width: 100%; /* Para que os inputs ocupem toda a largura da célula */
  padding: 5px;
  box-sizing: border-box; /* Garante que o padding não ultrapasse o tamanho da célula */
}

button {
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
