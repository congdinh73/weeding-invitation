<template>
  <div class="fixed bottom-6 left-6 z-50">
    <div 
      class="flex items-center gap-3 rounded-full border border-gold/40 bg-white/70 px-4 py-2 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-[0_25px_60px_-10px_rgba(26,67,49,0.2)] cursor-pointer"
      @click="togglePlay"
    >
      <audio ref="audioRef" src="/wedding-song.mp3" loop preload="auto"></audio>
      
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
      
      <span class="font-serif text-[0.85rem] tracking-wide text-forest mt-px">Play our song</span>

      <!-- Music Wave -->
      <div class="flex items-end gap-[3px] h-3.5 ml-1">
        <div class="w-[2px] bg-gold wave-bar" :class="{'running': isPlaying}"></div>
        <div class="w-[2px] bg-gold wave-bar" style="animation-delay: 0.2s" :class="{'running': isPlaying}"></div>
        <div class="w-[2px] bg-gold wave-bar" style="animation-delay: 0.4s" :class="{'running': isPlaying}"></div>
        <div class="w-[2px] bg-gold wave-bar" style="animation-delay: 0.1s" :class="{'running': isPlaying}"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPlaying = ref(false)
const audioRef = ref(null)

const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch((err) => {
      console.warn("Autoplay was prevented by browser:", err)
      // Nút vẫn hiển thị trạng thái pause nếu lỗi
    })
  }
}
</script>

<style scoped>
.wave-bar {
  height: 20%;
  border-radius: 2px;
  animation: wave 0.8s ease-in-out infinite alternate;
  animation-play-state: paused;
  transform-origin: bottom;
}

.wave-bar.running {
  animation-play-state: running;
}

@keyframes wave {
  0% {
    height: 20%;
  }
  100% {
    height: 100%;
  }
}
</style>
