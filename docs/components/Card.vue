<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const {
  className,
} = useThemeLayer(1)
</script>

<template>
  <div :class="className" un-artivue="surface-var" un-border="~ solid artivue-border" un-rounded="lg">
    <slot />
  </div>
</template>
