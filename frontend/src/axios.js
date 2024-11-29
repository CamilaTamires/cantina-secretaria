
import axios from 'axios';

export default {
  data() {
    return {
      username: '',  // Certifique-se de que isso esteja correto
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
      this.errorMessage = '';  // Resetando a mensagem de erro

      try {
        // Requisição para o backend de autenticação
        const response = await axios.post('/api/auth/login', {
          username: this.username,  // Garantir que o username não esteja vazio
          password: this.password,
        });

        if (response.status === 200) {
          // Armazenar o token de autenticação no localStorage
          localStorage.setItem('authToken', response.data.token);

          // Redirecionar para a página de menu após login bem-sucedido
          this.$router.push('/menu');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Erro ao realizar login!';
        } else {
          this.errorMessage = 'Erro de conexão com o servidor!';
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
