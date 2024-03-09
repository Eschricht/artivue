<template>
  <div :class="className" class="artivue-surface-var border artivue-border-var p-4 rounded-xl">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const {
  className,
} = useThemeLayer(1)
</script>
