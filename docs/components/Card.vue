<script setup lang="ts">
withDefaults(defineProps<{
  multiplier?: number
}>(), {
  multiplier: undefined,
})
</script>

<template>
  <ThemeLayer is="div" :multiplier="multiplier" un-artivue="surface-var" un-border="~ solid artivue-border" un-rounded="lg">
    <slot />
  </ThemeLayer>
</template>
