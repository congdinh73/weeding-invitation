<template>
  <div v-if="mobileStrip" class="mobile-wish-strip" aria-live="polite">
    <Transition name="wish-fade" mode="out-in">
      <p :key="activeWishText" class="mobile-wish-text">"{{ activeWishText }}"</p>
    </Transition>
    <p class="mobile-wish-author">Lời chúc gửi đôi bạn</p>
  </div>

  <div v-else class="floating-wishes" aria-hidden="true">
    <div
      v-for="item in visibleItems"
      :key="item.id"
      class="wish"
      :class="`wish--${item.lane}`"
      :style="item.style"
    >
      <span class="wish-text">"{{ item.text }}"</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const wishes = [
   'Chúc hai bạn mãi hạnh phúc.',
  'Mong ngày vui của hai bạn thật trọn vẹn.',
  'Chúc một hành trình mới thật đẹp.',
  'Luôn yêu thương và bình an nhé.',
  'Hẹn gặp hai bạn trong ngày đặc biệt.',
  'Chúc hai bạn luôn dịu dàng với nhau.',
  'Mong mọi điều đẹp nhất sẽ đến.',
  'Một khởi đầu thật đẹp cho hai bạn.',
  'Chúc tổ ấm nhỏ luôn đầy tiếng cười.',
  'Chúc hai bạn mãi nắm tay nhau thật lâu.',
  'Mong tình yêu của hai bạn luôn vẹn nguyên.',
  'Chúc hai em thật nhiều bình an và hạnh phúc.',
  'Hẹn gặp trong ngày vui của hai bạn nhé.',
  'Chúc hai bạn mãi là nhà của nhau.',
  'Mong mọi khoảnh khắc đều thật đáng nhớ.',
  'Chúc anh chị trăm năm hạnh phúc.',
  'Một chương mới thật đẹp bắt đầu rồi.',
  'Mong ngày hôm ấy sẽ thật trọn vẹn.',
  'Chúc hai bạn thật nhiều yêu thương.',
  'Mãi hạnh phúc nhé hai bạn.',
  'Chúc cuộc sống mới luôn ngập tràn tiếng cười.',
  'Mong hai bạn luôn đồng hành cùng nhau.',
  'Một hành trình mới đầy yêu thương nhé.',
  'Chúc tụi mình mãi hạnh phúc như hôm nay.',
  'Mong mọi điều tốt đẹp nhất sẽ ở lại.',
  'Chúc ngày đặc biệt của hai bạn thật đáng nhớ.',
  'Chúc hai em luôn bình yên và thương nhau thật nhiều.',
  'Hẹn gặp bạn trong ngày vui nhé.',
  'Mừng cho hai bạn thật nhiều.',
  'Một ngày thật đẹp dành cho hai bạn.'
]
const mobileWishes = [
   'Chúc hai bạn mãi hạnh phúc.',
  'Mong ngày vui của hai bạn thật trọn vẹn.',
  'Chúc một hành trình mới thật đẹp.',
  'Luôn yêu thương và bình an nhé.',
  'Hẹn gặp hai bạn trong ngày đặc biệt.',
  'Chúc hai bạn luôn dịu dàng với nhau.',
  'Mong mọi điều đẹp nhất sẽ đến.',
  'Một khởi đầu thật đẹp cho hai bạn.',
  'Chúc tổ ấm nhỏ luôn đầy tiếng cười.',
  'Chúc hai bạn mãi nắm tay nhau thật lâu.',
  'Mong tình yêu của hai bạn luôn vẹn nguyên.',
  'Chúc hai em thật nhiều bình an và hạnh phúc.',
  'Hẹn gặp trong ngày vui của hai bạn nhé.',
  'Chúc hai bạn mãi là nhà của nhau.',
  'Mong mọi khoảnh khắc đều thật đáng nhớ.',
  'Chúc anh chị trăm năm hạnh phúc.',
  'Một chương mới thật đẹp bắt đầu rồi.',
  'Mong ngày hôm ấy sẽ thật trọn vẹn.',
  'Chúc hai bạn thật nhiều yêu thương.',
  'Mãi hạnh phúc nhé hai bạn.',
  'Chúc cuộc sống mới luôn ngập tràn tiếng cười.',
  'Mong hai bạn luôn đồng hành cùng nhau.',
  'Một hành trình mới đầy yêu thương nhé.',
  'Chúc tụi mình mãi hạnh phúc như hôm nay.',
  'Mong mọi điều tốt đẹp nhất sẽ ở lại.',
  'Chúc ngày đặc biệt của hai bạn thật đáng nhớ.',
  'Chúc hai em luôn bình yên và thương nhau thật nhiều.',
  'Hẹn gặp bạn trong ngày vui nhé.',
  'Mừng cho hai bạn thật nhiều.',
  'Một ngày thật đẹp dành cho hai bạn.'
]

const props = defineProps({
  reduceMotion: {
    type: Boolean,
    default: false
  },
  mobileStrip: {
    type: Boolean,
    default: false
  }
})

const itemPool = [
  { id: 1, text: wishes[0], lane: 'left', laneOffset: 4, delay: 0, duration: 24.5, drift: -6 },
  { id: 2, text: wishes[1], lane: 'right', laneOffset: 4, delay: -12.4, duration: 27.2, drift: 6 },
  { id: 3, text: wishes[4], lane: 'left', laneOffset: 13, delay: -20.8, duration: 28.4, drift: -4 },
  { id: 4, text: wishes[2], lane: 'right', laneOffset: 12, delay: -6.2, duration: 25.8, drift: 5 }
]

const visibleItems = computed(() => {
  if (props.reduceMotion) return []

  return itemPool.map((item) => ({
    ...item,
    style: {
      '--wish-offset': `${item.laneOffset}%`,
      '--wish-delay': `${item.delay}s`,
      '--wish-duration': `${item.duration}s`,
      '--wish-drift': `${item.drift}px`
    }
  }))
})

const activeWishIndex = ref(0)
let rotateTimerId

onMounted(() => {
  if (!props.mobileStrip || props.reduceMotion) return
  rotateTimerId = window.setInterval(() => {
    activeWishIndex.value = (activeWishIndex.value + 1) % wishes.length
  }, 5000)
})

onBeforeUnmount(() => {
  window.clearInterval(rotateTimerId)
})

const activeWishText = computed(() => {
  const source = props.mobileStrip ? mobileWishes : wishes
  return source[activeWishIndex.value] || source[0]
})
</script>

<style scoped>
.mobile-wish-strip {
  width: min(100%, 18.75rem);
  margin: 1.8rem auto 0;
  padding-inline: 0.25rem;
  text-align: center;
  overflow: hidden;
}

.mobile-wish-text {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 1.02rem;
  line-height: 1.9;
  letter-spacing: 0.015em;
  color: rgba(26, 67, 49, 0.72);
  text-wrap: balance;
}

.mobile-wish-author {
  margin: 0.9rem 0 0;
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(26, 67, 49, 0.9);
}

.wish-fade-enter-active,
.wish-fade-leave-active {
  transition: opacity 520ms ease;
}

.wish-fade-enter-from,
.wish-fade-leave-to {
  opacity: 0;
}

.floating-wishes {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, transparent 100%);
}

.wish {
  position: absolute;
  left: var(--wish-offset);
  bottom: -22%;
  width: auto;
  max-width: none;
  white-space: nowrap;
  opacity: 0;
  color: rgba(26, 67, 49, 0.96);
  font-size: 0.98rem;
  line-height: 1.78;
  letter-spacing: 0.028em;
  animation: wish-float var(--wish-duration) ease-in-out infinite;
  animation-delay: var(--wish-delay);
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
}

.wish--left {
  text-align: left;
}

.wish--right {
  left: auto;
  right: var(--wish-offset);
  text-align: right;
}

.wish-text {
  display: inline;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 700;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.45);
}

@keyframes wish-float {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  16% {
    opacity: 0.84;
  }
  62% {
    transform: translate3d(var(--wish-drift), -44vh, 0);
    opacity: 0.7;
  }
  100% {
    transform: translate3d(calc(var(--wish-drift) * 1.2), -82vh, 0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wish-fade-enter-active,
  .wish-fade-leave-active {
    transition: none;
  }

  .wish {
    animation: none;
  }
}
</style>
