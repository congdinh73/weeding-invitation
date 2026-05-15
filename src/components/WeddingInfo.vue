<template>
  <section id="events" class="wedding-info-section">
    <div class="wedding-info-container">
      <div class="wedding-info-heading reveal" :ref="registerReveal">
        <p class="wedding-info-kicker">Wedding Info</p>
        <h2 class="wedding-info-title">Thông tin lễ cưới</h2>
        <p class="wedding-info-subtitle">
          Trân trọng mời bạn đến chung vui cùng {{ info.brideName }} &amp; {{ info.groomName }}.
        </p>
      </div>

      <div class="wedding-info-grid">
        <article class="info-card reveal stagger-1" :ref="registerReveal">
          <div class="info-label">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v3M17 2v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>
            <span>Ngày cưới</span>
          </div>
          <p class="info-main">{{ dateLabel }}</p>
          <button class="info-btn info-btn--secondary" type="button" @click="openCalendar">
            Thêm vào lịch
          </button>
        </article>

        <article class="info-card reveal stagger-2" :ref="registerReveal">
          <div class="info-label">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Giờ tổ chức</span>
          </div>
          <p class="info-main">{{ timeLabel }}</p>
          <p class="info-note">{{ info.dressCode }}</p>
        </article>

        <article class="info-card reveal stagger-3" :ref="registerReveal">
          <div class="info-label">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span>Địa điểm</span>
          </div>
          <p class="info-main">{{ info.venueName }}</p>
          <p class="info-note">{{ info.venueAddress }}</p>
          <a class="info-btn info-btn--primary" :href="info.googleMapsUrl" target="_blank" rel="noopener noreferrer">
            Mở Google Maps
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRevealAnimation } from '../composables/useRevealAnimation'

const info = {
  brideName: 'Văn A',
  groomName: 'Thị B',
  weddingDate: '2026-12-12',
  startTime: '17:30',
  endTime: '21:00',
  venueName: 'Nhà hàng Hồng Hạc',
  venueAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  googleMapsUrl: 'https://maps.google.com/?q=123+Nguyen+Hue+Quan+1+Ho+Chi+Minh',
  dressCode: 'Dress Code: Trang phục pastel / nhã nhặn'
}

const { registerReveal } = useRevealAnimation({ rootMargin: '0px 0px -12% 0px', threshold: 0.12 })

const dateLabel = computed(() =>
  new Date(`${info.weddingDate}T00:00:00+07:00`).toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
)

const timeLabel = computed(() => `${info.startTime} – ${info.endTime}`)

const googleCalendarUrl = computed(() => {
  const start = `${info.weddingDate.replaceAll('-', '')}T${info.startTime.replace(':', '')}00`
  const end = `${info.weddingDate.replaceAll('-', '')}T${info.endTime.replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Wedding ${info.brideName} & ${info.groomName}`,
    dates: `${start}/${end}`,
    location: `${info.venueName}, ${info.venueAddress}`,
    details: 'Trân trọng kính mời bạn tham dự lễ cưới của chúng tôi.'
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
})

const openCalendar = () => {
  window.open(googleCalendarUrl.value, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.wedding-info-section {
  background: linear-gradient(180deg, rgba(247, 251, 248, 0.84) 0%, rgba(255, 255, 255, 0.95) 100%);
}

.wedding-info-container {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 3.5rem 1rem;
}

.wedding-info-heading {
  text-align: center;
}

.wedding-info-kicker {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(26, 67, 49, 0.5);
}

.wedding-info-title {
  margin: 0.7rem 0 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 4.2vw, 2.6rem);
  line-height: 1.1;
  color: #1a4331;
}

.wedding-info-subtitle {
  margin: 0.8rem auto 0;
  max-width: 36rem;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(26, 67, 49, 0.72);
}

.wedding-info-grid {
  margin-top: 1.8rem;
  display: grid;
  gap: 0.85rem;
}

.info-card {
  border-radius: 22px;
  border: 1px solid rgba(26, 67, 49, 0.08);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 16px 42px -30px rgba(26, 67, 49, 0.25);
  padding: 1rem;
}

.info-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(26, 67, 49, 0.58);
}

.info-label svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: #d4af37;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.info-main {
  margin: 0.55rem 0 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.58rem;
  line-height: 1.3;
  color: #1a4331;
}

.info-note {
  margin: 0.5rem 0 0;
  font-size: 0.94rem;
  line-height: 1.7;
  color: rgba(26, 67, 49, 0.72);
}

.info-btn {
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid transparent;
  padding: 0.62rem 1rem;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease, background-color 250ms ease, color 250ms ease, border-color 250ms ease;
}

.info-btn:hover {
  transform: translateY(-2px);
}

.info-btn--primary {
  background: #1a4331;
  color: #fff;
  box-shadow: 0 16px 28px -18px rgba(26, 67, 49, 0.45);
}

.info-btn--primary:hover {
  background: #123425;
}

.info-btn--secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #1a4331;
  border-color: rgba(26, 67, 49, 0.18);
}

@media (min-width: 640px) {
  .wedding-info-container {
    padding: 4.2rem 1.5rem;
  }

  .wedding-info-grid {
    margin-top: 2.2rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .info-card:last-child {
    grid-column: 1 / -1;
  }

  .info-card {
    padding: 1.15rem 1.15rem 1.2rem;
  }
}

@media (min-width: 1024px) {
  .wedding-info-container {
    padding: 5rem 2rem;
  }

  .wedding-info-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .info-card:last-child {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .info-btn {
    transition: none;
  }

  .info-btn:hover {
    transform: none;
  }
}
</style>

