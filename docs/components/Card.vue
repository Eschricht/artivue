<script setup lang="ts">
withDefaults(defineProps<{
  multiplier?: number
}>(), {
  multiplier: undefined,
})
</script>

<template>
  <ThemeLayer as="div" :multiplier="multiplier" un-artivue="surface" un-border="~ solid artivue-surface-border" un-rounded="lg">
    <slot />
  </ThemeLayer>
</template>
