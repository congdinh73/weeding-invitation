<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(232,243,237,0.9),_rgba(255,255,255,0)_34%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(26,67,49,0.03)_100%)]"></div>
    <vue-particles
      v-if="shouldRenderParticles"
      id="forest-background"
      class="absolute inset-0 z-10 h-full w-full opacity-95 mix-blend-multiply"
      :options="resolvedOptions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import particlesOptions from './forestBackground.config.json'
import { ENABLE_FOREST_PARTICLES } from '../../config/performance'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const mobileScreen = window.matchMedia('(max-width: 767px)').matches
const lowPowerMode = reducedMotion || mobileScreen

const shouldRenderParticles = ENABLE_FOREST_PARTICLES && !reducedMotion

const resolvedOptions = computed(() => {
  if (!lowPowerMode) return particlesOptions

  return {
    ...particlesOptions,
    fpsLimit: 18,
    detectRetina: false,
    particles: {
      ...particlesOptions.particles,
      number: {
        ...particlesOptions.particles.number,
        value: 18
      },
      move: {
        ...particlesOptions.particles.move,
        speed: 0.45,
        drift: { min: -0.2, max: 0.2 }
      },
      rotate: {
        ...particlesOptions.particles.rotate,
        animation: {
          ...particlesOptions.particles.rotate.animation,
          speed: 0.15
        }
      },
      wobble: {
        ...particlesOptions.particles.wobble,
        distance: { min: 1, max: 3 },
        speed: { min: 0.2, max: 0.35 }
      }
    }
  }
})
</script>
