<script setup lang="ts">
import { themes, useBaseTheme } from 'artivue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'

const { Layout } = DefaultTheme
const {
  isDark: isVitepressDark,
} = useData()
const {
  setBaseTheme,
  isDark,
} = useBaseTheme()

watch(isVitepressDark, (val) => {
  setBaseTheme(val ? themes.dark : themes.light)
})

watch(isDark, (val) => {
  if (isVitepressDark.value !== val)
    isVitepressDark.value = val
}, { immediate: true })
</script>

<template>
  <Layout />
</template>
