<template>
  <div>
    <NuxtWelcome />

    <ThemeLayer
      v-slot="{ className }" :theme="{
        accent: {
          background: '#2b6be3',
          text: '#fff',
        },
        surface: {
          background: '#3e2b46',
          text: '#fff',
        }
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
