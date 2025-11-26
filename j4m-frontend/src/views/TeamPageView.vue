<template>
  <div class="w-full min-h-screen bg-gradient-to-b from-black to-purple-900 p-12 text-white">
    
    <h1 class="text-pink-500 text-3xl mb-8 font-semibold tracking-widest">
      EQUIPE
    </h1>
    <!-- Avatares -->
    <div class="flex justify-center gap-6 my-10">
      <TeamMember v-for="n in 5" :key="n" />
    </div>

    <!-- Nome -->
    <div class="text-center mt-6">
      <h2 class="font-bold uppercase tracking-widest mb-4">Nome da equipe</h2>

      <p class="max-w-2xl mx-auto text-gray-300 leading-relaxed">
        Descrição da equipe Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor.
      </p>
    </div>

    <ContactInfo />
  </div>
</template>

<script setup>
import TeamMember from "../components/TeamMember.vue";
import ContactInfo from "../components/ContactInfo.vue";
</script>
