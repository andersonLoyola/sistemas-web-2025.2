<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-indigo-600">J4M - Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="form.email" type="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
          <input v-model="form.password" type="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>
        
        <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
          Entrar
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        Não tem conta? <router-link to="/register" class="text-indigo-600 hover:underline">Cadastre-se como Dev ou Empresa</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    // conexão com a API backend
    const response = await axios.post('http://localhost:8000/api/login', form);
    
    // salva o token no localStorage
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user_role', response.data.user.role);

    alert('Bem-vindo ao J4M!');
    router.push('/dashboard');
    
  } catch (error) {
    console.error(error);
    alert('Falha no login. Verifique suas credenciais.');
  }
};
</script>