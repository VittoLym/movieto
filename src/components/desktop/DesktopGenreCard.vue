<template>
  <div 
    class="group relative h-48 rounded-2xl overflow-hidden card-shadow stagger-in active:scale-95 transition-all duration-300 hover:brightness-110"
    :style="{ animationDelay: `${delay}s` }"
    @click="$emit('click', genre)"
  >
    <img 
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
      :alt="genre.name" 
      :src="genre.image"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
      <div class="flex flex-col transform group-hover:translate-x-2 transition-transform duration-300">
        <span class="text-white/80 font-label-sm text-label-sm uppercase tracking-widest mb-1">
          {{ genre.subtitle }}
        </span>
        <h4 class="text-white font-headline-md text-headline-md">
          {{ genre.name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  genre: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Genre',
      subtitle: 'Explore',
      image: ''
    })
  },
  delay: {
    type: Number,
    default: 0.9
  }
})

defineEmits(['click'])
</script>