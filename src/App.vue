<template>
  <div class="relative isolate min-h-screen bg-ivory text-forest antialiased">
    <FernBackground v-if="ENABLE_FERN_PARTICLES" />
    <MusicBar ref="musicBarRef" />
    <Envelope
      v-if="!showMainContent"
      :couple-name="coupleDisplay"
      :guest-name="guestDisplayName"
      :invitation-line="inviteLine"
      :play-music="playInvitationMusic"
      @opened="showMainContent = true"
    />

    <Transition name="main-entrance">
      <div v-if="showMainContent" class="main-content-wrapper w-full">
        <ForestBackground v-if="ENABLE_FOREST_PARTICLES" />
    <ParallaxLeaves v-if="ENABLE_PARALLAX || ENABLE_LEAF_FLOAT" />
    <div class="pointer-events-none fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
      <div class="flex flex-col items-center gap-3">
        <div class="h-28 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"></div>
        <div class="rounded-full border border-gold/40 bg-white/80 px-3 py-2 text-[0.58rem] uppercase tracking-[0.42em] text-forest/55 shadow-soft backdrop-blur">
          2026
        </div>
        <div class="h-28 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"></div>
      </div>
    </div>

    <header class="site-header sticky top-0 z-30 border-b border-forest/18 bg-[#f7fbf8] shadow-[0_8px_22px_-18px_rgba(18,52,37,0.35)]">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a href="#top" class="site-brand block">
          <p class="site-brand__kicker text-[0.6rem] uppercase tracking-[0.42em] text-forest/48">Wedding Invitation</p>
          <p class="site-brand__name font-serif text-[1.12rem] leading-none text-forest sm:text-[1.18rem]">{{ coupleDisplay }}</p>
        </a>
        <button
          type="button"
          class="site-menu-btn inline-flex h-10 items-center justify-center rounded-full border border-forest/15 bg-white/65 px-4 text-[0.64rem] uppercase tracking-[0.26em] text-forest/68 transition md:hidden"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          aria-label="Mở menu điều hướng"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          Menu
        </button>
        <div
          v-if="mobileMenuOpen"
          class="site-mobile-menu absolute right-4 top-[calc(100%+0.55rem)] w-[12.5rem] rounded-[1rem] border border-forest/12 bg-[#f9fcfa] p-2.5 shadow-[0_18px_36px_-22px_rgba(18,52,37,0.26)] md:hidden"
        >
          <a href="#invitation" class="site-mobile-menu__item" @click="mobileMenuOpen = false">Lời mời</a>
          <a href="#events" class="site-mobile-menu__item" @click="mobileMenuOpen = false">Sự kiện</a>
          <a href="#gallery" class="site-mobile-menu__item" @click="mobileMenuOpen = false">Bộ sưu tập</a>
          <a href="#rsvp" class="site-mobile-menu__item" @click.prevent="mobileMenuOpen = false; scrollToRsvp()">Xác nhận tham dự</a>
        </div>
        <nav class="site-nav hidden items-center gap-7 text-[0.78rem] tracking-[0.16em] text-forest/68 md:flex">
          <a href="#invitation" class="site-nav__item transition">Lời mời</a>
          <a href="#events" class="site-nav__item transition">Sự kiện</a>
          <a href="#gallery" class="site-nav__item transition">Bộ sưu tập</a>
          <a href="#rsvp" class="site-nav__item transition" @click.prevent="scrollToRsvp">Xác nhận tham dự</a>
        </nav>
      </div>
    </header>

    <main class="relative z-10">
      <section class="hero-stage relative overflow-hidden pt-3 sm:pt-4 lg:pt-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,67,49,0.16),_transparent_36%),linear-gradient(180deg,#fff 0%,#f7fbf8 100%)]"></div>
        <div class="absolute inset-0 opacity-40 leaf-pattern"></div>

        <div class="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-11 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-8 lg:py-24">
          <div class="order-2 flex max-w-[46.5rem] flex-col justify-center gap-10 text-center lg:order-1 lg:gap-11 lg:text-left">
            <div class="stagger-item inline-flex self-center rounded-full border border-gold/35 bg-white/72 px-4 py-2 text-[0.62rem] uppercase tracking-[0.38em] text-forest/66 shadow-soft lg:self-start" style="--stagger-index: 1">
              Save the date
            </div>

            <div class="stagger-item space-y-4" style="--stagger-index: 3">
              <p class="hero-date text-[0.68rem] uppercase tracking-[0.42em] text-forest/52">{{ weddingDateLabel }}</p>
              <h1 class="luxury-stroke-title font-serif text-[2.72rem] leading-[0.97] text-forest sm:text-6xl lg:text-[5.25rem]">{{ brideName }} &amp; {{ groomName }}</h1>
              <p class="hero-copy mx-auto max-w-[36rem] text-[0.97rem] text-forest/70 lg:mx-0 lg:text-[1.02rem]">
                {{ heroGreeting }}
              </p>
            </div>

            <div class="stagger-item flex flex-wrap items-center justify-center gap-3 lg:justify-start" style="--stagger-index: 4">
              <button type="button" @click="handlePrimaryCtaClick" class="hero-btn hero-btn--primary inline-flex h-11 items-center justify-center rounded-full px-7 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-white transition duration-300">
                Xem lời mời
              </button>
              <button type="button" @click="handleSecondaryCtaClick" class="hero-btn hero-btn--secondary inline-flex h-11 items-center justify-center rounded-full border px-7 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-forest transition duration-300">
                Xem lịch trình
              </button>
            </div>

            <div class="stagger-item hero-countdown-editorial mt-2" style="--stagger-index: 5">
              <div class="hero-countdown-editorial__row">
                <span v-for="box in countdownBoxes" :key="`value-${box.label}`" class="hero-countdown-editorial__value">{{ box.value }}</span>
              </div>
              <div class="hero-countdown-editorial__row hero-countdown-editorial__row--labels">
                <span v-for="box in countdownBoxes" :key="`label-${box.label}`" class="hero-countdown-editorial__label">{{ box.label }}</span>
              </div>
            </div>
          </div>

          <div class="order-1 relative flex items-center justify-center pt-2 lg:order-2 lg:justify-end lg:pt-0">
            <div class="absolute -right-2 top-8 hidden h-20 w-20 rounded-full border border-gold/20 lg:block"></div>

            <div class="stagger-item hero-card relative w-full max-w-[20.8rem] overflow-hidden rounded-[1.45rem] border border-forest/8 bg-white/74 backdrop-blur-sm shadow-xl lg:translate-y-4 lg:-translate-x-6" style="--stagger-index: 2;">
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(26,67,49,0.04)_100%)]"></div>
              <div class="relative flex flex-col gap-4 p-5 sm:p-6">
                <div class="flex items-center justify-start">
                  <div class="premium-chip rounded-full border border-white/70 bg-white/68 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-[#1A4331] font-medium">
                    Save the date
                  </div>
                </div>

                <div class="relative flex-1 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,#f4fbf7_0%,#e8f3ed_46%,#dce9e1_100%)] aspect-[4/5] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <div class="absolute inset-0 opacity-16 photo-grain"></div>
                  <div class="absolute inset-x-9 top-10 flex items-center justify-center sm:inset-x-8 sm:top-12">
                    <div class="relative w-[85%] max-w-[250px]">
                      <div class="relative overflow-hidden rounded-[0.95rem] border border-white/55 bg-gradient-to-b from-white/15 to-white/26 shadow-[0_14px_30px_rgba(26,67,49,0.12)]">
                        <div class="aspect-[3/4] bg-[linear-gradient(180deg,#d7e6dc_0%,#f8fcfa_48%,#e4eee8_100%)]">
                          <div class="absolute inset-0 opacity-34 couple-silhouette"></div>
                        </div>
                        <div class="absolute inset-0 border-[8px] border-white/18"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="editorial-invite-panel rounded-[1.1rem] border border-white/56 bg-[#fffdf9]/66 p-3.5 flex flex-col gap-2 shadow-[0_8px_20px_-16px_rgba(26,67,49,0.26)]">
                  <p class="editorial-kicker-inline text-[0.56rem] text-[#1A4331]/54">With love</p>

                  <div class="space-y-1">
                    <p class="editorial-invite-line font-serif text-[1.5rem] leading-[1.08] text-[#1A4331] sm:text-[1.66rem]">Khoảnh khắc này</p>
                    <p class="editorial-invite-line font-serif text-[1.5rem] leading-[1.08] text-[#1A4331] sm:text-[1.66rem]">sẽ trọn vẹn hơn</p>
                    <p class="editorial-invite-line font-serif text-[1.5rem] leading-[1.08] text-[#1A4331] sm:text-[1.66rem]">khi có bạn.</p>
                  </div>

                  <p class="editorial-location mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-[#1A4331]/64">
                    Sài Gòn, Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoveStoryTimeline />

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
            Một lời mời nhỏ, cho khoảnh khắc mà chúng mình luôn mong đợi.
          </p>
          <p class="editorial-body mx-auto mt-5 max-w-2xl text-base leading-8 text-forest/75 sm:text-lg">
            Sự hiện diện của quý khách sẽ khiến ngày hôm ấy trở nên trọn vẹn hơn.
          </p>
        </div>
      </section>

      <WeddingInfo />

      <WeddingGallery />

      <section class="rsvp-cta-section bg-white" :class="{ 'is-collapsed': !rsvpCtaVisible, 'is-fading': rsvpCtaFading }">
        <div class="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <h2 class="rsvp-cta-heading font-serif text-forest">Bạn sẽ đến chứ?</h2>
          <p class="rsvp-cta-copy mx-auto mt-5 max-w-xl text-forest/68">
            Một lời hồi đáp nhỏ sẽ giúp chúng mình chuẩn bị chu đáo hơn.
          </p>
          <button type="button" class="rsvp-cta-link mt-8 inline-flex items-center gap-2 text-forest/78 transition duration-300" @click="handleRevealRsvp">
            <span>Phản hồi lời mời</span>
            <span aria-hidden="true" class="rsvp-cta-arrow">→</span>
          </button>
        </div>
      </section>

      <section id="rsvp" ref="rsvpSectionRef" class="relative bg-ivory/68" :data-rsvp-view="rsvpViewState">
        <FloatingWishes
          v-if="rsvpExpanded && !compactViewport"
          class="rsvp-floating-global"
          :reduce-motion="prefersReducedMotion"
        />
        <div class="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8" :class="rsvpExpanded ? 'py-14 lg:py-20' : 'py-0'">
          <div ref="rsvpPanelAnchorRef" class="rsvp-reveal-shell" :class="{ 'is-expanded': rsvpExpanded }">
            <div class="rsvp-panel relative z-10 rounded-[1.55rem] border border-white/55 bg-white/80 p-7 sm:p-9" :class="{ 'rsvp-panel--highlight': rsvpHighlighted }">
            <div class="relative z-10 text-center">
              <p class="text-[0.68rem] uppercase tracking-[0.45em] text-forest/48">Xác nhận tham dự</p>
              <h2 class="rsvp-heading mt-3 font-serif text-forest">{{ rsvpHeading }}</h2>
              <p v-if="!hasGuestProfile" class="mx-auto mt-2 max-w-xl text-[0.78rem] tracking-[0.06em] text-forest/52">
                Thiệp mời chung dành cho khách quý của gia đình.
              </p>
              <p class="rsvp-subtitle mx-auto mt-4 max-w-xl text-sm leading-7 text-forest/66 sm:text-[0.96rem]">
                {{ rsvpSubtitle }}
              </p>
            </div>

              <Transition name="rsvp-fade" mode="out-in">
                <form v-if="rsvpStatus === RSVP_STATUS.IDLE || rsvpStatus === RSVP_STATUS.SUBMITTING || rsvpStatus === RSVP_STATUS.ERROR" key="rsvp-form" class="mt-9 grid gap-5.5 sm:gap-6" @submit.prevent="handleRsvpSubmit">
                <label class="grid gap-2 text-[0.82rem] tracking-[0.08em] text-forest/62">
                  <span>Khách mời</span>
                  <p class="rsvp-guest-readonly rounded-[0.95rem] border border-forest/10 bg-white/78 px-4 py-3">{{ guestDisplayName }}</p>
                </label>

                <div class="grid gap-4 sm:grid-cols-1">
                  <label class="grid gap-2 text-[0.82rem] tracking-[0.08em] text-forest/62">
                    <span>Số người tham dự</span>
                    <select v-model="rsvpForm.guestCount" :disabled="isSubmitting" class="rsvp-input rounded-[0.95rem] border border-forest/8 bg-white/65 px-4 py-3 outline-none transition">
                      <option>1 người</option>
                      <option>2 người</option>
                      <option>3 người</option>
                      <option>4 người</option>
                      <option>Khác</option>
                    </select>
                  </label>
                </div>

                <label class="grid gap-2 text-[0.82rem] tracking-[0.08em] text-forest/62">
                  <span>Lời nhắn</span>
                  <textarea v-model.trim="rsvpForm.message" :disabled="isSubmitting" rows="4" placeholder="Gửi lời chúc đến chúng mình..." class="rsvp-input rounded-[0.95rem] border border-forest/8 bg-white/65 px-4 py-3 outline-none transition"></textarea>
                </label>

                <p v-if="rsvpStatus === 'error' && submitError" class="rsvp-submit-error">{{ submitError }}</p>

                <button :disabled="isSubmitting" type="submit" class="rsvp-submit-btn mt-2 inline-flex h-11 items-center justify-center rounded-full bg-forest px-7 text-[0.78rem] font-medium uppercase tracking-[0.17em] text-white transition duration-300">
                  <span v-if="isSubmitting" class="rsvp-loading-dot" aria-hidden="true"></span>
                  <span>{{ isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi' }}</span>
                </button>
              </form>

              <div v-else-if="rsvpStatus === RSVP_STATUS.SUCCESS" key="rsvp-success" class="rsvp-success-card" aria-live="polite">
                <div class="rsvp-success-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5.5 12.5 10 17l8.5-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <h3 class="rsvp-success-title">Đã nhận phản hồi của {{ guestDisplayName }}</h3>
                <p class="rsvp-success-copy">{{ thankYouLine }}</p>
                <button type="button" class="rsvp-reset-btn" @click="resetRsvpForm">Gửi phản hồi khác</button>
              </div>
              </Transition>
            </div>
          </div>
          <FloatingWishes
            v-if="rsvpExpanded && compactViewport"
            class="rsvp-mobile-strip"
            :reduce-motion="prefersReducedMotion"
            mobile-strip
          />
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
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ENABLE_FERN_PARTICLES, ENABLE_FOREST_PARTICLES, ENABLE_LEAF_FLOAT, ENABLE_PARALLAX } from './config/performance'
import { useGuest } from './composables/useGuest'
import { useRSVP } from './composables/useRSVP'

const loadEnvelopeComponent = () => import('./components/Envelope/Envelope.vue')
const loadMusicBarComponent = () => import('./components/MusicBar.vue')
const loadFernBackgroundComponent = () => import('./components/FernBackground.vue')
const loadForestBackgroundComponent = () => import('./components/ForestBackground/ForestBackground.vue')
const loadParallaxLeavesComponent = () => import('./components/ParallaxLeaves/ParallaxLeaves.vue')
const loadLoveStoryTimelineComponent = () => import('./components/LoveStoryTimeline.vue')
const loadWeddingInfoComponent = () => import('./components/WeddingInfo.vue')
const loadWeddingGalleryComponent = () => import('./components/WeddingGallery.vue')
const loadFloatingWishesComponent = () => import('./components/FloatingWishes.vue')

const Envelope = defineAsyncComponent({
  loader: loadEnvelopeComponent,
  suspensible: false
})

const MusicBar = defineAsyncComponent({
  loader: loadMusicBarComponent,
  suspensible: false
})

const FernBackground = defineAsyncComponent({
  loader: loadFernBackgroundComponent,
  suspensible: false
})

const ForestBackground = defineAsyncComponent({
  loader: loadForestBackgroundComponent,
  suspensible: false
})

const ParallaxLeaves = defineAsyncComponent({
  loader: loadParallaxLeavesComponent,
  suspensible: false
})

const LoveStoryTimeline = defineAsyncComponent({
  loader: loadLoveStoryTimelineComponent,
  suspensible: false
})

const WeddingInfo = defineAsyncComponent({
  loader: loadWeddingInfoComponent,
  suspensible: false
})

const WeddingGallery = defineAsyncComponent({
  loader: loadWeddingGalleryComponent,
  suspensible: false
})
const FloatingWishes = defineAsyncComponent({
  loader: loadFloatingWishesComponent,
  suspensible: false
})

const params = new URLSearchParams(window.location.search)
const brideName = params.get('bride') || 'Văn A'
const groomName = params.get('groom') || 'Thị B'
const eventDate = new Date(params.get('date') || '2026-12-12T10:00:00+07:00')
const { slug, guest, guestDisplayName, inviteLine, thankYouLine, heroGreeting, hasGuestProfile } = useGuest()
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const compactViewport = window.matchMedia('(max-width: 767px)').matches

const now = ref(new Date())
const showMainContent = ref(false)
const mobileMenuOpen = ref(false)
const musicBarRef = ref(null)
const rsvpSectionRef = ref(null)
const rsvpPanelAnchorRef = ref(null)
const rsvpExpanded = ref(false)
const rsvpCtaVisible = ref(true)
const rsvpCtaFading = ref(false)
const rsvpHighlighted = ref(false)
let timerId
let highlightTimerId
let rsvpCtaTimerId
let scrollAtmosphereRafId = 0

onMounted(() => {
  const preloadMainChunks = () => {
    const tasks = [
      loadLoveStoryTimelineComponent(),
      loadWeddingInfoComponent(),
      loadWeddingGalleryComponent(),
      loadFloatingWishesComponent(),
      loadMusicBarComponent()
    ]
    if (ENABLE_FERN_PARTICLES) tasks.push(loadFernBackgroundComponent())
    if (ENABLE_FOREST_PARTICLES) tasks.push(loadForestBackgroundComponent())
    if (ENABLE_PARALLAX || ENABLE_LEAF_FLOAT) tasks.push(loadParallaxLeavesComponent())
    void Promise.all(tasks)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadMainChunks, { timeout: 1500 })
  } else {
    window.setTimeout(preloadMainChunks, 1200)
  }

  window.addEventListener('scroll', handleScrollAtmosphere, { passive: true })
})

onBeforeUnmount(() => {
  window.clearInterval(timerId)
  window.clearTimeout(highlightTimerId)
  window.clearTimeout(rsvpCtaTimerId)
  if (scrollAtmosphereRafId) {
    window.cancelAnimationFrame(scrollAtmosphereRafId)
    scrollAtmosphereRafId = 0
  }
  window.removeEventListener('scroll', handleScrollAtmosphere)
})

watch(showMainContent, (isVisible) => {
  if (!isVisible) mobileMenuOpen.value = false
  if (!isVisible || timerId) return
  now.value = new Date()
  timerId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
}, { immediate: true })

const coupleDisplay = computed(() => `${brideName} & ${groomName}`)
const weddingDateLabel = computed(() => {
  const weekday = eventDate.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()
  const day = String(eventDate.getDate()).padStart(2, '0')
  const month = String(eventDate.getMonth() + 1).padStart(2, '0')
  const year = eventDate.getFullYear()
  return `${weekday}, ${day} THÁNG ${month}, ${year}`
})

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

const rsvpHeading = computed(() => `Chúng mình rất mong được gặp ${guestDisplayName}`)
const rsvpSubtitle = computed(() => `Sự hiện diện của ${guestDisplayName} sẽ khiến ngày hôm ấy trọn vẹn hơn.`)
const footerText = computed(() => `© 2026 ${brideName} & ${groomName} — Trân trọng cảm ơn`)
const { RSVP_STATUS, status: rsvpStatus, form: rsvpForm, submitError, isSubmitting, submit, reset } = useRSVP({ ...guest, slug })
const RSVP_VIEW_STATE = {
  COLLAPSED: 'collapsed',
  EXPANDED: 'expanded',
  SUBMITTING: 'submitting',
  SUCCESS: 'success'
}
const rsvpViewState = computed(() => {
  if (!rsvpExpanded.value) return RSVP_VIEW_STATE.COLLAPSED
  if (rsvpStatus.value === RSVP_STATUS.SUBMITTING) return RSVP_VIEW_STATE.SUBMITTING
  if (rsvpStatus.value === RSVP_STATUS.SUCCESS) return RSVP_VIEW_STATE.SUCCESS
  return RSVP_VIEW_STATE.EXPANDED
})

const playInvitationMusic = async () => {
  if (!musicBarRef.value) {
    await loadMusicBarComponent()
    await nextTick()
  }
  musicBarRef.value?.playWithCinematicDelay?.({ delayMs: 1000, fadeMs: 3200 })
}

const unlockMusicOnFirstIntent = async () => {
  if (!musicBarRef.value) {
    await loadMusicBarComponent()
    await nextTick()
  }
  musicBarRef.value?.unlockByInteraction?.()
  musicBarRef.value?.playWithCinematicDelay?.({ delayMs: 900, fadeMs: 2800 })
}

const handlePrimaryCtaClick = () => {
  void unlockMusicOnFirstIntent()
  scrollToInvitationSection()
}

const handleSecondaryCtaClick = () => {
  void unlockMusicOnFirstIntent()
  scrollToScheduleSection()
}

const highlightRsvpPanel = () => {
  rsvpHighlighted.value = true
  window.clearTimeout(highlightTimerId)
  highlightTimerId = window.setTimeout(() => {
    rsvpHighlighted.value = false
  }, 1200)
}

const scrollToRsvp = () => {
  if (!rsvpExpanded.value) {
    void revealRsvpInline({ shouldScroll: true })
    return
  }
  scrollToElement(rsvpPanelAnchorRef.value)
  highlightRsvpPanel()
}

const handleRevealRsvp = () => {
  void revealRsvpInline({ shouldScroll: true })
}

const revealRsvpInline = async ({ shouldScroll = false } = {}) => {
  if (rsvpExpanded.value) {
    if (shouldScroll) {
      scrollToElement(rsvpPanelAnchorRef.value)
      highlightRsvpPanel()
    }
    return
  }

  if (rsvpCtaVisible.value) {
    rsvpCtaFading.value = true
    await new Promise((resolve) => {
      window.clearTimeout(rsvpCtaTimerId)
      rsvpCtaTimerId = window.setTimeout(resolve, 320)
    })
    rsvpCtaVisible.value = false
    rsvpCtaFading.value = false
  }

  rsvpExpanded.value = true
  await nextTick()

  if (shouldScroll) {
    await new Promise((resolve) => {
      window.clearTimeout(rsvpCtaTimerId)
      rsvpCtaTimerId = window.setTimeout(resolve, 120)
    })
    scrollToElement(rsvpPanelAnchorRef.value)
    highlightRsvpPanel()
  }
}

const scrollToInvitationSection = () => {
  scrollToSection('#love-story', ['#invitation'])
}

const scrollToScheduleSection = () => {
  scrollToSection('#events')
}

const handleScrollAtmosphere = () => {
  if (scrollAtmosphereRafId) return
  scrollAtmosphereRafId = window.requestAnimationFrame(() => {
    scrollAtmosphereRafId = 0
    const viewportCenter = window.innerHeight * 0.48
    const rsvpSection = document.querySelector('#rsvp')
    const gallerySection = document.querySelector('#gallery')
    const timelineSection = document.querySelector('#love-story')

    const isInSection = (element) => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top <= viewportCenter && rect.bottom >= viewportCenter
    }

    if (isInSection(rsvpSection)) {
      musicBarRef.value?.setAtmosphere?.('rsvp')
      return
    }
    if (isInSection(gallerySection)) {
      musicBarRef.value?.setAtmosphere?.('gallery')
      return
    }
    if (isInSection(timelineSection)) {
      musicBarRef.value?.setAtmosphere?.('timeline')
      return
    }
    musicBarRef.value?.setAtmosphere?.('default')
  })
}

const scrollToSection = (primarySelector, fallbackSelectors = []) => {
  const selectors = [primarySelector, ...fallbackSelectors]
  const section = selectors
    .map((selector) => document.querySelector(selector))
    .find(Boolean)
  if (!section) return
  const header = document.querySelector('.site-header')
  const headerHeight = header ? header.getBoundingClientRect().height : 0
  const targetY = section.getBoundingClientRect().top + window.scrollY - headerHeight - 12
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(targetY, 0), behavior: reduceMotion ? 'auto' : 'smooth' })
}

const scrollToElement = (element) => {
  if (!element) return
  const header = document.querySelector('.site-header')
  const headerHeight = header ? header.getBoundingClientRect().height : 0
  const targetY = element.getBoundingClientRect().top + window.scrollY - headerHeight - 12
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(targetY, 0), behavior: reduceMotion ? 'auto' : 'smooth' })
}

const handleRsvpSubmit = async () => {
  await submit()
}

const resetRsvpForm = () => {
  reset()
  rsvpExpanded.value = true
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

.site-header {
  transition: background-color 380ms cubic-bezier(0.22, 1, 0.36, 1), border-color 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.site-brand__kicker {
  letter-spacing: 0.42em;
}

.site-brand__name {
  letter-spacing: 0.02em;
}

.site-nav__item {
  position: relative;
  color: rgba(26, 67, 49, 0.7);
  transition: color 260ms ease, transform 260ms ease;
}

.site-nav__item::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.42rem;
  height: 1px;
  transform: scaleX(0.3);
  transform-origin: left center;
  opacity: 0;
  background: linear-gradient(90deg, rgba(212, 175, 55, 0), rgba(212, 175, 55, 0.72), rgba(212, 175, 55, 0));
  transition: transform 260ms ease, opacity 260ms ease;
}

.site-nav__item:hover {
  color: #1a4331;
  transform: translateY(-1px);
}

.site-nav__item:hover::after {
  transform: scaleX(1);
  opacity: 1;
}

.site-menu-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 67, 49, 0.24);
}

.site-mobile-menu__item {
  display: block;
  border-radius: 0.64rem;
  padding: 0.56rem 0.62rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(26, 67, 49, 0.8);
  transition: background-color 220ms ease, color 220ms ease;
}

.site-mobile-menu__item:hover {
  background: rgba(232, 243, 237, 0.7);
  color: #1a4331;
}

.stagger-item {
  opacity: 0;
  transform: translate3d(0, 22px, 0);
  animation: hero-stagger-in 0.95s cubic-bezier(0.18, 0.86, 0.24, 1) forwards;
  animation-delay: calc(var(--stagger-index, 1) * 110ms + 180ms);
}

.hero-card {
  box-shadow: 0 18px 42px rgba(18, 52, 37, 0.13), 0 1px 0 rgba(255, 255, 255, 0.52) inset;
  opacity: 0.93;
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

.editorial-invite-panel {
  box-shadow: 0 14px 34px -24px rgba(26, 67, 49, 0.3);
}

.editorial-kicker-inline {
  letter-spacing: 0.08em;
}

.editorial-invite-line {
  letter-spacing: 0.008em;
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  animation: invite-line-in 1000ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.editorial-invite-line:nth-child(1) {
  animation-delay: 220ms;
}

.editorial-invite-line:nth-child(2) {
  animation-delay: 340ms;
}

.editorial-invite-line:nth-child(3) {
  animation-delay: 460ms;
}

.editorial-location {
  letter-spacing: 0.2em;
}

@keyframes invite-line-in {
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
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
  line-height: 1.9;
  color: rgba(26, 67, 49, 0.76);
}

.hero-date {
  letter-spacing: 0.42em;
}

.hero-btn {
  transition: transform 260ms ease, box-shadow 260ms ease, background-color 260ms ease, color 260ms ease, border-color 260ms ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn--primary {
  background: #1a4331;
  box-shadow: 0 14px 28px -18px rgba(18, 52, 37, 0.42);
}

.hero-btn--primary:hover {
  background: #123425;
  box-shadow: 0 16px 32px -18px rgba(18, 52, 37, 0.5);
}

.hero-btn--secondary {
  border-color: rgba(26, 67, 49, 0.18);
  background: rgba(255, 255, 255, 0.74);
}

.hero-btn--secondary:hover {
  border-color: rgba(212, 175, 55, 0.7);
  color: #c49a28;
  box-shadow: 0 14px 28px -22px rgba(18, 52, 37, 0.28);
}

.hero-countdown-editorial {
  width: min(100%, 30rem);
  margin-inline: auto;
}

.hero-countdown-editorial__row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 0.95rem;
  align-items: end;
}

.hero-countdown-editorial__value {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.64rem, 5.4vw, 2.12rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.03em;
  color: rgba(26, 67, 49, 0.76);
  text-align: center;
}

.hero-countdown-editorial__row--labels {
  margin-top: 0.4rem;
}

.hero-countdown-editorial__label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.26em;
  color: rgba(26, 67, 49, 0.54);
  text-align: center;
  white-space: nowrap;
}

.rsvp-panel {
  box-shadow: 0 18px 34px -30px rgba(18, 52, 37, 0.22);
  transition: box-shadow 860ms cubic-bezier(0.22, 1, 0.36, 1), border-color 860ms cubic-bezier(0.22, 1, 0.36, 1), background-color 860ms cubic-bezier(0.22, 1, 0.36, 1);
}

.rsvp-reveal-shell {
  position: relative;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translate3d(0, 18px, 0);
  transition: max-height 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 760ms ease, transform 760ms ease;
}

.rsvp-reveal-shell.is-expanded {
  max-height: 1600px;
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.rsvp-floating-global {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.rsvp-mobile-strip {
  position: relative;
  z-index: 1;
}

.rsvp-cta-section {
  max-height: 420px;
  overflow: hidden;
  animation: cta-fade-up 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: max-height 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 520ms ease, transform 520ms ease;
}

.rsvp-cta-section.is-collapsed {
  max-height: 0;
  opacity: 0;
  transform: translate3d(0, -8px, 0);
  pointer-events: none;
}

.rsvp-cta-section.is-fading {
  opacity: 0;
  transform: translate3d(0, -6px, 0);
  transition: opacity 320ms ease, transform 420ms ease;
}

.rsvp-cta-heading {
  font-size: clamp(1.7rem, 4vw, 2rem);
  line-height: 1.18;
  letter-spacing: 0.015em;
  font-weight: 500;
}

.rsvp-cta-copy {
  line-height: 1.95;
  letter-spacing: 0.02em;
}

.rsvp-cta-link {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  border-bottom: 1px solid rgba(26, 67, 49, 0.24);
  padding-bottom: 0.25rem;
}

.rsvp-cta-arrow {
  font-size: 0.82rem;
  transition: transform 260ms ease;
}

.rsvp-cta-link:hover {
  color: rgba(18, 52, 37, 0.98);
  border-bottom-color: rgba(26, 67, 49, 0.52);
}

.rsvp-cta-link:hover .rsvp-cta-arrow {
  transform: translateX(3px);
}

@keyframes cta-fade-up {
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.rsvp-panel--highlight {
  border-color: rgba(212, 175, 55, 0.52);
  box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.2), 0 18px 34px -28px rgba(18, 52, 37, 0.24);
}

.rsvp-heading {
  font-size: clamp(1.95rem, 5.8vw, 2.32rem);
  line-height: 1.15;
  max-width: 22ch;
  margin-left: auto;
  margin-right: auto;
  text-wrap: balance;
}

.rsvp-subtitle {
  max-width: 32ch;
  text-wrap: balance;
  line-height: 1.95;
}

.rsvp-guest-readonly {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(26, 67, 49, 0.86);
}

.rsvp-input {
  color: rgba(26, 67, 49, 0.86);
  border-color: rgba(26, 67, 49, 0.1);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: inset 0 0 0 1px rgba(26, 67, 49, 0.03);
}

.rsvp-input:disabled {
  cursor: not-allowed;
  opacity: 0.64;
}

.rsvp-input::placeholder {
  color: rgba(26, 67, 49, 0.45);
}

.rsvp-input:focus {
  border-color: rgba(212, 175, 55, 0.42);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 8px 20px -20px rgba(18, 52, 37, 0.24), inset 0 0 0 1px rgba(212, 175, 55, 0.12);
}

.rsvp-submit-btn {
  gap: 0.5rem;
  background: rgba(26, 67, 49, 0.92);
  box-shadow: 0 12px 24px -18px rgba(18, 52, 37, 0.28);
}

.rsvp-submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: rgba(18, 52, 37, 0.95);
  box-shadow: 0 14px 24px -20px rgba(18, 52, 37, 0.3);
}

.rsvp-submit-btn:disabled {
  cursor: not-allowed;
  transform: none;
  background: rgba(26, 67, 49, 0.72);
  box-shadow: 0 12px 24px -16px rgba(18, 52, 37, 0.4);
}

.rsvp-input--error {
  border-color: rgba(168, 94, 70, 0.52);
  box-shadow: 0 10px 22px -18px rgba(129, 68, 45, 0.38), inset 0 0 0 1px rgba(168, 94, 70, 0.16);
}

.rsvp-field-error {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(129, 68, 45, 0.92);
}

.rsvp-submit-error {
  margin: 0.1rem 0 0;
  text-align: center;
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(129, 68, 45, 0.92);
}

.rsvp-loading-dot {
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: rgba(255, 255, 255, 0.9);
  animation: rsvp-spin 0.8s linear infinite;
}

.rsvp-success-card {
  margin-top: 2rem;
  border-radius: 1.1rem;
  border: 1px solid rgba(26, 67, 49, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(247, 251, 248, 0.9));
  padding: 2rem 1.2rem;
  text-align: center;
  box-shadow: 0 18px 36px -28px rgba(18, 52, 37, 0.28);
}

.rsvp-success-icon {
  width: 2.15rem;
  height: 2.15rem;
  margin: 0 auto 0.95rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(26, 67, 49, 0.24);
  color: rgba(26, 67, 49, 0.86);
  background: rgba(255, 255, 255, 0.74);
}

.rsvp-success-icon svg {
  width: 1.05rem;
  height: 1.05rem;
}

.rsvp-success-title {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.5rem, 4vw, 1.92rem);
  line-height: 1.2;
  color: rgba(26, 67, 49, 0.92);
}

.rsvp-success-copy {
  margin: 0.85rem auto 0;
  max-width: 30rem;
  font-size: 0.96rem;
  line-height: 1.9;
  color: rgba(26, 67, 49, 0.74);
}

.rsvp-reset-btn {
  margin-top: 1.25rem;
  border: 1px solid rgba(26, 67, 49, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  color: rgba(26, 67, 49, 0.85);
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.68rem 1.15rem;
  transition: border-color 0.32s ease, color 0.32s ease, transform 0.32s ease;
}

.rsvp-reset-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 67, 49, 0.36);
  color: rgba(18, 52, 37, 0.98);
}

.rsvp-fade-enter-active,
.rsvp-fade-leave-active {
  transition: opacity 820ms cubic-bezier(0.22, 1, 0.36, 1), transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
}

.rsvp-fade-enter-from,
.rsvp-fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 14px, 0);
}

@media (min-width: 1024px) {
  .hero-countdown-editorial {
    margin-inline: 0;
    width: min(100%, 31rem);
  }

  .rsvp-subtitle {
    max-width: none;
    white-space: nowrap;
  }
}

@media (max-width: 420px) {
  .hero-countdown-editorial {
    width: min(100%, 21rem);
  }

  .hero-countdown-editorial__row {
    column-gap: 0.5rem;
  }

  .hero-countdown-editorial__value {
    font-size: 1.45rem;
  }

  .hero-countdown-editorial__label {
    font-size: 0.54rem;
    letter-spacing: 0.24em;
  }
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

@keyframes rsvp-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stagger-item,
  .hero-card-sheen,
  .editorial-invite-line,
  .rsvp-cta-section,
  .rsvp-reveal-shell,
  .rsvp-loading-dot {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero-btn {
    transition: none;
  }

  .site-nav__item,
  .site-menu-btn,
  .site-mobile-menu__item,
  .rsvp-cta-section,
  .rsvp-cta-link,
  .rsvp-cta-arrow,
  .rsvp-reveal-shell,
  .rsvp-submit-btn,
  .rsvp-fade-enter-active,
  .rsvp-fade-leave-active,
  .rsvp-reset-btn {
    transition: none;
  }
}

.main-entrance-enter-active {
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.1s;
}
.main-entrance-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
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
  will-change: auto;
}

@media (max-width: 767px) {
  .site-header,
  .site-mobile-menu,
  .hero-card,
  .editorial-invite-panel,
  .rsvp-panel {
    backdrop-filter: none;
  }

  .hero-card-sheen {
    display: none;
  }
}
</style>

