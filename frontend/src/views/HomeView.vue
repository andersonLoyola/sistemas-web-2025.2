<template>
  <div class="min-h-screen bg-j4m-purple text-j4m-text font-sans selection:bg-j4m-pink selection:text-white">

    <nav class="bg-j4m-sidebar border-b border-gray-800 p-4 sticky top-0 z-50 shadow-lg shadow-purple-900/20">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-j4m-pink tracking-tighter hover:scale-105 transition transform" style="font-family: 'Courier New', monospace;">
          J4M
        </router-link>

        <div class="flex items-center space-x-6 text-sm font-bold tracking-wide">
          <div class="hidden md:flex space-x-6 text-gray-400">
            <a href="#" class="hover:text-j4m-pink transition">RANKING</a>
            <a href="#" class="hover:text-j4m-pink transition">COMUNIDADE</a>
          </div>

          <div v-if="!isLoggedIn" class="space-x-4">
            <router-link to="/login" class="text-white hover:text-j4m-pink transition">LOGIN</router-link>
            <router-link to="/register" class="px-5 py-2 bg-j4m-pink text-white rounded-full hover:bg-pink-600 transition shadow-lg shadow-pink-500/20">
              CRIAR CONTA
            </router-link>
          </div>

          <div v-else class="flex items-center space-x-4">
            <span class="text-gray-500 hidden sm:block">Olá, Dev!</span>

            <router-link to="/create-jam" class="px-4 py-2 border border-j4m-pink text-j4m-pink rounded-full hover:bg-j4m-pink hover:text-white transition flex items-center">
              <span class="mr-1 text-lg leading-none">+</span> JAM
            </router-link>

            <button @click="logout" class="text-gray-500 hover:text-red-500 font-semibold transition">
              SAIR
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="bg-gradient-to-b from-j4m-sidebar to-j4m-purple py-12 px-4 border-b border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center mb-8 space-x-3">
          <span class="text-3xl">🏆</span>
          <h2 class="text-3xl font-bold text-white tracking-wide uppercase">
            Jams <span class="text-j4m-pink">Oficiais</span>
          </h2>
        </div>

        <div v-if="jams.official.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="jam in jams.official" :key="jam.id" class="group relative bg-j4m-card rounded-2xl p-6 border border-j4m-pink hover:shadow-[0_0_20px_rgba(233,30,99,0.3)] transition duration-300">
            <div class="absolute -top-3 -right-3 bg-j4m-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              PREMIUM
            </div>

            <h3 class="text-xl font-bold text-white truncate group-hover:text-j4m-pink transition">{{ jam.title }}</h3>
            <p class="text-sm text-gray-400 mt-2 font-mono">📅 {{ new Date(jam.start_date).toLocaleDateString() }}</p>
            <p class="mt-4 text-gray-300 text-sm line-clamp-3 leading-relaxed">{{ jam.description }}</p>

            <router-link :to="`/jam/${jam.id}`" class="mt-6 block w-full text-center bg-transparent border border-gray-600 text-white font-bold py-2 rounded-xl hover:bg-white hover:text-j4m-purple transition">
              VER DETALHES
            </router-link>
          </div>
        </div>

        <div v-else class="text-center py-10 bg-black/20 rounded-2xl border border-dashed border-gray-700">
          <p class="text-gray-500">Nenhuma Jam Oficial acontecendo agora.</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold text-gray-200 mb-8 flex items-center">
        <span class="w-2 h-8 bg-j4m-pink mr-3 rounded-full"></span>
        COMUNIDADE
      </h2>

      <div v-if="jams.open.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="jam in jams.open" :key="jam.id" class="bg-j4m-card rounded-xl shadow-lg hover:-translate-y-1 transition duration-300 overflow-hidden border border-transparent hover:border-gray-600 group">
          <div class="h-32 bg-black/40 flex items-center justify-center group-hover:bg-j4m-pink/10 transition">
            <span class="text-4xl opacity-50">👾</span>
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold text-white truncate">{{ jam.title }}</h3>
            <p class="text-xs text-j4m-pink mt-1 font-bold uppercase">Aberto</p>
            <p class="mt-3 text-gray-400 text-sm line-clamp-2 h-10">{{ jam.description }}</p>

            <div class="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ new Date(jam.start_date).toLocaleDateString() }}</span>
              <router-link :to="`/jam/${jam.id}`" class="text-sm font-bold text-white hover:text-j4m-pink transition">
                Participar →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-600">
        Nenhuma Jam da comunidade encontrada. Seja o primeiro a criar uma!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado reativo
const jams = ref({
  official: [],
  open: []
});

const isLoggedIn = ref(false);

const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if(token) {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error("Erro no logout", error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    isLoggedIn.value = false;
    alert("Você saiu do sistema.");
    router.push('/login');
  }
};

onMounted(async () => {
  isLoggedIn.value = !!localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8000/api/gamejams');
    jams.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar Jams:", error);
  }
});
</script>