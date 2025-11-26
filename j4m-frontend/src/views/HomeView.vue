<template>
  <div class="min-h-screen bg-gray-50">

    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-indigo-600">J4M - Game Jams</h1>

      <div class="space-x-4 flex items-center">
        <div v-if="!isLoggedIn">
          <router-link to="/login" class="text-gray-600 hover:text-indigo-600 mr-4">Login</router-link>
          <router-link to="/register" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Criar Conta</router-link>
        </div>

        <div v-else class="flex items-center space-x-4">
          <span class="text-gray-500 text-sm hidden sm:block">Olá, Dev!</span>

          <router-link to="/create-jam" class="px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition flex items-center">
            <span class="mr-1">+</span> Criar Jam
          </router-link>

          <button @click="logout" class="text-red-500 hover:text-red-700 text-sm font-semibold ml-2">
            Sair
          </button>
        </div>
      </div>
    </nav>

    <div class="bg-indigo-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-6 flex items-center">
          🏆 Game Jams Oficiais
        </h2>
        <p class="mb-8 text-indigo-200">Participe de eventos patrocinados por grandes empresas e ganhe prêmios.</p>

        <div v-if="jams.official.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="jam in jams.official" :key="jam.id" class="bg-indigo-800 rounded-lg p-6 border border-indigo-700 hover:border-yellow-400 transition">
            <h3 class="text-xl font-bold truncate">{{ jam.title }}</h3>
            <p class="text-sm text-indigo-300 mt-2">Início: {{ new Date(jam.start_date).toLocaleDateString() }}</p>
            <p class="mt-4 text-gray-300 text-sm line-clamp-3">{{ jam.description }}</p>
            <button class="mt-4 w-full bg-yellow-500 text-indigo-900 font-bold py-2 rounded hover:bg-yellow-400 transition">
              Ver Detalhes (Premium)
            </button>
          </div>
        </div>
        <div v-else class="text-center py-10 bg-indigo-800 rounded-lg border border-indigo-700 border-dashed">
          <p class="text-indigo-300">Nenhuma Jam Oficial acontecendo agora.</p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">🎮 Jams da Comunidade</h2>

      <div v-if="jams.open.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="jam in jams.open" :key="jam.id" class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <div class="h-32 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400 text-4xl">👾</span>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-800 truncate">{{ jam.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">Início: {{ new Date(jam.start_date).toLocaleDateString() }}</p>
            <p class="mt-3 text-gray-600 text-sm line-clamp-2 h-10">{{ jam.description }}</p>
            <button class="mt-4 text-indigo-600 font-semibold hover:underline">
              Participar Grátis
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12 text-gray-500">
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

  // pega os dados e carrega a pagina
  try {
    const response = await axios.get('http://localhost:8000/api/gamejams');
    jams.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar Jams:", error);
  }
});
</script>