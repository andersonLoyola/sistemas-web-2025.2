<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-indigo-600">J4M - Criar Conta</h2>
      
      <form @submit.prevent="handleRegister">
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Nome Completo / Razão Social</label>
          <input v-model="form.name" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="form.email" type="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
          <input v-model="form.password" type="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Eu sou:</label>
          <select v-model="form.role" class="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="user">Desenvolvedor (Quero participar/criar)</option>
            <option value="company">Empresa (Quero patrocinar/criar)</option>
          </select>
          <p class="text-xs text-gray-500 mt-1">
            *Empresas podem criar Jams Oficiais com prêmios[cite: 11, 17].
          </p>
        </div>
        
        <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
          Cadastrar
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        Já tem conta? <router-link to="/login" class="text-indigo-600 hover:underline">Faça Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// definindo as variáveis que estão ligadas ao v-model lá em cima
const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user'
});

const handleRegister = async () => {
  try {
    // mandando os dados para a rota de registro do Laravel que foi criada
    const response = await axios.post('http://localhost:8000/api/register', form);
    

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user_role', response.data.data.role);
    
    alert('Conta criada com sucesso!');
    router.push('/');
    
  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar. Verifique se o email já existe ou se a senha é curta demais.');
  }
};
</script>