<template>
  <aside class="bg-[#111] text-white w-64 h-screen p-6 flex flex-col justify-between">
    <div>
      <div class="text-center mb-10">
        <img src="/src/assets/logo.svg" alt="Logo" class="w-12 mx-auto" />
      </div>

      <nav class="space-y-4">
        <button class="flex items-center gap-3 hover:text-pink-500 transition">
          <span>🏠</span> Início
        </button>
        <button class="flex items-center gap-3 hover:text-pink-500 transition">
          <span>🏆</span> Campeões
        </button>
        <button class="flex items-center gap-3 hover:text-pink-500 transition">
          <span>📚</span> Biblioteca
        </button>
        <button class="flex items-center gap-3 text-pink-500">
          <span>👥</span> Equipe
        </button>
      </nav>

      <div class="mt-10">
        <h3 class="text-sm text-gray-400 uppercase mb-2">Minhas Jams</h3>
        <div class="space-y-3">
          <div class="w-16 h-24 bg-gray-700 rounded"></div>
          <div class="w-16 h-24 bg-gray-700 rounded"></div>
          <div class="w-16 h-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    <div class="text-gray-400">⚙ Configurações</div>
  </aside>
</template>
