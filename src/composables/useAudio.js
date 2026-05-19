import { computed, ref } from 'vue'

const STORAGE_KEY = 'wedding_music_pref_v1'
const MOBILE_QUERY = '(max-width: 767px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const DESKTOP_BASE_VOLUME = 0.2
const MOBILE_BASE_VOLUME = 0.14
const MIN_VOLUME = 0.08
const MAX_VOLUME = 0.24

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function useAudio() {
  const audioEl = ref(null)
  const isPlaying = ref(false)
  const hasStarted = ref(false)
  const hasInteracted = ref(false)
  const isMutedByUser = ref(false)
  const atmosphere = ref('default')
  const fadeTimerId = ref(null)
  const pendingStartTimerId = ref(null)
  const mobileMediaQuery = window.matchMedia(MOBILE_QUERY)
  const isMobileViewport = ref(mobileMediaQuery.matches)
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

  const desktopAtmosphereScaleMap = {
    default: 1,
    gallery: 1.08,
    timeline: 1.04,
    rsvp: 0.8
  }
  const mobileAtmosphereScaleMap = {
    default: 1,
    gallery: 1.2,
    timeline: 1.12,
    rsvp: 0.74
  }

  const targetVolume = computed(() => {
    const baseVolume = isMobileViewport.value ? MOBILE_BASE_VOLUME : DESKTOP_BASE_VOLUME
    const atmosphereScaleMap = isMobileViewport.value ? mobileAtmosphereScaleMap : desktopAtmosphereScaleMap
    const scale = atmosphereScaleMap[atmosphere.value] ?? 1
    return clamp(baseVolume * scale, MIN_VOLUME, MAX_VOLUME)
  })

  const clearFadeTimer = () => {
    if (!fadeTimerId.value) return
    window.clearInterval(fadeTimerId.value)
    fadeTimerId.value = null
  }

  const clearPendingStart = () => {
    if (!pendingStartTimerId.value) return
    window.clearTimeout(pendingStartTimerId.value)
    pendingStartTimerId.value = null
  }

  const fadeVolume = (from, to, durationMs = 2800) => {
    if (!audioEl.value) return
    clearFadeTimer()
    if (prefersReducedMotion || durationMs <= 0) {
      audioEl.value.volume = to
      return
    }
    audioEl.value.volume = from
    const start = window.performance.now()
    fadeTimerId.value = window.setInterval(() => {
      if (!audioEl.value) {
        clearFadeTimer()
        return
      }
      const elapsed = window.performance.now() - start
      const progress = Math.min(elapsed / durationMs, 1)
      const nextVolume = from + ((to - from) * progress)
      audioEl.value.volume = clamp(nextVolume, 0, 1)
      if (progress >= 1) clearFadeTimer()
    }, 50)
  }

  const loadStoredPreferences = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      isMutedByUser.value = Boolean(parsed?.mutedByUser)
    } catch {
      isMutedByUser.value = false
    }
  }

  const persistPreferences = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        mutedByUser: isMutedByUser.value
      }))
    } catch {
      // Ignore storage failures on private mode or strict browsers.
    }
  }

  const applyMuteState = () => {
    if (!audioEl.value) return
    const mutedForAutoplayPolicy = isMobileViewport.value && !hasInteracted.value
    audioEl.value.muted = isMutedByUser.value || mutedForAutoplayPolicy
  }

  const handleViewportChange = (event) => {
    isMobileViewport.value = event.matches
    applyMuteState()
    if (!audioEl.value || !isPlaying.value) return
    fadeVolume(audioEl.value.volume, targetVolume.value, 900)
  }

  const unlockByInteraction = () => {
    hasInteracted.value = true
    applyMuteState()
  }

  const playNow = async ({ fadeMs = 3200 } = {}) => {
    if (!audioEl.value || isMutedByUser.value || !hasInteracted.value) return
    applyMuteState()
    if (!isPlaying.value) {
      try {
        await audioEl.value.play()
      } catch (error) {
        console.warn('Audio playback was prevented by browser:', error)
        return
      }
      isPlaying.value = true
      hasStarted.value = true
      fadeVolume(0, targetVolume.value, fadeMs)
      return
    }
    fadeVolume(audioEl.value.volume, targetVolume.value, 1600)
  }

  const startExperienceMusic = ({ delayMs = 1000, fadeMs = 3200 } = {}) => {
    if (!hasInteracted.value || isMutedByUser.value) return
    if (hasStarted.value || pendingStartTimerId.value) return
    clearPendingStart()
    pendingStartTimerId.value = window.setTimeout(() => {
      pendingStartTimerId.value = null
      void playNow({ fadeMs })
    }, delayMs)
  }

  const toggleMute = async () => {
    isMutedByUser.value = !isMutedByUser.value
    persistPreferences()
    applyMuteState()
    if (!isMutedByUser.value && hasInteracted.value) {
      await playNow({ fadeMs: 1800 })
      return
    }
    if (isMutedByUser.value && isPlaying.value && audioEl.value) {
      clearFadeTimer()
      audioEl.value.pause()
      isPlaying.value = false
    }
  }

  const setAtmosphere = (nextAtmosphere = 'default') => {
    atmosphere.value = nextAtmosphere
    if (!audioEl.value || !isPlaying.value) return
    fadeVolume(audioEl.value.volume, targetVolume.value, 1300)
  }

  const init = (element) => {
    audioEl.value = element
    if (!audioEl.value) return
    loadStoredPreferences()
    audioEl.value.loop = true
    audioEl.value.preload = 'none'
    audioEl.value.volume = 0
    audioEl.value.setAttribute('playsinline', '')
    applyMuteState()
    mobileMediaQuery.addEventListener('change', handleViewportChange)
  }

  const destroy = () => {
    clearFadeTimer()
    clearPendingStart()
    mobileMediaQuery.removeEventListener('change', handleViewportChange)
  }

  return {
    isPlaying,
    isMutedByUser,
    hasStarted,
    unlockByInteraction,
    startExperienceMusic,
    toggleMute,
    setAtmosphere,
    init,
    destroy
  }
}
