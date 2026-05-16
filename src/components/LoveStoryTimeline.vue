<template>
  <section id="love-story" class="love-story-section">
    <div class="love-story-container">
      <div class="love-story-header">
        <p class="love-story-kicker reveal reveal-fade stagger-1" :ref="registerReveal">Our Love Story</p>
        <h2 class="love-story-title reveal stagger-2" :ref="registerReveal">Chuyện tình của chúng mình</h2>
      </div>

      <div class="timeline reveal-fade" :ref="registerReveal" aria-label="Love story timeline">
        <article
          v-for="(item, index) in timelineItems"
          :key="item.id"
          :ref="registerReveal"
          class="timeline-item reveal"
          :class="[`timeline-item--${index % 2 === 0 ? 'left' : 'right'}`, `stagger-${Math.min(index + 1, 6)}`]"
        >
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="timeline-card">
            <figure v-if="item.image" class="timeline-photo reveal-image" :class="item.imageTone" aria-hidden="true">
              <img class="timeline-photo-img" :src="item.imageSrc" :alt="item.title" loading="lazy" />
            </figure>
            <span class="timeline-index">{{ formatIndex(index + 1) }}</span>
            <h3 class="timeline-card-title">{{ item.title }}</h3>
            <p class="timeline-card-text">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRevealAnimation } from '../composables/useRevealAnimation'

const timelineItems = [
  { id: 'first-meet', title: 'Ngày đầu gặp nhau', text: 'Giữa những điều rất đỗi bình thường, chúng mình đã tìm thấy nhau.', image: true, imageTone: 'timeline-photo--one', imageSrc: 'https://picsum.photos/seed/wedding-first-meet/800/1000' },
  { id: 'dating-days', title: 'Những ngày yêu nhau', text: 'Cùng đi qua những ngày vui, những lần giận hờn, và cả những khoảnh khắc thật giản dị.', image: true, imageTone: 'timeline-photo--two', imageSrc: 'https://picsum.photos/seed/wedding-dating-days/800/1000' },
  { id: 'proposal', title: 'Lời cầu hôn', text: 'Một lời hứa được nói ra, cho hành trình mới mà cả hai cùng mong đợi.', image: true, imageTone: 'timeline-photo--one', imageSrc: 'https://picsum.photos/seed/wedding-proposal/800/1000' },
  { id: 'wedding-day', title: 'Ngày về chung đôi', text: 'Hôm nay, chúng mình viết tiếp câu chuyện ấy bằng một mái nhà chung.', image: true, imageTone: 'timeline-photo--two', imageSrc: 'https://picsum.photos/seed/wedding-day/800/1000' }
]

const { registerReveal } = useRevealAnimation({ rootMargin: '0px 0px -10% 0px', threshold: 0.16 })
const formatIndex = (value) => String(value).padStart(2, '0')
</script>

<style scoped>
.love-story-section {
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0) 34%),
    linear-gradient(180deg, #ffffff 0%, rgba(247, 251, 248, 0.88) 100%);
}
.love-story-container { width: 100%; max-width: 72rem; margin: 0 auto; padding: 3.5rem 1rem; }
.love-story-header { text-align: center; }
.love-story-kicker { margin: 0; font-size: 0.7rem; letter-spacing: 0.45em; text-transform: uppercase; color: rgba(26, 67, 49, 0.5); }
.love-story-title { margin: 0.75rem 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(1.85rem, 4.4vw, 2.35rem); line-height: 1.15; letter-spacing: 0.015em; color: #1a4331; text-rendering: optimizeLegibility; }
.timeline { position: relative; margin-top: 2.4rem; display: grid; gap: 1rem; }
.timeline::before { content: ''; position: absolute; left: 0.62rem; top: 0.3rem; bottom: 0.3rem; width: 1px; background: linear-gradient(180deg, rgba(212, 175, 55, 0.4), rgba(193, 116, 81, 0.36)); transform-origin: top; transform: scaleY(0); transition: transform 1000ms cubic-bezier(0.22, 1, 0.36, 1); }
.timeline.is-visible::before { transform: scaleY(1); }
.timeline-item { position: relative; padding-left: 2rem; }
.timeline-dot { position: absolute; left: 0.34rem; top: 1.15rem; width: 0.58rem; height: 0.58rem; border-radius: 16px; background: linear-gradient(140deg, #d7b48a, #c47c56); box-shadow: 0 0 0 4px rgba(255, 248, 238, 0.92); transform: scale(0.82); transition: transform 780ms cubic-bezier(0.22, 1, 0.36, 1); }
.timeline-item.is-visible .timeline-dot { transform: scale(1); }
.timeline-card { position: relative; border-radius: 16px; border: 1px solid rgba(26, 67, 49, 0.08); background: rgba(255, 255, 255, 0.82); box-shadow: 0 16px 40px -28px rgba(26, 67, 49, 0.2); padding: 1.1rem 1rem 1rem; }
.timeline-photo { width: min(45%, 170px); aspect-ratio: 4 / 5; border-radius: 16px; margin: 0 0 0.85rem; border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 12px 26px -20px rgba(26, 67, 49, 0.35); overflow: hidden; }
.timeline-photo-img { width: 100%; height: 100%; display: block; object-fit: cover; }
.timeline-photo--one { background: radial-gradient(circle at 70% 16%, rgba(255, 255, 255, 0.38), transparent 24%), linear-gradient(165deg, rgba(247, 251, 248, 0.95) 0%, rgba(216, 231, 221, 0.88) 58%, rgba(26, 67, 49, 0.2) 100%); }
.timeline-photo--two { background: radial-gradient(circle at 30% 12%, rgba(255, 255, 255, 0.34), transparent 22%), linear-gradient(165deg, rgba(251, 247, 240, 0.94) 0%, rgba(232, 243, 237, 0.88) 52%, rgba(195, 124, 86, 0.24) 100%); }
.timeline-index { position: absolute; right: 0.75rem; top: 0.5rem; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 2.25rem; line-height: 1; color: rgba(26, 67, 49, 0.11); pointer-events: none; }
.timeline-card-title { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 1.36rem; line-height: 1.2; letter-spacing: 0.012em; color: #1a4331; }
.timeline-card-text { margin: 0.6rem 0 0; font-size: 0.98rem; line-height: 1.85; color: rgba(26, 67, 49, 0.76); }
@media (min-width: 640px) { .love-story-container { padding: 3.5rem 1.5rem; } .timeline { margin-top: 2.8rem; gap: 1.25rem; } .timeline-card { padding: 1.25rem 1.2rem 1.2rem; } .timeline-photo { width: min(38%, 180px); } }
@media (min-width: 1024px) {
  .love-story-container { padding: 5rem 2rem; }
  .timeline { gap: 1.35rem; }
  .timeline::before { left: 50%; transform: translateX(-0.5px) scaleY(0); }
  .timeline.is-visible::before { transform: translateX(-0.5px) scaleY(1); }
  .timeline-item { width: 50%; padding-left: 0; padding-right: 2.2rem; }
  .timeline-item:nth-child(even) { margin-left: 50%; padding-right: 0; padding-left: 2.2rem; }
  .timeline-dot { left: auto; right: -0.31rem; }
  .timeline-item:nth-child(even) .timeline-dot { left: -0.31rem; right: auto; }
  .timeline-card { min-height: 142px; overflow: visible; }
  .timeline-photo { width: 148px; margin-top: -0.5rem; }
  .timeline-item--left .timeline-photo { margin-left: -1.25rem; }
  .timeline-item--right .timeline-photo { margin-left: auto; margin-right: -1.25rem; }
}
@media (prefers-reduced-motion: reduce) { .timeline::before, .timeline-dot { transform: none; transition: none; } }
</style>
