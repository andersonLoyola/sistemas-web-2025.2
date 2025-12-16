<template>
  <div class="min-h-screen flex bg-gradient-to-tr from-black via-purple-900 to-purple-700 text-white">
    <SidebarComponent />

    <main class="flex-1 flex items-center justify-center p-12">
      <div class="w-[720px] bg-[#323232] rounded-3xl p-12 shadow-xl">
        <div class="flex flex-col items-center">
          <div class="text-pink-500 text-5xl font-extrabold mb-4">Jm</div>
          <h1 class="text-3xl font-extrabold mb-6 text-center">Crie sua conta e comece já!</h1>

          <form class="w-full max-w-lg" @submit.prevent="handleRegister">
            <div class="mb-4">
              <label class="text-sm mb-2 block">Email</label>
              <input v-model="form.email" type="email" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <div class="mb-4">
              <label class="text-sm mb-2 block">Nome de usuário</label>
              <input v-model="form.username" type="text" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <div class="mb-4">
              <label class="text-sm mb-2 block">Senha</label>
              <input v-model="form.password" type="password" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <div class="mb-6">
              <label class="text-sm mb-2 block">Confirmar Senha</label>
              <input v-model="form.password_confirmation" type="password" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 focus:outline-none" required />
            </div>

            <button type="submit" class="w-56 mx-auto block bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold py-3 rounded-full hover:brightness-110 transition">LET'S J4M!!</button>
          </form>

          <p class="mt-8 text-center text-sm">Já tem conta? <router-link to="/login" class="text-pink-400 font-semibold hover:underline">Faça Login</router-link></p>
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

const form = reactive({
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  if (form.password !== form.password_confirmation) {
    alert('As senhas não conferem.')
    return
  }

  try {
    const payload = {
      email: form.email,
      username: form.username,
      password: form.password,
      password_confirmation: form.password_confirmation
    }

    const response = await http.post('/register', payload)
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
    }
    if (response.data && response.data.user && response.data.user.role) {
      localStorage.setItem('user_role', response.data.user.role)
    }
    alert('Conta criada com sucesso!')
    router.push('/login')
  } catch (err) {
    console.error(err)
    alert('Erro ao cadastrar. Verifique os dados e tente novamente.')
  }
}
</script>

<style scoped>
/* small adjustments kept intentionally minimal — styling handled with Tailwind */
</style>