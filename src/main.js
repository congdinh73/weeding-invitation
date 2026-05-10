import { createApp } from 'vue'
import App from './App.vue'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
import './styles/index.css'

const app = createApp(App)

app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine)
  }
})

app.mount('#app')