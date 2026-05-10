<template>
  <div class="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
   <audio ref="audioRef" loop preload="auto">
  <source src="/wedding-song.mp3" type="audio/mpeg" />
</audio>

    <button
      type="button"
      aria-label="Toggle wedding song"
      class="flex items-center rounded-full border border-gold/40 bg-white/78 p-2.5 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-0.5 sm:hidden"
      @click="togglePlay"
    >
      <MusicWave :is-playing="isPlaying" />
    </button>

    <div 
      class="hidden cursor-pointer items-center gap-3 rounded-full border border-gold/40 bg-white/70 px-4 py-2 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-[0_25px_60px_-10px_rgba(26,67,49,0.2)] sm:flex"
      @click="togglePlay"
    >
      <!-- Play/Pause Icon -->
      <div class="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white shadow-sm transition-transform duration-300" :class="{ 'scale-95': isPlaying }">
        <!-- Pause Icon -->
        <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        <!-- Play Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
      
      <span class="song-label font-serif text-[0.85rem] tracking-wide text-forest mt-px">Play our song</span>

      <!-- Music Wave -->
      <div class="ml-1">
        <MusicWave :is-playing="isPlaying" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MusicWave from './MusicWave.vue'

const isPlaying = ref(false)
const audioRef = ref(null)
let fadeTimerId = null

const targetVolume = 0.45

const setDefaultVolume = () => {
  if (!audioRef.value) return
  audioRef.value.volume = targetVolume
}

const clearFadeTimer = () => {
  if (fadeTimerId) {
    window.clearInterval(fadeTimerId)
    fadeTimerId = null
  }
}

const fadeInAudio = (durationMs = 2500) => {
  if (!audioRef.value) return

  clearFadeTimer()
  audioRef.value.volume = 0

  const startTime = window.performance.now()
  fadeTimerId = window.setInterval(() => {
    if (!audioRef.value) {
      clearFadeTimer()
      return
    }

    const elapsed = window.performance.now() - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    audioRef.value.volume = Math.min(targetVolume * progress, targetVolume)

    if (progress >= 1) {
      clearFadeTimer()
      audioRef.value.volume = targetVolume
    }
  }, 50)
}

const playWithFade = () => {
  if (!audioRef.value || isPlaying.value) return

  setDefaultVolume()
  audioRef.value.play().then(() => {
    isPlaying.value = true
    fadeInAudio()
  }).catch((err) => {
    console.warn('Audio playback was prevented by browser:', err)
  })
}

const handleGlobalPlayRequest = () => {
  playWithFade()
}

const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    clearFadeTimer()
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    playWithFade()
  }
}

onMounted(() => {
  setDefaultVolume()
  window.addEventListener('wedding-music-play', handleGlobalPlayRequest)
})

onBeforeUnmount(() => {
  clearFadeTimer()
  window.removeEventListener('wedding-music-play', handleGlobalPlayRequest)
})

defineExpose({
  playWithFade
})
</script>

<style scoped>
.song-label {
  animation: song-float 1.8s ease-in-out infinite;
}

@keyframes song-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
