<template>
  <div class="relative isolate min-h-screen bg-ivory text-forest antialiased">
    <FernBackground />
    <MusicBar ref="musicBarRef" />
    <Envelope v-if="!showMainContent" :couple-name="coupleDisplay" :guest-name="guestName" :play-music="playInvitationMusic" @opened="showMainContent = true" />

    <Transition name="main-entrance">
      <div v-show="showMainContent" class="main-content-wrapper w-full">
        <ForestBackground v-show="showMainContent" />
    <ParallaxLeaves v-show="showMainContent" />
    <div class="pointer-events-none fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
      <div class="flex flex-col items-center gap-3">
        <div class="h-28 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"></div>
        <div class="rounded-full border border-gold/40 bg-white/80 px-3 py-2 text-[0.58rem] uppercase tracking-[0.42em] text-forest/55 shadow-soft backdrop-blur">
          2026
        </div>
        <div class="h-28 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"></div>
      </div>
    </div>

    <header class="sticky top-0 z-30 border-b border-forest/10 bg-white/85 backdrop-blur-xl">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p class="text-[0.62rem] uppercase tracking-[0.4em] text-forest/55">Wedding Invitation</p>
          <p class="font-serif text-lg leading-none text-forest">{{ coupleDisplay }}</p>
        </div>
        <nav class="hidden items-center gap-6 text-sm tracking-[0.08em] text-forest/70 md:flex">
          <a href="#invitation" class="transition hover:text-gold">Lời mời</a>
          <a href="#events" class="transition hover:text-gold">Sự kiện</a>
          <a href="#gallery" class="transition hover:text-gold">Bộ sưu tập</a>
          <a href="#rsvp" class="transition hover:text-gold">RSVP</a>
        </nav>
      </div>
    </header>

    <main v-show="showMainContent" class="relative z-10">
      <section class="hero-stage relative overflow-hidden pt-3 sm:pt-4 lg:pt-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,67,49,0.16),_transparent_36%),linear-gradient(180deg,#fff 0%,#f7fbf8 100%)]"></div>
        <div class="absolute inset-0 opacity-40 leaf-pattern"></div>

        <div class="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-20">
          <div class="order-2 flex flex-col justify-center gap-7 text-center lg:order-1 lg:text-left">
            <div class="stagger-item inline-flex self-center rounded-full border border-gold/40 bg-white/75 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-forest/70 shadow-soft lg:self-start" style="--stagger-index: 1">
              Thân mời
            </div>

            <div class="stagger-item mx-auto flex w-full max-w-xs items-center justify-center gap-3 lg:mx-0 lg:justify-start" style="--stagger-index: 2">
              <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent"></span>
              <span class="rounded-full border border-gold/35 bg-white/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.38em] text-forest/60 shadow-soft backdrop-blur">
                Một ngày để nhớ
              </span>
              <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent"></span>
            </div>

            <div class="stagger-item space-y-3" style="--stagger-index: 3">
              <p class="text-sm uppercase tracking-[0.35em] text-forest/55">{{ weddingDateLabel }}</p>
              <h1 class="luxury-stroke-title font-serif text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-7xl">{{ brideName }} &amp; {{ groomName }}</h1>
              <p class="hero-copy mx-auto max-w-xl text-base leading-8 text-forest/75 lg:mx-0 lg:text-lg">
                Chúng tôi trân trọng kính mời gia đình và bạn bè đến chung vui trong ngày cưới. Một buổi gặp gỡ ấm áp, giản dị và tinh tế, được chuẩn bị bằng tất cả tình yêu.
              </p>
            </div>

            <div class="stagger-item flex flex-wrap items-center justify-center gap-3 lg:justify-start" style="--stagger-index: 4">
              <a href="#rsvp" class="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-forest-strong">
                Xác nhận tham dự
              </a>
              <a href="#events" class="inline-flex items-center justify-center rounded-full border border-forest/15 bg-white/75 px-6 py-3 text-sm font-medium text-forest transition duration-300 hover:border-gold hover:text-gold">
                Xem lịch trình
              </a>
            </div>

            <div class="stagger-item grid grid-cols-4 gap-3 sm:max-w-xl" style="--stagger-index: 5">
              <div v-for="(box, index) in countdownBoxes" :key="box.label" class="rounded-3xl border border-white/30 bg-white/80 p-3 text-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-lg" :style="`transform: translate3d(calc(var(--mouse-x, 0) * -${5 + index*1.5}px), calc(var(--mouse-y, 0) * -${5 + index*1.5}px), 0); will-change: transform;`">
                <p class="font-serif text-2xl text-forest sm:text-3xl">{{ box.value }}</p>
                <p class="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-forest/55">{{ box.label }}</p>
              </div>
            </div>
          </div>

          <div class="order-1 relative flex items-center justify-center pt-2 lg:order-2 lg:pt-0">
            <div class="absolute -right-4 top-6 hidden h-28 w-28 rounded-full border border-gold/30 lg:block"></div>
            <div class="absolute -left-5 bottom-10 hidden h-20 w-20 rounded-full border border-forest/15 lg:block"></div>

            <div class="stagger-item hero-card relative w-full max-w-md overflow-hidden rounded-3xl border border-forest/10 bg-white/85 backdrop-blur-md shadow-2xl" style="--stagger-index: 2; transform: translate3d(calc(var(--mouse-x, 0) * -10px), calc(var(--mouse-y, 0) * -10px), 0); will-change: transform;">
              <div class="absolute inset-[1px] rounded-[1.4rem] border border-white/70"></div>
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_40%,rgba(26,67,49,0.06)_100%)]"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(26,67,49,0.1),transparent_28%)]"></div>
              <div class="hero-card-sheen absolute inset-y-0 left-[-34%] w-[48%]"></div>
              <div class="absolute -right-8 top-10 h-24 w-24 rounded-full bg-gold/15 blur-3xl"></div>
              <div class="signature-rail absolute left-4 top-4 hidden flex-col items-start gap-2 text-forest/45 md:flex" aria-hidden="true">
                <span class="signature-rail__line h-14 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"></span>
                <span class="signature-rail__label text-[0.55rem] uppercase tracking-[0.42em]">Est. 2026</span>
              </div>

              <div class="relative flex flex-col gap-6 p-8">
                <div class="flex items-center justify-between gap-3">
                  <div class="premium-chip rounded-full border border-white/70 bg-white/75 px-3 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-[#1A4331] backdrop-blur font-medium">
                    Save the date
                  </div>
                  <div class="hidden rounded-full border border-gold/35 bg-white/75 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold backdrop-blur sm:block font-medium">
                    Minimal luxury
                  </div>
                </div>

                <div class="relative flex-1 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f4fbf7_0%,#e8f3ed_42%,#d8e7dd_100%)] aspect-[4/5] shadow-inner">
                  <div class="absolute inset-0 opacity-22 photo-grain"></div>
                  <div class="absolute inset-x-10 top-10 flex items-center justify-center sm:inset-x-8 sm:top-14">
                    <div class="relative w-[85%] max-w-[250px]">
                      <div class="absolute -left-5 top-8 h-16 w-16 rounded-full bg-gold/10 blur-3xl"></div>
                      <div class="absolute -right-7 bottom-4 h-20 w-20 rounded-full bg-forest/8 blur-3xl"></div>

                      <div class="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-b from-white/15 to-white/30 shadow-[0_24px_60px_rgba(26,67,49,0.18)]">
                        <div class="aspect-[3/4] bg-[linear-gradient(180deg,#d7e6dc_0%,#f8fcfa_48%,#e4eee8_100%)]">
                          <div class="absolute inset-0 opacity-40 couple-silhouette"></div>
                        </div>
                        <div class="absolute inset-0 border-[10px] border-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rounded-2xl border border-white/60 bg-white/70 p-5 backdrop-blur-md flex flex-col gap-2 shadow-sm">
                  <p class="font-script text-3xl text-gold">Thân mời</p>
                  
                  <div class="flex items-center justify-between mt-1">
                    <p class="font-serif text-2xl text-[#1A4331]">Ảnh cặp đôi</p>
                    <div class="rounded-full border border-[#1A4331]/20 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-[#1A4331] bg-white/60 font-medium">
                      Việt Nam
                    </div>
                  </div>
                  
                  <p class="text-sm uppercase tracking-normal font-normal text-[#1A4331]/80 mt-1">Trang phục áo dài • Tông tự nhiên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurStory />

      <section id="invitation" class="bg-white">
        <div class="invitation-panel mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
          <p class="editorial-kicker text-[0.7rem] uppercase tracking-[0.45em] text-forest/50">Lời mời</p>
          <div class="mx-auto mt-5 h-px w-16 bg-gold/60"></div>
          <div class="mx-auto mt-7 flex max-w-xl items-center justify-center gap-3 text-gold/80">
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/65 to-transparent"></span>
            <span class="text-lg">❧</span>
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/65 to-transparent"></span>
          </div>
          <p class="editorial-title mx-auto mt-6 max-w-2xl font-serif text-3xl leading-tight text-forest sm:text-4xl">
            Một lời mời chân thành, gọn gàng và đủ ấm để giữ lại trong ký ức.
          </p>
          <p class="editorial-body mx-auto mt-5 max-w-2xl text-base leading-8 text-forest/75 sm:text-lg">
            Sự hiện diện của anh/chị và gia đình là niềm vinh hạnh lớn nhất của chúng tôi trong ngày trọng đại. Rất mong được đón tiếp trong một không gian gần gũi, nhẹ nhàng và trọn vẹn yêu thương.
          </p>
        </div>
      </section>

      <section id="events" class="bg-ivory/75">
        <div class="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div class="flex flex-col gap-3 text-center">
            <p class="editorial-kicker text-[0.7rem] uppercase tracking-[0.45em] text-forest/50">Sự kiện</p>
            <h2 class="editorial-title font-serif text-3xl text-forest sm:text-4xl">Lịch trình ngày cưới</h2>
          </div>

          <div class="mt-10 grid gap-4 lg:grid-cols-3">
            <article v-for="(event, index) in events" :key="event.title" class="rounded-3xl border border-white/30 bg-white/80 p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-lg" :style="`transform: translate3d(calc(var(--mouse-x, 0) * -${7 + index*2}px), calc(var(--mouse-y, 0) * -${7 + index*2}px), 0); will-change: transform;`">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-[0.68rem] uppercase tracking-[0.35em] text-forest/50">{{ event.tag }}</p>
                  <h3 class="mt-2 font-serif text-2xl text-forest">{{ event.title }}</h3>
                </div>
                <div class="rounded-full border border-gold/35 bg-gold/8 p-3 text-gold">
                  <span class="text-lg">✦</span>
                </div>
              </div>

              <dl class="mt-6 space-y-4 text-sm text-forest/75">
                <div class="flex items-start gap-3">
                  <dt class="mt-0.5 w-16 shrink-0 text-forest/45">Thời gian</dt>
                  <dd class="font-medium text-forest">{{ event.time }}</dd>
                </div>
                <div class="flex items-start gap-3">
                  <dt class="mt-0.5 w-16 shrink-0 text-forest/45">Địa điểm</dt>
                  <dd class="font-medium text-forest">{{ event.address }}</dd>
                </div>
                <div class="flex items-start gap-3">
                  <dt class="mt-0.5 w-16 shrink-0 text-forest/45">Ghi chú</dt>
                  <dd class="text-forest/70">{{ event.note }}</dd>
                </div>
              </dl>

              <div v-if="event.map" class="mt-6 overflow-hidden rounded-[1.3rem] border border-forest/10 bg-forest/5">
                <div class="map-preview relative aspect-[16/10]">
                  <div class="absolute inset-0 opacity-70 map-grid"></div>
                  <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-white text-gold shadow-soft">⌁</div>
                    <div class="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.3em] text-forest/65">
                      Bản đồ
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="gallery" class="bg-white">
        <div class="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div class="flex flex-col gap-3 text-center">
            <p class="text-[0.7rem] uppercase tracking-[0.45em] text-forest/50">Bộ sưu tập</p>
            <h2 class="font-serif text-3xl text-forest sm:text-4xl">Khoảnh khắc dịu dàng</h2>
          </div>

          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <figure
              v-for="(photo, index) in gallery"
              :key="photo.label"
              :class="[
                'group overflow-hidden rounded-3xl border border-white/30 bg-white/80 backdrop-blur-lg shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)]',
                index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[1.2/1]' : 'aspect-[0.92/1.08]'
              ]"
              :style="`transform: translate3d(calc(var(--mouse-x, 0) * -${6 + (index%2)*3}px), calc(var(--mouse-y, 0) * -${6 + (index%2)*3}px), 0); will-change: transform;`"
            >
              <div class="relative h-full w-full photo-frame" :class="photo.tone">
                  <div class="absolute inset-0 opacity-25 photo-grain"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(180deg,rgba(26,67,49,0.04),rgba(26,67,49,0.18))]"></div>
                <div class="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 backdrop-blur-sm transition duration-300 group-hover:-translate-y-0.5">
                  <p class="text-[0.65rem] uppercase tracking-[0.3em] text-forest/55">{{ photo.label }}</p>
                  <p class="mt-1 font-serif text-xl text-forest">{{ photo.caption }}</p>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section id="rsvp" class="bg-ivory/65">
        <div class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div class="rounded-3xl border border-white/30 bg-white/80 p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-lg sm:p-8" style="transform: translate3d(calc(var(--mouse-x, 0) * -8px), calc(var(--mouse-y, 0) * -8px), 0); will-change: transform;">
            <div class="text-center">
              <p class="text-[0.7rem] uppercase tracking-[0.45em] text-forest/50">RSVP</p>
              <h2 class="mt-3 font-serif text-3xl text-forest sm:text-4xl">{{ rsvpHeading }}</h2>
              <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-forest/70 sm:text-base">
                Vui lòng cho chúng tôi biết sự hiện diện của anh/chị để chuẩn bị chu đáo nhất cho buổi lễ.
              </p>
            </div>

            <form class="mt-8 grid gap-4">
              <label class="grid gap-2 text-sm text-forest/70">
                <span>Họ và tên</span>
                <input type="text" :value="guestName" placeholder="Nhập họ tên của anh/chị" class="rounded-2xl border border-forest/10 bg-ivory/60 px-4 py-3 outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15" />
              </label>

              <div class="grid gap-4 sm:grid-cols-2">
                <label class="grid gap-2 text-sm text-forest/70">
                  <span>Số người tham dự</span>
                  <select class="rounded-2xl border border-forest/10 bg-ivory/60 px-4 py-3 outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15">
                    <option>1 người</option>
                    <option>2 người</option>
                    <option>3 người</option>
                    <option>4 người</option>
                    <option>Khác</option>
                  </select>
                </label>

                <label class="grid gap-2 text-sm text-forest/70">
                  <span>Trạng thái</span>
                  <select class="rounded-2xl border border-forest/10 bg-ivory/60 px-4 py-3 outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15">
                    <option>Tôi sẽ tham dự</option>
                    <option>Tôi chưa chắc chắn</option>
                    <option>Rất tiếc, tôi không tham dự được</option>
                  </select>
                </label>
              </div>

              <label class="grid gap-2 text-sm text-forest/70">
                <span>Lời nhắn</span>
                <textarea rows="4" placeholder="Lời chúc gửi đến cô dâu chú rể..." class="rounded-2xl border border-forest/10 bg-ivory/60 px-4 py-3 outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15"></textarea>
              </label>

              <button type="button" class="mt-2 inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-forest-strong">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-forest/10 bg-white">
      <div class="mx-auto w-full max-w-6xl px-4 py-8 text-center text-sm text-forest/60 sm:px-6 lg:px-8">
        {{ footerText }}
      </div>
    </footer>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Envelope from './components/Envelope/Envelope.vue'
import ForestBackground from './components/ForestBackground/ForestBackground.vue'
import FernBackground from './components/FernBackground.vue'
import MusicBar from './components/MusicBar.vue'
import OurStory from './components/OurStory.vue'
import ParallaxLeaves from './components/ParallaxLeaves/ParallaxLeaves.vue'

const params = new URLSearchParams(window.location.search)
const brideName = params.get('bride') || 'Minh Anh'
const groomName = params.get('groom') || 'Quang Huy'
const guestName = params.get('guest') || 'Quý khách'
const eventDate = new Date(params.get('date') || '2026-12-12T10:00:00+07:00')

const now = ref(new Date())
const showMainContent = ref(false)
const musicBarRef = ref(null)
let timerId

onMounted(() => {
  timerId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  // Bắt đầu vòng lặp Parallax
  window.addEventListener('mousemove', onMouseMove)
  requestAnimationFrame(parallaxLoop)
})

onBeforeUnmount(() => {
  window.clearInterval(timerId)
  window.removeEventListener('mousemove', onMouseMove)
})

// Logic Parallax
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

const onMouseMove = (e) => {
  targetX = ((e.clientX / window.innerWidth) * 2 - 1) * 0.58
  targetY = ((e.clientY / window.innerHeight) * 2 - 1) * 0.58
}

const parallaxLoop = () => {
  currentX += (targetX - currentX) * 0.022
  currentY += (targetY - currentY) * 0.022
  
  if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
    document.documentElement.style.setProperty('--mouse-x', currentX.toFixed(4))
    document.documentElement.style.setProperty('--mouse-y', currentY.toFixed(4))
  }
  
  requestAnimationFrame(parallaxLoop)
}

const coupleDisplay = computed(() => `${brideName} & ${groomName}`)
const weddingDateLabel = computed(() => eventDate.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }))

const countdownParts = computed(() => {
  const diff = Math.max(eventDate.getTime() - now.value.getTime(), 0)
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
})

const countdownBoxes = computed(() => ([
  { label: 'Ngày', value: countdownParts.value.days },
  { label: 'Giờ', value: countdownParts.value.hours },
  { label: 'Phút', value: countdownParts.value.minutes },
  { label: 'Giây', value: countdownParts.value.seconds }
]))

const events = [
  {
    tag: 'Nhà trai',
    title: 'Lễ Vu Quy',
    time: '08:00 • Chủ nhật, 12/12/2026',
    address: 'Tư gia nhà trai, TP. Hồ Chí Minh',
    note: 'Đón khách trong không gian sân vườn nhẹ nhàng, trang trí bằng lá xanh và nến vàng kim.',
    map: true
  },
  {
    tag: 'Nhà gái',
    title: 'Lễ Thành Hôn',
    time: '10:30 • Chủ nhật, 12/12/2026',
    address: 'Tư gia nhà gái, TP. Hồ Chí Minh',
    note: 'Nghi thức gia tiên ấm cúng, giản dị và trang nhã.',
    map: false
  },
  {
    tag: 'Tiệc cưới',
    title: 'Chung vui cùng chúng tôi',
    time: '17:30 • Chủ nhật, 12/12/2026',
    address: 'Nhà hàng Hồng Hạc, Quận 1',
    note: 'Không gian tiệc tối tối giản, ánh sáng ấm và bàn tiệc tinh tế.',
    map: true
  }
]

const gallery = [
  { label: 'Khoảnh khắc', caption: 'Áo dài đôi', tone: 'photo-tone-one' },
  { label: 'Lễ nghi', caption: 'Gia tiên', tone: 'photo-tone-two' },
  { label: 'Tự nhiên', caption: 'Nụ cười', tone: 'photo-tone-three' },
  { label: 'Chi tiết', caption: 'Hoa cưới', tone: 'photo-tone-four' }
]

const rsvpHeading = computed(() => `Anh/Chị ${guestName}, vui lòng xác nhận tham dự`)
const footerText = computed(() => `© 2026 ${brideName} & ${groomName} — Trân trọng cảm ơn`)

const playInvitationMusic = () => {
  musicBarRef.value?.playWithFade?.()
}

</script>

<style scoped>
.hero-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 82% 12%, rgba(212, 175, 55, 0.12), transparent 22%),
    linear-gradient(110deg, transparent 36%, rgba(255, 255, 255, 0.34) 52%, transparent 66%);
  mix-blend-mode: soft-light;
}

.stagger-item {
  opacity: 0;
  transform: translate3d(0, 22px, 0);
  animation: hero-stagger-in 0.95s cubic-bezier(0.18, 0.86, 0.24, 1) forwards;
  animation-delay: calc(var(--stagger-index, 1) * 110ms + 180ms);
}

.hero-card {
  box-shadow: 0 32px 68px rgba(18, 52, 37, 0.18), 0 2px 0 rgba(255, 255, 255, 0.6) inset;
}

.signature-rail__label {
  transform: translateX(0.08rem);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.hero-card-sheen {
  background: linear-gradient(92deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0));
  opacity: 0.28;
  transform: skewX(-14deg);
  animation: hero-sheen 10s ease-in-out infinite;
}

.premium-chip {
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

.editorial-kicker {
  letter-spacing: 0.5em;
  text-transform: uppercase;
}

.editorial-title {
  letter-spacing: 0.02em;
  text-wrap: balance;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.65);
}

.editorial-body {
  line-height: 1.95;
  color: rgba(26, 67, 49, 0.74);
}

.luxury-stroke-title {
  letter-spacing: 0.012em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.55), 0 16px 36px rgba(18, 52, 37, 0.12);
}

.hero-copy {
  line-height: 1.95;
  color: rgba(26, 67, 49, 0.76);
}

@keyframes hero-stagger-in {
  from {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes hero-sheen {
  0%,
  22% {
    transform: translateX(0) skewX(-14deg);
    opacity: 0;
  }
  40% {
    opacity: 0.3;
  }
  58% {
    transform: translateX(380%) skewX(-14deg);
    opacity: 0;
  }
  100% {
    transform: translateX(380%) skewX(-14deg);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stagger-item,
  .hero-card-sheen {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.main-entrance-enter-active {
  transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.1s;
}
.main-entrance-leave-active {
  transition: all 0.5s ease;
}
.main-entrance-enter-from,
.main-entrance-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(20px);
}
.main-entrance-enter-to,
.main-entrance-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.main-content-wrapper {
  transform-origin: center 40vh;
  will-change: transform, opacity;
}
</style>
