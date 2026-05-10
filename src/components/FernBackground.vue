<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent" aria-hidden="true">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,243,237,0.16),rgba(255,255,255,0)_38%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(26,67,49,0.018)_100%)]"></div>
    <vue-particles id="fernParticles" class="absolute inset-0 h-full w-full opacity-95" :options="particlesOptions" />
  </div>
</template>

<script setup>
import particlesOptions from './FernBackground/fernBackground.config.json'
</script>
