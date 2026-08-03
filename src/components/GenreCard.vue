<template>
  <div 
    class="animate-stagger-item h-32 rounded-2xl relative overflow-hidden group cursor-pointer transition-all hover:brightness-110 active:scale-95"
    :class="bgClass"
    :style="{ animationDelay: `${delay}s` }"
  >
    <div v-if="hasGradient" class="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
    <div v-else-if="hasWhiteGradient" class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
    <div v-else-if="hasWhiteGradientBl" class="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent"></div>
    <div class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
      <span class="font-display text-xl font-bold tracking-widest uppercase" :class="textClass">
        {{ genre }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  genre: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'tertiary', 'secondary'].includes(value)
  },
  delay: {
    type: Number,
    default: 0.1
  }
})

const bgClass = computed(() => {
  const classes = {
    default: 'bg-surface-container border border-outline/5',
    primary: 'bg-primary-container border-primary/20 border',
    tertiary: 'bg-tertiary-container',
    secondary: 'bg-secondary-container'
  }
  return classes[props.variant] || classes.default
})

const textClass = computed(() => {
  const classes = {
    default: 'text-on-surface',
    primary: 'text-on-primary-container drop-shadow-sm',
    tertiary: 'text-on-tertiary-container',
    secondary: 'text-on-secondary-container'
  }
  return classes[props.variant] || classes.default
})

const hasGradient = computed(() => props.variant === 'primary')
const hasWhiteGradient = computed(() => props.variant === 'tertiary')
const hasWhiteGradientBl = computed(() => props.variant === 'secondary')
</script>