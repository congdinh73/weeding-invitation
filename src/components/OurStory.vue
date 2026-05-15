<template>
  <section id="our-story" class="relative z-10 mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
    <div 
      ref="storyCard"
      class="mx-auto max-w-2xl rounded-3xl border border-white/40 bg-white/50 p-8 text-center shadow-[0_20px_50px_-10px_rgba(26,67,49,0.1)] backdrop-blur-sm transition-all duration-1000 ease-out sm:p-12 lg:p-16"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
    >
      <h2 class="font-dancing text-4xl text-[#1A4331] sm:text-5xl lg:text-6xl mb-6">Chuyện chúng mình</h2>
      
      <p class="mx-auto max-w-lg font-serif text-base leading-loose text-[#1A4331]/90 sm:text-lg">
        Gặp nhau giữa thành phố vội vã, nhưng lại tìm thấy ở nhau một nhịp đập 
        rất đỗi bình yên. Chúng tôi đã cùng nhau đi qua những ngày nắng nhẹ và những 
        cơn mưa rào, để rồi nhận ra, nơi đâu có nhau, nơi đó là nhà. 
        <span class="font-dancing text-2xl font-bold ml-1 text-gold">Cảm ơn</span> vì đã cùng tôi viết nên 
        một chương tuyệt vời nhất của thanh xuân.
      </p>

      <div class="mt-8 flex justify-center text-[#1A4331]/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const storyCard = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, {
    threshold: 0.3
  })

  if (storyCard.value) {
    observer.observe(storyCard.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.font-dancing {
  font-family: 'Dancing Script', cursive;
}
</style>

