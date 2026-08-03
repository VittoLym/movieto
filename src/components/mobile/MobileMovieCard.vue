<template>
  <div class="animate-stagger-item min-w-[160px] md:min-w-[240px] group transition-all duration-300" :style="{ animationDelay: `${delay}s` }">
    <div 
      class="aspect-[2/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm relative mb-3 group-hover:scale-105 group-hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @click="$emit('click', movie)"
    >
      <img class="w-full h-full object-cover" :alt="movie.title" :src="movie.image" />
    </div>
    <p class="font-label-md text-on-surface font-bold truncate">{{ movie.title }}</p>
    <p class="font-label-sm text-outline">{{ movie.genre }} • {{ movie.rating }} ★</p>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Movie Title',
      genre: 'Genre',
      rating: '0.0',
      image: ''
    })
  },
  delay: {
    type: Number,
    default: 0.1
  }
})

const emit = defineEmits(['click'])

const handleTouchStart = (event) => {
  const card = event.currentTarget
  card.style.transform = 'scale(0.95)'
  card.style.filter = 'brightness(1.1)'
}

const handleTouchEnd = (event) => {
  const card = event.currentTarget
  card.style.transform = ''
  card.style.filter = ''
}
</script>