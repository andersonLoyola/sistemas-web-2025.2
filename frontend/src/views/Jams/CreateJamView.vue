<template>
	<div class="min-h-screen flex bg-gradient-to-tr from-black via-purple-900 to-purple-700 text-white">
		<SidebarComponent />

		<main class="flex-1 p-8">
			<div class="max-w-6xl mx-auto">
				<div class="bg-[#323232] rounded-3xl p-8 shadow-xl">
					<div class="grid grid-cols-3 gap-8">
						<!-- left/main column -->
						<div class="col-span-2">
							<h2 class="text-center text-xl font-extrabold mb-4">NOME DA JAM</h2>
							<input v-model="form.title" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-6" />

							<h3 class="text-center text-xl font-extrabold mb-2">DESCRIÇÃO</h3>
							<textarea v-model="form.description" placeholder="Digite aqui..." rows="6" class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-6"></textarea>

							<h3 class="text-center text-xl font-extrabold mb-2">TAGS</h3>
							<input v-model="form.tags" placeholder="Digite aqui..." class="w-full bg-black text-white placeholder-gray-400 px-4 py-3 rounded-xl border-2 border-white/80 mb-6" />

							<div class="flex items-start gap-6">
								<div>
									<div class="w-36 h-36 bg-gray-200/80 rounded mb-2 overflow-hidden flex items-center justify-center"> 
										<img v-if="preview" :src="preview" alt="cover preview" class="object-cover w-full h-full" />
										<div v-else class="w-24 h-24 bg-gray-300"></div>
									</div>
									<div class="text-sm text-gray-300">ILUSTRAÇÃO DE CAPA</div>
									<div class="text-xs text-gray-400 mb-2">Nenhuma imagem carregada.</div>
									<label class="inline-block px-4 py-2 bg-purple-600 rounded text-white cursor-pointer">
										CARREGAR IMAGEM
										<input type="file" accept="image/*" @change="onFileChange" class="hidden" />
									</label>
								</div>
							</div>
						</div>

						<!-- right column -->
						<div>
							<h3 class="text-center text-xl font-extrabold mb-4">PRAZO</h3>
							<div class="grid grid-cols-2 gap-3 mb-4">
								<input v-model="form.start_date" placeholder="DD/MM/AAAA" class="bg-black text-white px-3 py-2 rounded border-2 border-white/80" />
								<input v-model="form.start_time" placeholder="HH:MM" class="bg-black text-white px-3 py-2 rounded border-2 border-white/80" />
							</div>

							<div class="grid grid-cols-2 gap-3 mb-4">
								<input v-model="form.end_date" placeholder="DD/MM/AAAA" class="bg-black text-white px-3 py-2 rounded border-2 border-white/80" />
								<input v-model="form.end_time" placeholder="HH:MM" class="bg-black text-white px-3 py-2 rounded border-2 border-white/80" />
							</div>

							<select v-model="form.timezone" class="w-full bg-black text-white px-3 py-2 rounded border-2 border-white/80 mb-6">
								<option>Horário de Brasília (UTC-03:00)</option>
								<option>UTC</option>
							</select>

							<h3 class="text-center text-xl font-extrabold mb-2">PREMIAÇÃO</h3>
							<select v-model="form.prize" class="w-full bg-black text-white px-3 py-2 rounded border-2 border-white/80 mb-6">
								<option>Nenhuma (Padrão)</option>
								<option>Prêmio em dinheiro</option>
							</select>

							<div class="mt-12">
								<button @click="saveJam" class="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold py-3 rounded-full">SALVAR JAM</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SidebarComponent from '../../components/SidebarComponent.vue'
import createJamService from '../../services/create-jam.service.js'

const form = reactive({
	title: '',
	description: '',
	tags: '',
	start_date: '',
	start_time: '',
	end_date: '',
	end_time: '',
	timezone: 'Horário de Brasília (UTC-03:00)',
	prize: 'Nenhuma (Padrão)'
})

const preview = ref(null)
let fileData = null

const onFileChange = (e) => {
	const file = e.target.files && e.target.files[0]
	if (!file) return
	fileData = file
	const reader = new FileReader()
	reader.onload = () => { preview.value = reader.result }
	reader.readAsDataURL(file)
}

const saveJam = async () => {
	try {
		const payload = new FormData()
		payload.append('title', form.title)
		payload.append('description', form.description)
		payload.append('tags', form.tags)
		payload.append('start_date', form.start_date)
		payload.append('start_time', form.start_time)
		payload.append('end_date', form.end_date)
		payload.append('end_time', form.end_time)
		payload.append('timezone', form.timezone)
		payload.append('prize', form.prize)
		if (fileData) payload.append('cover', fileData)

		await createJamService.create(payload)
		alert('Jam salva com sucesso (resposta simulada).')
	} catch (err) {
		console.error(err)
		alert('Erro ao salvar a Jam.')
	}
}
</script>

<style scoped>
/* minimal, rely on Tailwind; keep space for future custom CSS */
</style>
