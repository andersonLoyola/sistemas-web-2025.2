<template>
  <div class="min-h-screen flex bg-gradient-to-tr from-black via-purple-900 to-purple-700 text-white">
    <SidebarComponent />

    <main class="flex-1 p-8">
      <div class="max-w-6xl mx-auto">
        <div class="bg-[#323232] rounded-3xl p-8 shadow-xl">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-extrabold text-pink-400">JAM - 8bit Brazil 2025</h1>
          </div>

          <form @submit.prevent="submitProject">
            <div class="grid grid-cols-3 gap-8">
              <div class="col-span-2">
                <label class="block text-sm font-bold mb-2">LINK PITCH (MAX 3MIN)</label>
                <input v-model="form.pitch_link" placeholder="Link" class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-4" />

                <label class="block text-sm font-bold mb-2">LINK DO GITHUB</label>
                <input v-model="form.github_link" placeholder="Link github" class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-4" />

                <label class="block text-sm font-bold mb-2">DESCRIÇÃO DO GAME</label>
                <textarea v-model="form.description" placeholder="Descrição do projeto" rows="6" class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-4"></textarea>

                <div class="mt-6">
                  <label class="block text-sm font-bold mb-2">SLIDES DA APRESENTAÇÃO</label>
                  <div class="text-xs text-gray-400 mb-3">{{ slidesName || 'Nenhuma arquivo carregado.' }}</div>
                  <label class="inline-block px-4 py-2 bg-purple-600 rounded text-white cursor-pointer">
                    CARREGAR ARQUIVO
                    <input type="file" accept=".pdf,.ppt,.pptx" @change="onSlidesChange" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <!-- right column intentionally left minimal (mock shows large empty area) -->
                <div class="h-full flex items-end">
                  <button type="submit" class="ml-auto bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold py-3 px-8 rounded-full">ENVIAR PROJETO</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SidebarComponent from '../../components/SidebarComponent.vue'
import http from '../../services/http.js'

const form = reactive({
  pitch_link: '',
  github_link: '',
  description: ''
})

const slidesFile = ref(null)
const slidesName = ref('')

const onSlidesChange = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  slidesFile.value = f
  slidesName.value = f.name
}

const submitProject = async () => {
  try {
    const payload = new FormData()
    payload.append('pitch_link', form.pitch_link)
    payload.append('github_link', form.github_link)
    payload.append('description', form.description)
    if (slidesFile.value) payload.append('slides', slidesFile.value)

    // placeholder URL - replace with actual endpoint
    await http.post('/placeholder/submit-project', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    alert('Projeto enviado (simulação).')
  } catch (err) {
    console.error(err)
    alert('Erro ao enviar projeto.')
  }
}
</script>

<style scoped>
/* rely on Tailwind for most styling; add small tweaks if needed */
</style>
