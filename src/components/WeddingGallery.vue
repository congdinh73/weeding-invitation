<template>
  <section id="gallery" class="wedding-gallery-section">
    <div class="wedding-gallery-container">
      <div class="wedding-gallery-heading reveal" :ref="registerReveal">
        <p class="wedding-gallery-kicker">Our Gallery</p>
        <h2 class="wedding-gallery-title">Khoảnh khắc yêu thương</h2>
        <p class="wedding-gallery-subtitle">Một vài khoảnh khắc dịu dàng nhất chúng mình muốn giữ cùng bạn.</p>
      </div>

      <div class="wedding-gallery-grid">
        <figure
          v-for="(image, index) in galleryImages"
          :key="image.src"
          class="gallery-item reveal-image"
          :class="[
            image.featured ? 'gallery-item--featured' : '',
            `stagger-${Math.min(index + 1, 6)}`
          ]"
          :ref="registerReveal"
        >
          <picture>
            <source :srcset="image.src" type="image/webp" />
            <img :src="image.src" :alt="image.alt" loading="lazy" decoding="async" />
          </picture>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRevealAnimation } from '../composables/useRevealAnimation'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80&fm=webp', alt: 'Cô dâu chú rể trong khoảnh khắc nhẹ nhàng', featured: true },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Khoảnh khắc nắm tay giữa ánh sáng chiều', featured: false },
  { src: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Nụ cười tự nhiên của cô dâu', featured: false },
  { src: 'https://images.unsplash.com/photo-1529634892275-d9f7f0f4d17f?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Khoảnh khắc ôm nhau trong trang phục cưới', featured: false },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Chi tiết bó hoa cưới tone nhẹ', featured: false },
  { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Khoảnh khắc nhìn nhau trước lễ cưới', featured: false },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80&fm=webp', alt: 'Không gian tiệc cưới ánh nến', featured: false }
]

const { registerReveal } = useRevealAnimation({ rootMargin: '0px 0px -12% 0px', threshold: 0.12 })
</script>

<style scoped>
.wedding-gallery-section {
  background: #fff;
}

.wedding-gallery-container {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 3.5rem 1rem;
}

.wedding-gallery-heading {
  text-align: center;
}

.wedding-gallery-kicker {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(26, 67, 49, 0.5);
}

.wedding-gallery-title {
  margin: 0.7rem 0 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 4.2vw, 2.6rem);
  line-height: 1.1;
  color: #1a4331;
}

.wedding-gallery-subtitle {
  margin: 0.8rem auto 0;
  max-width: 34rem;
  font-size: 0.98rem;
  line-height: 1.8;
  color: rgba(26, 67, 49, 0.72);
}

.wedding-gallery-grid {
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.gallery-item {
  border-radius: 20px;
  overflow: hidden;
  background: #f4f8f5;
  box-shadow: 0 18px 40px -30px rgba(26, 67, 49, 0.3);
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 4 / 5;
}

@media (hover: hover) and (pointer: fine) {
  .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 24px 46px -30px rgba(26, 67, 49, 0.35);
  }
}

@media (min-width: 640px) {
  .wedding-gallery-container {
    padding: 4.2rem 1.5rem;
  }

  .wedding-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .gallery-item--featured {
    grid-column: span 2;
  }

  .gallery-item--featured img {
    aspect-ratio: 16 / 9;
  }
}

@media (min-width: 1024px) {
  .wedding-gallery-container {
    padding: 5rem 2rem;
  }

  .wedding-gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 170px;
    gap: 1rem;
  }

  .gallery-item {
    height: 100%;
  }

  .gallery-item img {
    aspect-ratio: auto;
    height: 100%;
  }

  .gallery-item--featured {
    grid-column: span 2;
    grid-row: span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-item {
    transition: none;
  }

  .gallery-item:hover {
    transform: none;
  }
}
</style>

