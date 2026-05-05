<template>
  <!-- 
    pointer-events-none để không chặn click
    fixed inset-0 z-0 để làm nền 
  -->
  <div 
    ref="containerRef"
    class="parallax-background pointer-events-none fixed inset-0 z-0 overflow-hidden" 
    aria-hidden="true"
  >
    <div
      v-for="leaf in leaves"
      :key="leaf.id"
      class="absolute select-none will-change-transform"
      :style="getLeafStyle(leaf)"
    >
      <!-- SVG hình lá dương xỉ (Fern leaf) -->
      <svg
        viewBox="0 0 24 32"
        class="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C7 6.5 4.4 12.9 5.1 18.3 5.9 24.5 9.6 29 12 30c2.4-1 6.1-5.5 6.9-11.7.7-5.7-1.9-12-6-16.3Z" :fill="leaf.color" :fill-opacity="leaf.opacity" />
        <path d="M12 4.5c-1.8 3.2-2.8 6.9-2.6 10.4.2 4.1 1.6 7.7 2.6 10.1" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1" stroke-linecap="round" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const containerRef = ref(null);

// Cấu hình 2 layers theo yêu cầu
const layers = [
  // Layer 1 (gần mắt người): Kích thước lớn hơn, di chuyển nhanh hơn (depth cao hơn)
  { layer: 1, depth: 0.12, count: 12, sizeRange: [35, 55], opacityRange: [0.5, 0.8], color: '#2E5C41' },
  // Layer 2 (xa mắt người): Kích thước nhỏ hơn, mờ hơn, di chuyển chậm hơn (depth thấp hơn)
  { layer: 2, depth: 0.04, count: 20, sizeRange: [15, 25], opacityRange: [0.15, 0.35], color: '#4A7C59' }
];

const leaves = ref([]);
const mouseX = ref(0);
const mouseY = ref(0);
let currentX = 0;
let currentY = 0;
let animationFrameId = null;

// Hàm helper để random
const random = (min, max) => Math.random() * (max - min) + min;

// Khởi tạo các lá ngẫu nhiên theo cấu hình layer
const initLeaves = () => {
  const generatedLeaves = [];
  let idCounter = 0;

  layers.forEach(config => {
    for (let i = 0; i < config.count; i++) {
      generatedLeaves.push({
        id: idCounter++,
        layer: config.layer,
        depth: config.depth,
        size: random(config.sizeRange[0], config.sizeRange[1]),
        top: random(-5, 105), // Vị trí % theo chiều dọc (rải cả ra rìa màn hình một chút)
        left: random(-5, 105), // Vị trí % theo chiều ngang
        rotation: random(0, 360),
        color: config.color,
        opacity: random(config.opacityRange[0], config.opacityRange[1])
      });
    }
  });
  leaves.value = generatedLeaves;
};

// Theo dõi vị trí chuột và lưu lại offset từ tâm màn hình
const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  
  // Phạm vi di chuyển tối đa của chuột (tương đối)
  mouseX.value = x * 150; 
  mouseY.value = y * 150; 
};

// Vòng lặp Animation mượt mà bằng LERP
const animate = () => {
  // Lerp (tăng giảm dần) hướng về vị trí chuột
  currentX += (mouseX.value - currentX) * 0.08; 
  currentY += (mouseY.value - currentY) * 0.08;

  // Cập nhật biến CSS vào thẻ root của component (hiệu năng tốt hơn việc render lại template)
  if (containerRef.value) {
    containerRef.value.style.setProperty('--plx-x', `${currentX.toFixed(2)}px`);
    containerRef.value.style.setProperty('--plx-y', `${currentY.toFixed(2)}px`);
  }

  animationFrameId = requestAnimationFrame(animate);
};

// Tạo style động cho từng chiếc lá
const getLeafStyle = (leaf) => {
  return {
    top: `${leaf.top}%`,
    left: `${leaf.left}%`,
    width: `${leaf.size}px`,
    height: `${leaf.size * 1.4}px`, // Giữ tỷ lệ
    // Tính toán di chuyển Parallax: đi ngược hướng chuột (nhân với -)
    // Dùng translate3d để kích hoạt render bằng GPU
    transform: `translate3d(calc(var(--plx-x) * -${leaf.depth}), calc(var(--plx-y) * -${leaf.depth}), 0) rotate(${leaf.rotation}deg)`,
  };
};

onMounted(() => {
  initLeaves();
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.parallax-background {
  /* Khởi tạo biến CSS cục bộ để tránh NaN trong nhịp frame đầu tiên */
  --plx-x: 0px;
  --plx-y: 0px;
}
.will-change-transform {
  /* Báo hiệu cho trình duyệt ưu tiên xử lý Transform trên GPU */
  will-change: transform;
}
</style>
