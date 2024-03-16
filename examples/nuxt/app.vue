<template>
  <div>
    <NuxtWelcome />

    <ThemeLayer
      v-slot="{ className }" :theme="{
        accentColor: '#2b6be3',
        accentTextColor: '#fff',
        surfaceColor: '#3e2b46',
        surfaceTextColor: '#fff',
      }"
    >
      <div :class="className">
        <ThemeLayer
          v-slot="{ className: nestedClassName }"
        >
          <div :class="nestedClassName">
            In the div
          </div>
        </ThemeLayer>
      </div>
    </ThemeLayer>
  </div>
</template>
