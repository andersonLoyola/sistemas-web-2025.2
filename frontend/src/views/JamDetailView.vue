<template>
  <div class="min-h-screen bg-gray-50 p-6" v-if="jam">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      <div class="h-48 bg-indigo-900 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white">{{ jam.title }}</h1>
      </div>

      <div class="p-8">
        <div class="flex justify-between items-start">
          <div>
            <span :class="`px-3 py-1 rounded-full text-xs font-bold uppercase ${jam.type === 'official' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`">
              {{ jam.type === 'official' ? 'Oficial' : 'Comunidade' }}
            </span>
            <p class="mt-4 text-gray-600">Organizado por: <span class="font-semibold">{{ jam.user.name }}</span></p>
            <p class="text-gray-500 text-sm">Participantes: {{ participantsCount }}</p>
          </div>

          <div v-if="isLoggedIn">
            <button
                v-if="!isJoined"
                @click="joinJam"
                class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg">
              Inscrever-se Agora
            </button>
            <div v-else class="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-bold border border-green-200">
              ✓ Você está participando!
            </div>
          </div>
          <div v-else>
            <router-link to="/login" class="text-indigo-600 underline">Faça login para participar</router-link>
          </div>
        </div>

        <hr class="my-6">

        <h3 class="text-xl font-bold mb-4">Sobre o Evento</h3>
        <p class="text-gray-700 whitespace-pre-line leading-relaxed">{{ jam.description }}</p>

        <div class="mt-8 grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
          <div>
            <p class="text-xs text-gray-500 uppercase">Início</p>
            <p class="font-bold text-gray-800">{{ new Date(jam.start_date).toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase">Término</p>
            <p class="font-bold text-gray-800">{{ new Date(jam.end_date).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para pegar o ID da URL
import axios from 'axios';

const route = useRoute();
const jam = ref(null);
const isJoined = ref(false);
const participantsCount = ref(0);
const isLoggedIn = ref(!!localStorage.getItem('token'));

const fetchJamDetails = async () => {
  try {
    // Se tiver token, manda no header para o backend checar se já somos inscritos
    const headers = isLoggedIn.value ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {};

    const response = await axios.get(`http://localhost:8000/api/gamejams/${route.params.id}`, { headers });

    jam.value = response.data.jam;
    isJoined.value = response.data.is_joined;
    participantsCount.value = response.data.jam.participants_count;
  } catch (error) {
    console.error("Erro ao carregar detalhes", error);
    alert("Jam não encontrada.");
  }
};

const joinJam = async () => {
  try {
    await axios.post(`http://localhost:8000/api/gamejams/${route.params.id}/join`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    isJoined.value = true;
    participantsCount.value++;
    alert("Inscrição confirmada! Boa sorte!");
  } catch (error) {
    console.error(error);
    alert("Erro ao se inscrever.");
  }
};

onMounted(() => {
  fetchJamDetails();
});
</script>