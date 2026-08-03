<template>
  <div 
    class="group cursor-pointer stagger-in active:scale-95 transition-transform"
    :style="{ animationDelay: `${delay}s` }"
    @click="$emit('click', movie)"
  >
    <div class="aspect-[2/3] rounded-xl overflow-hidden mb-4 card-shadow bg-surface-container relative">
      <img 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        :alt="movie.title" 
        :src="movie.image"
      />
      <div class="absolute inset-0 bg-black/5 inner-stroke pointer-events-none group-hover:bg-primary/5 transition-colors"></div>
    </div>
    <h4 class="font-headline-md text-body-md text-on-surface mb-1 group-hover:text-primary transition-colors">
      {{ movie.title }}
    </h4>
    <p class="text-secondary font-label-sm text-label-sm uppercase">
      {{ movie.genre }} • {{ movie.duration }}
    </p>
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
      duration: '0h 00m',
      image: ''
    })
  },
  delay: {
    type: Number,
    default: 0.5
  }
})

defineEmits(['click'])
</script>