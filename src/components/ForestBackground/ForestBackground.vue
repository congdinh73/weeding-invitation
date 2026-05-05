<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(232,243,237,0.9),_rgba(255,255,255,0)_34%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(26,67,49,0.03)_100%)]"></div>
    <vue-particles
      id="forest-background"
      class="absolute inset-0 z-10 h-full w-full opacity-95 mix-blend-multiply"
      :options="particlesOptions"
    />
  </div>
</template>

<script setup>
import particlesOptions from './forestBackground.config.json'
</script>