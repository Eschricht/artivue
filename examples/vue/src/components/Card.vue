<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const result = useThemeLayer()

console.log(result)

const {
  className,
} = result
</script>

<template>
  <div
    :class="className"
    un-artivue-surface="~ border"
    un-border="~"
    un-rounded="lg"
    un-p="6"
  >
    <slot />
  </div>
</template>
