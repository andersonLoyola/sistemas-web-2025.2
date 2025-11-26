<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Criar Nova Game Jam</h2>

      <form @submit.prevent="createJam">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Título do Evento</label>
          <input v-model="form.title" type="text" class="w-full border rounded p-2" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Tipo de Jam</label>
          <select v-model="form.type" class="w-full border rounded p-2">
            <option value="open">Comunidade (Aberta)</option>
            <option value="official">Oficial (Parceira)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-gray-700 font-bold mb-2">Início</label>
            <input v-model="form.start_date" type="datetime-local" class="w-full border rounded p-2" required>
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Fim</label>
            <input v-model="form.end_date" type="datetime-local" class="w-full border rounded p-2" required>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2">Descrição</label>
          <textarea v-model="form.description" rows="4" class="w-full border rounded p-2" required></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <router-link to="/" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</router-link>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">
            Publicar Evento
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  title: '',
  description: '',
  type: 'open',
  start_date: '',
  end_date: ''
});

const createJam = async () => {
  try {
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:8000/api/gamejams', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('Game Jam criada com sucesso!');
    router.push('/');
  } catch (error) {
    console.error(error);
    alert('Erro ao criar evento. Verifique os dados.');
  }
};
</script>