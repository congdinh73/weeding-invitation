import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { ENABLE_REVEAL_ANIMATION } from '../config/performance'

const REVEAL_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function useRevealAnimation(options = {}) {
  const {
    rootMargin = '0px 0px -12% 0px',
    threshold = 0.15
  } = options

  const elements = new Set()
  let observer = null
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const disableReveal = reducedMotion || !ENABLE_REVEAL_ANIMATION

  const makeVisible = (el) => {
    el.classList.add('is-visible')
    el.dataset.revealDone = 'true'
  }

  const registerReveal = (el) => {
    if (!el || elements.has(el)) return
    elements.add(el)

    if (disableReveal) {
      makeVisible(el)
      return
    }

    if (observer && el.dataset.revealDone !== 'true') {
      observer.observe(el)
    }
  }

  const refreshReveal = async () => {
    await nextTick()
    if (disableReveal) {
      elements.forEach((el) => makeVisible(el))
      return
    }
    if (!observer) return
    elements.forEach((el) => {
      if (el.dataset.revealDone !== 'true') observer.observe(el)
    })
  }

  onMounted(() => {
    if (disableReveal) {
      elements.forEach((el) => makeVisible(el))
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        makeVisible(entry.target)
        observer?.unobserve(entry.target)
      })
    }, {
      rootMargin,
      threshold
    })

    elements.forEach((el) => {
      if (el.dataset.revealDone !== 'true') observer.observe(el)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    elements.clear()
  })

  return {
    registerReveal,
    refreshReveal,
    REVEAL_EASING
  }
}
