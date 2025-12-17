<template>
  <div class="flex min-h-screen font-sans text-j4m-text">

    <div class="hidden md:flex flex-col w-64 bg-j4m-sidebar p-8 border-r border-gray-800">
      <div class="mb-10 text-center">
        <h1 class="text-5xl font-bold text-j4m-pink tracking-tighter" style="font-family: 'Courier New', monospace;">J4M</h1>
      </div>

      <nav class="space-y-6 text-gray-400 font-bold text-sm tracking-widest">
        <div class="flex items-center space-x-3 cursor-pointer hover:text-j4m-pink transition">
          <span>🏠</span> <span>INÍCIO</span>
        </div>
        <div class="flex items-center space-x-3 cursor-pointer hover:text-j4m-pink transition">
          <span>🏆</span> <span>CAMPEÕES</span>
        </div>
        <div class="flex items-center space-x-3 cursor-pointer hover:text-j4m-pink transition">
          <span>⬇️</span> <span>BIBLIOTECA</span>
        </div>
        <div class="flex items-center space-x-3 cursor-pointer hover:text-j4m-pink transition">
          <span>👥</span> <span>EQUIPE</span>
        </div>
      </nav>

      <div class="mt-12">
        <p class="text-xs text-gray-500 mb-4 uppercase">Minhas Jam's ></p>
        <div class="space-y-3">
          <div class="h-16 w-16 bg-gray-300 rounded-lg opacity-80"></div>
          <div class="h-16 w-16 bg-gray-300 rounded-lg opacity-80"></div>
          <div class="h-16 w-16 bg-gray-300 rounded-lg opacity-80"></div>
        </div>
      </div>

      <div class="mt-auto">
        <span class="text-2xl">⚙️</span>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center bg-j4m-purple relative overflow-hidden">

      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-900/20 to-transparent pointer-events-none"></div>

      <div class="w-full max-w-md bg-j4m-card p-10 rounded-3xl shadow-2xl z-10">

        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-j4m-pink mb-4" style="font-family: 'Courier New', monospace;">J4M</h1>
          <h2 class="text-2xl font-bold text-white">Entre na sua conta J4M</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">

          <div>
            <label class="block text-white text-sm font-bold mb-2">Email</label>
            <input
                v-model="form.email"
                type="email"
                placeholder="Digite aqui..."
                class="w-full px-4 py-3 bg-black/30 border border-gray-500 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-j4m-pink focus:ring-1 focus:ring-j4m-pink transition"
                required
            >
          </div>

          <div>
            <label class="block text-white text-sm font-bold mb-2">Senha</label>
            <input
                v-model="form.password"
                type="password"
                placeholder="Digite aqui..."
                class="w-full px-4 py-3 bg-black/30 border border-gray-500 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-j4m-pink focus:ring-1 focus:ring-j4m-pink transition"
                required
            >
            <div class="mt-2 text-left">
              <a href="#" class="text-sm text-j4m-pink hover:underline font-bold">Esqueci minha senha</a>
            </div>
          </div>

          <button type="submit" class="w-full bg-j4m-pink text-white font-bold py-3 px-4 rounded-full hover:bg-pink-600 transform hover:scale-105 transition duration-300 shadow-lg shadow-pink-500/30">
            ENTRAR
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-400 font-bold">
          Novo por aqui? <router-link to="/register" class="text-j4m-pink hover:underline">Crie sua Conta J4M!</router-link>
        </p>
      </div>
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
    const response = await axios.post('http://localhost:8000/api/login', form);

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user_role', response.data.user.role);

    alert('Login realizado! Bem-vindo(a) à J4M.');
    router.push('/');

  } catch (error) {
    console.error(error);
    alert('Falha no login. Verifique suas credenciais.');
  }
};
</script>