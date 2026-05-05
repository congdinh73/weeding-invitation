<template>
  <section 
    :class="[
      'fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 transition-opacity duration-1000 ease-in-out', 
      isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
    ]"
  >
    <!-- Background mờ nhẹ phía sau phong bì -->
    <div class="absolute inset-0 bg-[#F9F7F3]/90 backdrop-blur-sm"></div>

    <!-- Wrapper có hiệu ứng Floating -->
    <div 
      class="relative w-full max-w-3xl [perspective:2000px] transition-transform duration-1000"
      :class="isOpening ? 'scale-95' : 'floating-animation'"
    >
      
      <!-- Typography Tiêu đề -->
      <div class="mb-12 text-center transition-opacity duration-700" :class="{ 'opacity-0': isOpening }">
        <p class="text-[0.75rem] uppercase tracking-[0.5em] text-[#1A4331]/60 mb-3">Wedding Invitation</p>
        <h1 class="font-serif text-4xl sm:text-5xl text-[#1A4331] tracking-wide">Minh Anh & Quang Huy</h1>
      </div>

      <!-- Thân phong bì -->
      <div class="mx-auto w-full max-w-2xl relative aspect-[3/2] [transform-style:preserve-3d]">
        
        <!-- Mặt sau phong bì (Back) - Màu trắng kem off-white -->
        <div class="absolute inset-0 rounded-md bg-[#FAF9F6] shadow-[0_20px_60px_-15px_rgba(26,67,49,0.2)]"></div>
        
        <!-- Viền trang trí bên trong mặt sau -->
        <div class="absolute inset-4 border-[1.5px] border-[#1A4331]/10 rounded-sm"></div>

        <!-- Nội dung khách mời bên trong phong bì -->
        <div 
          class="absolute inset-x-0 flex flex-col items-center text-center px-8 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="isOpening ? 'top-[5%] z-40 scale-110' : 'top-1/4 z-10 scale-100'"
        >
           <p class="font-serif text-xl sm:text-2xl text-[#1A4331] mb-2 drop-shadow-sm">Thân mời</p>
           <p class="font-serif text-lg text-[#1A4331]/80 italic">{{ guestName }}</p>
        </div>

        <!-- Túi mặt trước (Front Pocket) -->
        <div class="absolute inset-x-0 bottom-0 h-[65%] bg-[#FDFCF9] rounded-b-md shadow-[0_-5px_15px_rgba(0,0,0,0.03)] z-20 border-t border-white/50 clip-front-pocket">
           <!-- Viền trang trí túi trước -->
           <div class="absolute inset-3 border border-[#1A4331]/5 rounded-sm"></div>
        </div>

        <!-- Nắp phong bì (Flap) - Màu xanh rừng đậm -->
        <div 
          class="absolute inset-x-0 top-0 h-[55%] origin-top z-30 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d]"
          :class="isOpening ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'"
        >
          <!-- Mặt ngoài nắp (Xanh) -->
          <div class="absolute inset-0 bg-[#1A4331] rounded-t-md clip-flap shadow-[0_10px_20px_rgba(0,0,0,0.15)] [backface-visibility:hidden]">
            <!-- Viền vàng đồng trang trí mép nắp -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#D4AF37]/30 clip-flap opacity-50"></div>
          </div>
          
          <!-- Mặt trong nắp (Trắng kem) - Hiển thị khi mở ra -->
          <div class="absolute inset-0 bg-[#FAF9F6] rounded-t-md clip-flap [backface-visibility:hidden] [transform:rotateX(180deg)]">
             <div class="absolute inset-2 border border-[#1A4331]/10 clip-flap"></div>
          </div>
        </div>

        <!-- Dấu niêm phong sáp (Wax Seal) - Chỉ hiện khi chưa mở -->
        <div 
          class="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500"
          :class="isOpening ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
        >
          <div class="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#AA8000] shadow-[0_8px_16px_rgba(212,175,55,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)]">
            <!-- Chi tiết sáp -->
            <div class="absolute inset-[4px] rounded-full border border-[#8B6508]/40 shadow-[inset_0_2px_6px_rgba(139,101,8,0.5)] bg-gradient-to-br from-[#D4AF37] to-[#B8860B]"></div>
            <div class="absolute inset-[8px] rounded-full border border-[#F3E5AB]/30"></div>
            <!-- Chữ lồng -->
            <span class="relative font-serif text-3xl font-bold text-[#FAF9F6] drop-shadow-[0_1px_2px_rgba(139,101,8,0.8)] tracking-tighter">M&Q</span>
          </div>
        </div>

      </div>

      <!-- Nút bấm -->
      <div class="mt-16 text-center transition-opacity duration-500" :class="{ 'opacity-0': isOpening }">
        <button
          type="button"
          class="inline-flex items-center justify-center px-10 py-4 border border-[#1A4331] rounded-full bg-transparent text-[#1A4331] font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:bg-[#1A4331] hover:text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isOpening"
          @click="openEnvelope"
        >
          Mở Thiệp
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const emit = defineEmits(['opened'])

const props = defineProps({
  guestName: {
    type: String,
    default: 'Anh/Chị'
  }
})

const isOpening = ref(false)
const isFading = ref(false)
const timers = []

const openEnvelope = () => {
  if (isOpening.value) return

  // 1. Kích hoạt animation lật nắp
  isOpening.value = true

  // 2. Sau khi nắp lật xong (1s), bắt đầu làm mờ toàn bộ component
  timers.push(window.setTimeout(() => {
    isFading.value = true
  }, 1000))

  // 3. Khi mờ hẳn (1s transition), báo cho component cha
  timers.push(window.setTimeout(() => {
    emit('opened')
  }, 2000))
}

onBeforeUnmount(() => {
  timers.forEach(t => window.clearTimeout(t))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

/* Cắt hình dạng chữ V cho nắp phong bì */
.clip-flap {
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* Cắt hình dạng túi chéo mặt trước (tuỳ chọn để trông tự nhiên hơn) */
.clip-front-pocket {
  clip-path: polygon(0 20%, 50% 0, 100% 20%, 100% 100%, 0 100%);
}

/* Hiệu ứng Floating nhấp nhô nhẹ nhàng */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating-animation {
  animation: float 4s ease-in-out infinite;
}
</style>