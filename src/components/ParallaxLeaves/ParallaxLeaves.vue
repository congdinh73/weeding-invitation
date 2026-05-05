<template>
  <div
    ref="parallaxRoot"
    class="parallax-leaves pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    aria-hidden="true"
  >
    <span class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,243,237,0.25),_rgba(255,255,255,0)_45%)]"></span>

    <span
      v-for="leaf in leaves"
      :key="leaf.id"
      class="parallax-leaf absolute select-none"
      :class="leaf.kind"
      :style="leafStyle(leaf)"
    >
      <svg
        v-if="leaf.kind === 'leaf'"
        viewBox="0 0 24 32"
        class="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C7 6.5 4.4 12.9 5.1 18.3 5.9 24.5 9.6 29 12 30c2.4-1 6.1-5.5 6.9-11.7.7-5.7-1.9-12-6-16.3Z" :fill="leaf.fill" :fill-opacity="leaf.opacity" :stroke="leaf.stroke" stroke-opacity="0.18" stroke-width="0.7" />
        <path d="M12 4.5c-1.8 3.2-2.8 6.9-2.6 10.4.2 4.1 1.6 7.7 2.6 10.1" stroke="#FFFFFF" stroke-opacity="0.24" stroke-width="1.05" stroke-linecap="round" />
      </svg>

      <span
        v-else
        class="block h-full w-full rounded-full"
        :style="{ backgroundColor: leaf.fill, opacity: leaf.opacity }"
      ></span>
    </span>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const parallaxRoot = ref(null)

const layerConfigs = [
  { depth: 0.06, count: 10, kind: 'leaf', opacity: [0.12, 0.22] },
  { depth: 0.12, count: 8, kind: 'dot', opacity: [0.14, 0.28] },
  { depth: 0.2, count: 6, kind: 'leaf', opacity: [0.16, 0.3] }
]

const palette = ['#E8F3ED', '#FFFFFF', '#1A4331']
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
        top: randomBetween(4, 96),
        left: randomBetween(4, 96),
        size,
        rotate: randomBetween(-45, 45),
        drift: randomBetween(0.75, 1.35),
        hue: palette[index % palette.length],
        fill: layer.kind === 'leaf' ? palette[(index + id) % 2] : palette[1],
        stroke: palette[2],
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
let resizeHandler
let moveHandler

const randomBetween = (min, max) => min + Math.random() * (max - min)

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const updateRootVars = () => {
  const root = parallaxRoot.value
  if (!root) return

  root.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
  root.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
}

const animate = () => {
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08
  updateRootVars()
  frameId = window.requestAnimationFrame(animate)
}

const handleMove = event => {
  const x = event.clientX / window.innerWidth - 0.5
  const y = event.clientY / window.innerHeight - 0.5

  targetX = clamp(x * 26, -26, 26)
  targetY = clamp(y * 18, -18, 18)
}

const handleResize = () => {
  targetX = 0
  targetY = 0
}

const leafStyle = leaf => ({
  '--depth': leaf.depth,
  top: `${leaf.top}%`,
  left: `${leaf.left}%`,
  width: `${leaf.size}px`,
  height: `${Math.round(leaf.size * 1.35)}px`,
  transform: `translate3d(calc(var(--parallax-x) * var(--depth) * -1), calc(var(--parallax-y) * var(--depth) * -1), 0) rotate(${leaf.rotate}deg)`,
  filter: leaf.kind === 'leaf' ? 'drop-shadow(0 8px 16px rgba(26, 67, 49, 0.08))' : 'none'
})

onMounted(() => {
  moveHandler = handleMove
  resizeHandler = handleResize

  window.addEventListener('mousemove', moveHandler, { passive: true })
  window.addEventListener('mouseleave', handleResize, { passive: true })
  window.addEventListener('blur', handleResize)
  window.addEventListener('resize', resizeHandler, { passive: true })

  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveHandler)
  window.removeEventListener('mouseleave', handleResize)
  window.removeEventListener('blur', handleResize)
  window.removeEventListener('resize', resizeHandler)

  if (frameId) {
    window.cancelAnimationFrame(frameId)
  }
})
</script>
