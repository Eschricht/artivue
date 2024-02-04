<template>
  <div>
    <NuxtWelcome />

    <ThemeLayer v-slot="{ className }">
      <p :class="className">
        In the div
      </p>
    </ThemeLayer>
  </div>
</template>
