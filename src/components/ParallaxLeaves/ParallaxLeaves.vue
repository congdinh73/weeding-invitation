<template>
  <div
    ref="parallaxRoot"
    class="parallax-leaves pointer-events-none fixed inset-0 z-[12] overflow-hidden"
    aria-hidden="true"
  >
    <span class="absolute inset-0 opacity-55 bg-[radial-gradient(circle_at_top,_rgba(232,243,237,0.2),_rgba(255,255,255,0)_45%)]"></span>

    <span
      v-for="leaf in leaves"
      :key="leaf.id"
      class="parallax-leaf absolute select-none"
      :class="leaf.kind"
      :style="leafStyle(leaf)"
    >
      <span class="leaf-motion block h-full w-full" :style="leafMotionStyle(leaf)">
        <svg
          v-if="leaf.kind === 'leaf'"
          viewBox="0 0 24 32"
          class="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C9.3 3.3 6.9 5.5 5.4 8.5 3.8 11.8 3.2 15.5 4 19c.9 4.1 3.2 7.5 6.5 10 0.8.6 1.3.9 1.5 1 .2-.1.7-.4 1.5-1 3.3-2.5 5.6-5.9 6.5-10 .8-3.5.2-7.2-1.4-10.5C17.1 5.5 14.7 3.3 12 2Z" :fill="leaf.fill" :fill-opacity="leaf.opacity" :stroke="leaf.stroke" stroke-opacity="0.36" stroke-width="0.82" />
          <path d="M12 3.9c-.9 4.4-1.2 8.9-.8 13.2.2 2.8.7 5.4 1.4 7.9" :stroke="leaf.vein" stroke-opacity="0.5" stroke-width="0.95" stroke-linecap="round" />
          <path d="M11.8 7.7c-1.8 1.1-3.4 2.1-5 3.7" :stroke="leaf.vein" stroke-opacity="0.34" stroke-width="0.74" stroke-linecap="round" />
          <path d="M12.1 10.7c1.7 1 3.5 2.3 5.2 4" :stroke="leaf.vein" stroke-opacity="0.34" stroke-width="0.74" stroke-linecap="round" />
          <path d="M12 13.7c-1.5 1-2.9 2.2-4.1 3.8" :stroke="leaf.vein" stroke-opacity="0.28" stroke-width="0.68" stroke-linecap="round" />
        </svg>

        <span
          v-else
          class="block h-full w-full"
        >
          <svg viewBox="0 0 18 28" class="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.7C6.9 2.9 5.2 4.8 4.1 7.2 2.9 9.8 2.5 12.7 3 15.4c.6 3.1 2.2 5.8 4.7 7.9.6.5 1 .8 1.3.9.3-.1.7-.4 1.3-.9 2.5-2.1 4.1-4.8 4.7-7.9.5-2.7.1-5.6-1.1-8.2C12.8 4.8 11.1 2.9 9 1.7Z" :fill="leaf.fill" :fill-opacity="leaf.opacity" :stroke="leaf.stroke" stroke-opacity="0.32" stroke-width="0.7" />
            <path d="M9 4.2c-.5 3.2-.6 6.2-.3 9 .1 1.5.4 2.9.8 4.2" :stroke="leaf.vein" stroke-opacity="0.42" stroke-width="0.9" stroke-linecap="round" />
          </svg>
        </span>
      </span>
    </span>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const parallaxRoot = ref(null)

const layerConfigs = [
  { depth: 0.06, count: 16, kind: 'leaf', opacity: [0.24, 0.42] },
  { depth: 0.12, count: 12, kind: 'dot', opacity: [0.2, 0.36] },
  { depth: 0.2, count: 10, kind: 'leaf', opacity: [0.28, 0.48] }
]

const leafPalette = ['#D8EBDD', '#B5D5C4', '#6A9A83', '#356D57']
const dotPalette = ['#8DB59E', '#5E8E78', '#1A4331']
const leaves = computed(() => {
  const items = []
  let id = 0

  for (const layer of layerConfigs) {
    for (let index = 0; index < layer.count; index += 1) {
      const size = layer.kind === 'leaf' ? randomBetween(18, 42) : randomBetween(6, 12)
      items.push({
        id: `parallax-${id += 1}`,
        kind: layer.kind,
        depth: layer.depth,
        top: randomBetween(-18, 100),
        left: randomBetween(4, 96),
        size,
        rotate: randomBetween(-45, 45),
        drift: randomBetween(0.75, 1.35),
        sway: randomBetween(10, 26),
        duration: randomBetween(12, 22),
        delay: randomBetween(-20, 0),
        fill: layer.kind === 'leaf'
          ? leafPalette[(index + id) % leafPalette.length]
          : dotPalette[(index + id) % dotPalette.length],
        stroke: '#163B2C',
        vein: '#0D2A1F',
        opacity: randomBetween(layer.opacity[0], layer.opacity[1])
      })
    }
  }

  return items
})

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0
let frameId = 0
let isActive = false
let resizeHandler
let moveHandler
let visibilityHandler

const randomBetween = (min, max) => min + Math.random() * (max - min)

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const updateRootVars = () => {
  const root = parallaxRoot.value
  if (!root) return

  root.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
  root.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
}

const animate = () => {
  if (!isActive) return
  currentX += (targetX - currentX) * 0.024
  currentY += (targetY - currentY) * 0.024
  updateRootVars()
  frameId = window.requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (isActive) return
  isActive = true
  frameId = window.requestAnimationFrame(animate)
}

const stopAnimation = () => {
  if (!isActive) return
  isActive = false
  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = 0
  }
}

const handleMove = event => {
  const x = event.clientX / window.innerWidth - 0.5
  const y = event.clientY / window.innerHeight - 0.5

  targetX = clamp(x * 7, -7, 7)
  targetY = clamp(y * 5, -5, 5)
}

const handleResize = () => {
  targetX = 0
  targetY = 0
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

const leafStyle = leaf => ({
  '--depth': leaf.depth,
  top: `${leaf.top}%`,
  left: `${leaf.left}%`,
  width: `${leaf.size}px`,
  height: `${Math.round(leaf.size * 1.35)}px`,
  transform: `translate3d(calc(var(--parallax-x) * var(--depth) * -1), calc(var(--parallax-y) * var(--depth) * -1), 0) rotate(${leaf.rotate}deg)`,
  filter: leaf.kind === 'leaf' ? 'drop-shadow(0 4px 8px rgba(22, 59, 44, 0.1))' : 'none'
})

const leafMotionStyle = leaf => ({
  animationDuration: `${leaf.duration.toFixed(2)}s`,
  animationDelay: `${leaf.delay.toFixed(2)}s`,
  animationTimingFunction: 'linear',
  transformOrigin: 'center'
})

onMounted(() => {
  moveHandler = handleMove
  resizeHandler = handleResize

  window.addEventListener('mousemove', moveHandler, { passive: true })
  window.addEventListener('mouseleave', handleResize, { passive: true })
  window.addEventListener('blur', handleResize)
  window.addEventListener('resize', resizeHandler, { passive: true })
  visibilityHandler = handleVisibilityChange
  document.addEventListener('visibilitychange', visibilityHandler)

  startAnimation()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveHandler)
  window.removeEventListener('mouseleave', handleResize)
  window.removeEventListener('blur', handleResize)
  window.removeEventListener('resize', resizeHandler)
  document.removeEventListener('visibilitychange', visibilityHandler)
  stopAnimation()
})
</script>
