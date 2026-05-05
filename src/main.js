import { createApp } from 'vue'
import App from './App.vue'
import Particles from '@tsparticles/vue3'
import './styles/index.css'

const registerParticles = async engine => {
	const [{ loadSlim }] = await Promise.all([import('@tsparticles/slim')])

	await loadSlim(engine)
}

createApp(App)
	.use(Particles, { init: registerParticles })
	.mount('#app')
