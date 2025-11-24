<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-indigo-600">J4M</h1>
      <div class="space-x-4">
        <router-link to="/login" class="text-gray-600 hover:text-indigo-600">Login</router-link>
        <router-link to="/register" class="px-4 py-2 bg-indigo-600 text-white rounded">Criar Conta</router-link>
      </div>
    </nav>

    <div class="bg-indigo-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">🏆 Game Jams Oficiais</h2>
        <p class="mb-8 text-indigo-200">Participe de eventos patrocinados por grandes empresas e ganhe prêmios.</p>

        <div v-if="jams.official.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="jam in jams.official" :key="jam.id" class="bg-indigo-800 rounded-lg p-6 border border-indigo-700">
            <h3 class="text-xl font-bold">{{ jam.title }}</h3>
            <p class="text-sm text-indigo-300 mt-2">{{ new Date(jam.start_date).toLocaleDateString() }}</p>
            <p class="mt-4 text-gray-300 text-sm line-clamp-3">{{ jam.description }}</p>
            <button class="mt-4 w-full bg-yellow-500 text-indigo-900 font-bold py-2 rounded hover:bg-yellow-400">
              Ver Detalhes (Premium)
            </button>
          </div>
        </div>
        <div v-else class="text-center py-10 text-indigo-400">
          Nenhuma Jam Oficial acontecendo agora.
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">🎮 Jams da Comunidade</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="jam in jams.open" :key="jam.id" class="bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="h-32 bg-gray-200 rounded-t-lg"></div> <div class="p-6">
          <h3 class="text-lg font-bold text-gray-800">{{ jam.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">Início: {{ new Date(jam.start_date).toLocaleDateString() }}</p>
          <p class="mt-3 text-gray-600 text-sm line-clamp-2">{{ jam.description }}</p>
          <button class="mt-4 text-indigo-600 font-semibold hover:underline">
            Participar Grátis
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// estado reativo para guardar as jams
const jams = ref({
  official: [],
  open: []
});

// pega os dados e carrega a página
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/gamejams');
    jams.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar Jams:", error);
  }
});
</script>