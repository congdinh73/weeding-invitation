<template>
  <div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-transparent">
    <vue-particles
      id="fernParticles"
      :options="particlesOptions"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leafSvgWhite = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="rgba(255,255,255,0.4)"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 0L240 372.5l-69.6 104.4c-7.8 11.7-22.3 16.5-35.4 11.6S112 473.4 112 460.1V336H16c-11.4 0-21.7-6.9-26.6-17.5s-4-23.1 2.3-32.5L232.1 18.3C239 8.2 250.3 2 262.5 2h224c8.4 0 16.1 3.5 21.6 9.6z"/></svg>`

const leafSvgGreen = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="%23E8F3ED"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 0L240 372.5l-69.6 104.4c-7.8 11.7-22.3 16.5-35.4 11.6S112 473.4 112 460.1V336H16c-11.4 0-21.7-6.9-26.6-17.5s-4-23.1 2.3-32.5L232.1 18.3C239 8.2 250.3 2 262.5 2h224c8.4 0 16.1 3.5 21.6 9.6z"/></svg>`

const particlesOptions = ref({
  fullScreen: { enable: false, zIndex: -1 },
  fpsLimit: 60,
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "image",
      options: {
        image: [
          {
            src: leafSvgWhite,
            width: 512,
            height: 512
          },
          {
            src: leafSvgGreen,
            width: 512,
            height: 512
          }
        ]
      }
    },
    opacity: {
      value: { min: 0.1, max: 0.3 },
      random: true,
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: { min: 10, max: 25 },
      random: true
    },
    move: {
      enable: true,
      speed: { min: 0.5, max: 1.5 },
      direction: "bottom",
      random: false,
      straight: false,
      outModes: {
        default: "out"
      }
    },
    rotate: {
      value: { min: 0, max: 360 },
      random: true,
      animation: {
        enable: true,
        speed: 3,
        sync: false
      }
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 10
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: false
      },
      onClick: {
        enable: false
      }
    }
  },
  detectRetina: true
})
</script>
