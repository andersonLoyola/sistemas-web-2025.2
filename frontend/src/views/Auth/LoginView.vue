<template>
  <div class="min-h-screen flex bg-gradient-to-tr from-black via-purple-900 to-purple-700 text-white">
    <!-- Sidebar component -->
    <SidebarComponent />

    <!-- Main content -->
    <main class="flex-1 flex items-center justify-center p-12">
      <div class="w-[720px] bg-[#323232] rounded-3xl p-12 shadow-xl">
        <div class="flex flex-col items-center">
          <div class="text-pink-500 text-5xl font-extrabold mb-6">Jm</div>
          <h1 class="text-3xl font-extrabold mb-8">Entre na sua conta J4M</h1>
          <!-- TODO: checar submit.prevent aqui-->
          <form class="w-full max-w-xl" @submit.prevent="handleLogin">
            <div class="mb-4">
              <label class="text-sm mb-2 block">Email</label>
              <input v-model="form.email" type="email" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <div class="mb-2">
              <label class="text-sm mb-2 block">Senha</label>
              <input v-model="form.password" type="password" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <div class="w-full text-right mb-6">
              <a class="text-pink-400 text-sm hover:underline">Esqueci minha senha</a>
            </div>

            <button type="submit" class="w-56 mx-auto block bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold py-3 rounded-full hover:brightness-110 transition">ENTRAR</button>
          </form>

          <p class="mt-8 text-center text-sm">Novo por aqui? <router-link to="/register" class="text-pink-400 font-semibold hover:underline">Crie sua Conta J4M!</router-link></p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import http from '../../services/http.js'
import SidebarComponent from '../../components/SidebarComponent.vue'

const router = useRouter()
const form = reactive({ email: '', password: '' })

const handleLogin = async () => {
  try {
    const response = await http.post('/login', form)
    localStorage.setItem('token', response.data.access_token)
    if (response.data.user && response.data.user.role) localStorage.setItem('user_role', response.data.user.role)
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    alert('Falha no login. Verifique suas credenciais.')
  }
}
</script>

<style scoped>
/* Pequenos ajustes que o Tailwind não cobre diretamente */
/* mantém o foco no layout visual mostrado na imagem */
</style>