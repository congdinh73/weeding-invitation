<template>
  <section
    :class="[
      'fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 transition-opacity duration-1000 ease-in-out',
      isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
    ]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,67,49,0.16),_transparent_36%),linear-gradient(180deg,#fff_0%,#f7fbf8_100%)]"></div>
    <div class="leaf-pattern absolute inset-0 opacity-40"></div>
    <ParallaxLeaves />

    <div
      class="relative z-10 w-full max-w-4xl transition-transform duration-1000"
      :class="isOpening ? 'scale-[0.98]' : 'floating-animation'"
    >
      <div
        class="mb-6 mt-7 text-center transition-opacity duration-700 sm:mb-8 sm:mt-6"
        :class="{ 'opacity-0': isOpening }"
      >
        <div class="mb-4 flex items-center justify-center gap-3">
          <span class="rounded-full border border-[#1A4331]/12 bg-white/70 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-[#1A4331]/65">
            Save The Date
          </span>
        </div>

        <p class="mb-3 text-[0.72rem] uppercase tracking-[0.52em] text-[#1A4331]/60">
          Wedding Invitation
        </p>

        <h1 class="font-serif text-4xl text-[#1A4331] tracking-[0.03em] sm:text-5xl">{{ coupleName }}</h1>

        <p class="font-script mt-3 text-[2.2rem] leading-[0.92] text-[#1A4331]/88 drop-shadow-[0_1px_3px_rgba(26,67,49,0.14)] sm:text-[2.8rem]">
          We got married
        </p>
        <p class="mt-1 text-sm text-[#1A4331]/65 sm:text-base">
          It's been a long time, see you at the wedding!
        </p>
      </div>

      <div class="relative mx-auto aspect-[4/3] w-full max-w-[44rem]">
        <div class="stage absolute inset-0">
          <div class="single-envelope" :class="{ opened: isOpening }">
            <div class="envelope-base"></div>
            <div class="envelope-frame"></div>

            <div class="invite-card">
              <div class="absolute inset-[10px] rounded-[8px] border border-[#D4AF37]/30"></div>

              <p class="relative mb-2 font-serif text-[1.28rem] leading-[1.35] text-[#1A4331]">{{ invitationLine }}</p>

              <div
                class="relative mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent"
              ></div>
            </div>

            <div class="envelope-front"></div>
            <div class="envelope-flap"></div>
            <div class="ornament-corner ornament-corner-bottom-left" aria-hidden="true"></div>
            <div class="ornament-corner ornament-corner-bottom-right" aria-hidden="true"></div>
            <div class="ornament-front" aria-hidden="true"></div>
            <div class="envelope-monogram">M&Q</div>
          </div>
        </div>
      </div>

      <div
        class="mt-4 text-center transition-opacity duration-500 sm:mt-5"
        :class="{ 'opacity-0': isOpening }"
      >
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full border border-[#1A4331] bg-transparent px-10 py-3.5 font-serif text-sm uppercase tracking-[0.25em] text-[#1A4331] transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#1A4331] hover:text-white hover:shadow-[0_12px_24px_-10px_rgba(26,67,49,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
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
import { onBeforeUnmount, ref } from 'vue'
import ParallaxLeaves from '../ParallaxLeaves/ParallaxLeaves.vue'

const emit = defineEmits(['opened'])

const props = defineProps({
  playMusic: { type: Function, default: null },
  coupleName: { type: String, default: 'Văn A & Thị B' },
  guestName: { type: String, default: 'Quý khách' },
  invitationLine: { type: String, default: 'Kính mời anh/chị' }
})

const isOpening = ref(false)
const isFading = ref(false)
const timers = []

const openEnvelope = () => {
  if (isOpening.value) return

  isOpening.value = true
  timers.push(
    window.setTimeout(() => {
      props.playMusic?.()
    }, 950)
  )

  timers.push(
    window.setTimeout(() => {
      isFading.value = true
    }, 2300)
  )

  timers.push(
    window.setTimeout(() => {
      emit('opened')
    }, 3100)
  )
}

onBeforeUnmount(() => {
  timers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif;
}

.stage {
  filter: drop-shadow(0 24px 28px rgba(20, 52, 38, 0.14));
}

.single-envelope {
  position: absolute;
  top: 12.5%;
  left: 50%;
  width: 68%;
  aspect-ratio: 1.45 / 1;
  transform: translateX(-50%);
  perspective: 1200px;
  isolation: isolate;
}

/* nền phong thư */
.envelope-base {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 6px;
  background: linear-gradient(160deg, #2d6247 0%, #285a41 52%, #22503a 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.envelope-base::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image:
    radial-gradient(rgba(236, 224, 178, 0.09) 0.45px, transparent 0.45px),
    radial-gradient(rgba(18, 44, 33, 0.08) 0.5px, transparent 0.5px);
  background-size: 11px 11px, 9px 9px;
  background-position: 0 0, 5px 6px;
  opacity: 0.42;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.envelope-frame {
  position: absolute;
  inset: 10px;
  z-index: 2;
  border: 1px solid rgba(236, 224, 178, 0.36);
  border-radius: 4px;
  box-shadow: inset 0 0 0 0.5px rgba(243, 229, 171, 0.22);
  pointer-events: none;
}

/* thiệp nằm bên trong */
.invite-card {
  position: absolute;
  left: 50%;
  top: 42%;
  z-index: 3;
  width: 74%;
  min-height: 120px;
  transform: translateX(-50%);
  opacity: 0;

  border-radius: 8px;
  border: 1px solid rgba(26, 67, 49, 0.08);
  background: linear-gradient(180deg, #fffefb 0%, #fdfaf3 100%);

  padding: 2.35rem 1.6rem 2.1rem;
  text-align: center;

  box-shadow: 0 10px 22px -18px rgba(26, 67, 49, 0.2);

  transition:
    top 1100ms cubic-bezier(0.22, 1, 0.36, 1) 500ms,
    opacity 500ms ease 650ms;
}

.invite-card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 6px;
  border: 1px solid rgba(212, 175, 55, 0.82);
  box-shadow: inset 0 0 0 0.5px rgba(243, 229, 171, 0.5);
  pointer-events: none;
}

.invite-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image:
    radial-gradient(rgba(32, 45, 38, 0.045) 0.55px, transparent 0.55px),
    radial-gradient(rgba(32, 45, 38, 0.03) 0.45px, transparent 0.45px);
  background-size: 13px 13px, 9px 9px;
  background-position: 0 0, 5px 7px;
  opacity: 0.24;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.single-envelope.opened .invite-card {
  top: 6%;
  opacity: 1;
}

@media (min-width: 1024px) {
  .invite-card {
    width: 76%;
    min-height: 164px;
    padding: 2.9rem 1.9rem 2.5rem;
  }

  .single-envelope.opened .invite-card {
    top: -4%;
  }
}

/* mặt trước phong thư: chỉ là túi phẳng, không tạo V nữa */
.envelope-front {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 5;
  height: 52%;

  border-radius: 0 0 6px 6px;
  background: linear-gradient(172deg, #2b6044 0%, #214f38 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.envelope-front::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: radial-gradient(rgba(236, 224, 178, 0.08) 0.4px, transparent 0.4px);
  background-size: 10px 10px;
  opacity: 0.28;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.envelope-front::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(236, 224, 178, 0.28);
  border-radius: 2px;
}

.ornament-front {
  position: absolute;
  left: 50%;
  top: 74%;
  z-index: 6;
  width: 172px;
  height: 56px;
  transform: translate(-50%, -50%);
  opacity: 0.42;
  background:
    linear-gradient(90deg, transparent 0%, rgba(244, 233, 188, 0.65) 18%, rgba(244, 233, 188, 0.65) 82%, transparent 100%),
    radial-gradient(circle at 50% 50%, rgba(244, 233, 188, 0.4) 1px, transparent 1.3px);
  background-size: 100% 1.2px, 14px 14px;
  background-position: center, center;
  background-repeat: no-repeat, repeat;
  pointer-events: none;
}

/* nắp phong thư */
.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;

  z-index: 10;
  width: 100%;
  height: 54%;

  background: linear-gradient(180deg, #346f4f 0%, #2a5b42 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  box-shadow: 0 6px 14px -12px rgba(18, 44, 33, 0.42);

  transform-origin: top center;
  transition:
    transform 950ms cubic-bezier(0.22, 1, 0.36, 1),
    z-index 0ms linear 500ms;
}

.envelope-flap::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 14px;
  width: 86px;
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(to right, transparent, rgba(240, 231, 196, 0.5), transparent);
}

.ornament-corner {
  position: absolute;
  top: 6.6%;
  z-index: 3;
  width: 54px;
  height: 54px;
  opacity: 0.48;
  pointer-events: none;
}

.ornament-corner-bottom-left {
  left: 6.6%;
  top: auto;
  bottom: 6.6%;
  background:
    linear-gradient(90deg, rgba(244, 233, 188, 0.62), rgba(244, 233, 188, 0.62)) left bottom / 18px 1.2px no-repeat,
    linear-gradient(180deg, rgba(244, 233, 188, 0.62), rgba(244, 233, 188, 0.62)) left bottom / 1.2px 18px no-repeat,
    radial-gradient(circle at 22% 78%, rgba(244, 233, 188, 0.5) 0.9px, transparent 1.4px);
}

.ornament-corner-bottom-right {
  right: 6.6%;
  top: auto;
  bottom: 6.6%;
  background:
    linear-gradient(90deg, rgba(244, 233, 188, 0.62), rgba(244, 233, 188, 0.62)) right bottom / 18px 1.2px no-repeat,
    linear-gradient(180deg, rgba(244, 233, 188, 0.62), rgba(244, 233, 188, 0.62)) right bottom / 1.2px 18px no-repeat,
    radial-gradient(circle at 78% 78%, rgba(244, 233, 188, 0.5) 0.9px, transparent 1.4px);
}

.single-envelope.opened .envelope-flap {
  transform: rotateX(180deg);
  z-index: 0;
}

.envelope-monogram {
  position: absolute;
  left: 50%;
  top: 44.5%;
  z-index: 11;
  transform: translate(-50%, -50%);
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(247, 236, 196, 0.96);
  text-shadow:
    0 1px 0 rgba(24, 58, 41, 0.46),
    0 0 14px rgba(212, 175, 55, 0.22);
  transition: opacity 420ms ease, transform 680ms cubic-bezier(0.22, 1, 0.36, 1);
}

.envelope-monogram::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 52%;
  width: 84px;
  height: 84px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.08) 42%, transparent 72%);
  z-index: -1;
  pointer-events: none;
}

.single-envelope.opened .envelope-monogram {
  opacity: 0;
  transform: translate(-50%, -68%);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}

.floating-animation {
  animation: float 4.8s ease-in-out infinite;
}

@media (max-width: 640px) {
  .single-envelope {
    top: 15%;
    width: 74%;
  }

  .envelope-front {
    height: 48%;
  }

  .invite-card {
    top: 40%;
    width: 86%;
    padding: 1.5rem 1rem;
  }

  .single-envelope.opened .invite-card {
    top: 2%;
  }

  .ornament-front {
    width: 126px;
    height: 44px;
    opacity: 0.34;
  }

  .ornament-corner {
    width: 42px;
    height: 42px;
    opacity: 0.4;
    top: 7.4%;
  }

  .envelope-monogram {
    font-size: 1.2rem;
  }

  .envelope-monogram::before {
    width: 72px;
    height: 72px;
  }
}
</style>
