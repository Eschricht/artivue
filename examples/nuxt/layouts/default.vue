<script setup lang="ts">
import * as themes from 'artivue/themes'

const { isDark, setBaseTheme } = useBaseTheme()
const colorMode = useColorMode()

watch(() => colorMode.value, (mode) => {
  setBaseTheme(themes[mode as keyof typeof themes])
}, { immediate: true })

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div>
    <ThemeLayer as="div" un-fixed un-inset="t-0 x-0" un-bg="artivue-surface-bg/80" un-backdrop="blur-4" un-flex un-justify="between" :multiplier="-1" un-border="b artivue-surface-border" un-items="center" un-p="x-4" un-h="16">
      <div un-p="l-8">
        <p un-text="4xl">
          <b un-bg="artivue-surface-text" un-text="artivue-surface-bg" un-rounded="lg" un-p="x-2">Artivue</b> ❤️ <span>Nuxt</span>
        </p>
      </div>

      <div>
        <button @click="toggleTheme">
          Set {{ isDark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </ThemeLayer>

    <ThemeLayer :multiplier="-1" as="div" un-fixed un-inset="l-0 t-16 b-0" un-artivue="surface" un-p="l-[calc((100%-1280px)/2)]" un-w="[calc(((100%-1280px)/2) + 300px)]" un-border="r artivue-surface-border">
      <div un-p="t-8 x-16">
        <ul>
          <li>
            <NuxtLink to="/" active-class="text-artivue-accent-bg! font-bold" un-text="artivue-surface-text-alt-2">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/setup" active-class="text-artivue-accent-bg! font-bold" un-text="artivue-surface-text-alt-2">
              Setup
            </NuxtLink>
          </li>
        </ul>
      </div>
    </ThemeLayer>

    <div un-p="l-[calc(((100vw-1280px)/2)+300px)] t-24" un-container un-m="x-auto">
      <NuxtPage />
    </div>
  </div>
</template>
