<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const { className } = useThemeLayer({
  surfaceColor: '#589edf',
  surfaceTextColor: '#000000',
  accentColor: '#5c72ff',
  accentTextColor: '#ffffff',
})
</script>

<template>
  <slot :class-name="className" />
</template>
