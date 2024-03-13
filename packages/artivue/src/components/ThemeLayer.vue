<script setup lang="ts">
import { type Component, toRefs } from 'vue'
import { type BaseTheme, useThemeLayer } from '../index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  is?: string | Component
  multiplier?: number
  theme?: BaseTheme
}>(), {
  is: undefined,
  multiplier: undefined,
  theme: undefined,
})

const { multiplier, theme } = toRefs(props)

const {
  theme: newTheme,
  className,
  isDark,
} = useThemeLayer(multiplier, theme.value)
</script>

<template>
  <Component :is="props.is" v-if="props.is" :class="className" v-bind="$attrs">
    <slot :theme="newTheme" :is-dark="isDark" :class-name="className" />
  </Component>
  <slot v-else :theme="newTheme" :is-dark="isDark" :class-name="className" />
</template>
