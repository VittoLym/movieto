<template>
  <DesktopNavBar/>
  <router-view />
  <MobileBottomNav/>
</template>

<script setup>
import DesktopNavBar from './components/desktop/DesktopNavBar.vue';
import MobileBottomNav from './components/mobile/MobileBottomNav.vue';
// App component
</script>