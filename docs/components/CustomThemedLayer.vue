<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const { className } = useThemeLayer(0, {
  surfaceColor: '#589edf',
  surfaceTextColor: '#000000',
  accentColor: '#5c72ff',
  accentTextColor: '#ffffff',
})
</script>

<template>
  <slot :class-name="className" />
</template>
