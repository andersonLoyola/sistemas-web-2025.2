<template>
  <div class="min-h-screen flex bg-gradient-to-tr from-black via-purple-900 to-purple-700 text-white">
    <SidebarComponent />

    <main class="flex-1 p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-extrabold text-pink-400">Minhas Jams</h2>
            <div class="mt-3 flex gap-3">
              <button class="px-3 py-1 rounded-full bg-white/10 text-sm text-white border border-white/20">Participando</button>
              <button class="px-3 py-1 rounded-full bg-transparent text-sm text-white border border-white/20">Feitas por mim</button>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <input placeholder="Pesquisar..." class="px-4 py-2 rounded-full bg-black/40 border border-white/20 placeholder-gray-300" />
          </div>
        </div>

        <div class="grid grid-cols-4 gap-8 mb-16">
            <!--TODO: substituir por cards de jams -->
            <JamCard
              v-for="(jam, idx) in jams"
              :key="jam.id || idx"
              :title="jam.title"
              :image="jam.image"
              :to="`/jams/${jam.id || idx}`"
            />
        </div>

        <div class="fixed right-8 bottom-8">
          <button class="w-12 h-12 rounded-lg bg-transparent border border-white/30 text-white flex items-center justify-center text-2xl">+</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import SidebarComponent from '../../components/SidebarComponent.vue'
import JamCard from '../../components/JamCard.vue'

// example stub data — replace with API call when ready
const jams = [
  { id: 1, title: 'Witcher Jam', image: '/src/assets/witcher-example.jpg' },
  { id: 2, title: 'Night Sky Jam', image: '/src/assets/default-jam-bg.jpg' },
  { id: 3, title: 'Retro Pixel Jam', image: '/src/assets/default-jam-bg.jpg' },
  { id: 4, title: 'Neon Jam', image: '/src/assets/default-jam-bg.jpg' }
]
</script>

<style scoped>
/* simple adjustments to match mock visuals */
</style>
