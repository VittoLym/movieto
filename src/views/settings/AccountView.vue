<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Cuenta</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Gestiona tu correo, contraseña y región.</p>
    </div>

    <!-- Content -->
    <div class="space-y-4 max-w-md">
      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Correo electrónico</label>
          <p class="text-lg font-bold text-on-surface">gabriel@email.com</p>
        </div>
        <button class="text-primary text-sm font-bold hover:underline">Cambiar</button>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Contraseña</label>
          <p class="text-lg font-bold text-on-surface">••••••••</p>
        </div>
        <button class="text-primary text-sm font-bold hover:underline">Cambiar</button>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Región</label>
          <p class="text-lg font-bold text-on-surface">Argentina</p>
        </div>
        <button class="text-primary text-sm font-bold hover:underline">Cambiar</button>
      </div>

      <button class="w-full bg-error/10 text-error py-3 rounded-xl font-bold hover:bg-error/20 active:scale-95 transition-all">
        Eliminar Cuenta
      </button>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica adicional por ahora
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>