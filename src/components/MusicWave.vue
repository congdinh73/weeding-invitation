<template>
  <div class="music-wave" :class="{ 'is-playing': isPlaying }" aria-hidden="true">
    <span
      v-for="bar in bars"
      :key="bar"
      class="music-wave__bar"
      :class="`music-wave__bar--${bar}`"
    ></span>
  </div>
</template>

<script setup>
const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const bars = [1, 2, 3, 4]
</script>

<style scoped>
.music-wave {
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 16px;
}

.music-wave__bar {
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background-color: #1A4331;
  transform-origin: bottom;
  animation-play-state: paused;
}

.music-wave.is-playing .music-wave__bar {
  animation-play-state: running;
}

.music-wave__bar--1 {
  animation: wave-bar-1 0.82s infinite ease-in-out;
}

.music-wave__bar--2 {
  animation: wave-bar-2 0.96s infinite ease-in-out;
}

.music-wave__bar--3 {
  animation: wave-bar-3 0.74s infinite ease-in-out;
}

.music-wave__bar--4 {
  animation: wave-bar-4 1.08s infinite ease-in-out;
}

@keyframes wave-bar-1 {
  0% { height: 3px; }
  18% { height: 9px; }
  42% { height: 5px; }
  67% { height: 14px; }
  100% { height: 3px; }
}

@keyframes wave-bar-2 {
  0% { height: 3px; }
  25% { height: 13px; }
  47% { height: 6px; }
  72% { height: 11px; }
  100% { height: 3px; }
}

@keyframes wave-bar-3 {
  0% { height: 3px; }
  15% { height: 7px; }
  39% { height: 15px; }
  64% { height: 6px; }
  100% { height: 3px; }
}

@keyframes wave-bar-4 {
  0% { height: 3px; }
  20% { height: 10px; }
  44% { height: 5px; }
  70% { height: 12px; }
  100% { height: 3px; }
}
</style>