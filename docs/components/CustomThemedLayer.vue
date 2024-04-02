<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const { className } = useThemeLayer({
  accent: {
    background: '#5c72ff',
    text: '#ffffff',
  },
  surface: {
    background: '#589edf',
    text: '#000000',
  },
})
</script>

<template>
  <slot :class-name="className" />
</template>
