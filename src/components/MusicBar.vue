<template>
  <div class="music-orb-wrap">
    <audio ref="audioRef">
      <source src="/beo-dat-may-troi.mp3" type="audio/mpeg" />
    </audio>

    <button
      type="button"
      class="music-orb"
      :class="{ 'music-orb--active': isPlaying && !isMutedByUser }"
      :aria-label="isMutedByUser ? 'Bật nhạc nền' : 'Tắt nhạc nền'"
      :title="isMutedByUser ? 'Bật nhạc' : 'Tắt nhạc'"
      @click="handleToggle"
    >
      <span aria-hidden="true" class="music-orb__glyph">♪</span>
    </button>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useAudio } from '../composables/useAudio'

const audioRef = ref(null)
const {
  isPlaying,
  isMutedByUser,
  unlockByInteraction,
  startExperienceMusic,
  toggleMute,
  setAtmosphere,
  init,
  destroy
} = useAudio()

const handleToggle = async () => {
  unlockByInteraction()
  await toggleMute()
}

const playWithCinematicDelay = ({ delayMs = 1000, fadeMs = 3200 } = {}) => {
  unlockByInteraction()
  startExperienceMusic({ delayMs, fadeMs })
}

onMounted(() => {
  init(audioRef.value)
})

onBeforeUnmount(() => {
  destroy()
})

defineExpose({
  playWithCinematicDelay,
  unlockByInteraction,
  setAtmosphere
})
</script>

<style scoped>
.music-orb-wrap {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 50;
}

.music-orb {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  border: 1px solid rgba(212, 175, 55, 0.28);
  background: rgba(255, 255, 255, 0.34);
  box-shadow: 0 8px 22px -16px rgba(18, 52, 37, 0.44);
  color: rgba(26, 67, 49, 0.5);
  backdrop-filter: blur(7px);
  transition: transform 320ms ease, border-color 320ms ease, color 320ms ease, background-color 320ms ease;
}

.music-orb:hover,
.music-orb:focus-visible {
  transform: translateY(-1px);
  border-color: rgba(212, 175, 55, 0.45);
  color: rgba(26, 67, 49, 0.78);
  background: rgba(255, 255, 255, 0.52);
  outline: none;
}

.music-orb--active {
  color: rgba(26, 67, 49, 0.88);
  border-color: rgba(212, 175, 55, 0.52);
}

.music-orb__glyph {
  display: inline-flex;
  transform: translateY(-0.5px);
  font-size: 0.92rem;
  line-height: 1;
}

@media (min-width: 768px) {
  .music-orb-wrap {
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .music-orb {
    transition: none;
  }
}
</style>
