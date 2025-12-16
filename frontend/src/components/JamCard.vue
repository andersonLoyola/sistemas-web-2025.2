<template>
  <router-link :to="to" class="block">
    <div class="relative h-40 rounded-lg overflow-hidden shadow-lg group">
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        :style="{ backgroundImage: `url(${image || defaultImage})` }"
        role="img"
        :aria-label="title"
      ></div>

      <div class="absolute inset-0 bg-black/30"></div>

      <footer class="absolute left-0 right-0 bottom-0 py-3 bg-black/40 text-center">
        <span class="text-white font-semibold">{{ title }}</span>
      </footer>
    </div>
  </router-link>
</template>

<script setup>

defineProps({
  title: { type: String, default: 'Untitled Jam' },
  image: { type: String, default: '' },
  to: { type: [String, Object], required: true }
})

const defaultImage = '/src/assets/default-jam-bg.jpg'

// Note: the component expects a valid image URL for `image` prop.
// If you want to use the provided example image, place it under `src/assets/`
// and pass its import (e.g. `import w from '@/assets/witcher.jpg'` then
// <JamCard :image="w" :title="..." to="/jam/1" /> ).
</script>

<style scoped>
/* small visual polish */
.group:hover .bg-cover { transform: scale(1.05); }
</style>
