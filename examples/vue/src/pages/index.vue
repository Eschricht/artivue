<script setup lang="ts">
import { ThemeLayer, themes, useBaseTheme } from 'artivue'
import { onMounted, ref, watch } from 'vue'
import Card from '~/components/Card.vue'

const currentTheme = ref<keyof typeof themes | undefined>('dark')

const multiplier = ref(1)

const {
  setBaseTheme,
  isDark,
} = useBaseTheme()

watch(currentTheme, (newTheme) => {
  if (newTheme)
    setBaseTheme(themes[newTheme])
}, { immediate: true })

function toggleTheme() {
  currentTheme.value = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <div>
    <Card>
      <ThemeLayer
        as="div"
        :theme="(parent, isDark) => ({
          accent: {
            background: parent.surface.text,
            text: parent.surface.background,
          },
          surface: {
            background: isDark ? parent.surface.background : parent.accent.background,
            text: parent.accent.text,
          },
        })"
        :multiplier="multiplier"
        un-artivue-surface="~ border"
        un-border="~"
        un-rounded="lg"
        un-p="6"
      >
        <Card>
          <p class="text-artivue-surface-text">
            Hello world
          </p>
          <p class="text-artivue-surface-text-alt-2">
            Hello world
          </p>

          <div un-m="t-4" un-flex="~ wrap" un-gap-4>
            <button class="interactive artivue-button-accent artivue-button artivue-button-outline" @click="toggleTheme">
              Click me
            </button>

            <button class="interactive artivue-button-accent artivue-button artivue-button-solid" @click="toggleTheme">
              Click me
            </button>

            <button class="interactive artivue-button-accent artivue-button artivue-button-text" @click="toggleTheme">
              Click me
            </button>
          </div>

          <div un-m="t-4" un-flex="~ wrap" un-gap-4>
            <button class="interactive artivue-button artivue-button artivue-button-outline" @click="toggleTheme">
              Click me
            </button>

            <button class="interactive artivue-button artivue-button artivue-button-solid" @click="toggleTheme">
              Click me
            </button>

            <button class="interactive artivue-button artivue-button artivue-button-text" @click="toggleTheme">
              Click me
            </button>
          </div>

          <div un-m="t-4">
            <input class="interactive border pl-3 outline-none artivue-input" placeholder="Some placeholder">
          </div>
        </Card>

        <div un-m="t-4">
          <button class="interactive artivue-button-accent artivue-button-solid" @click="toggleTheme">
            Click me
          </button>
        </div>

        <div un-m="t-4">
          <input class="interactive border pl-3 outline-none artivue-input">
        </div>
      </ThemeLayer>

      <div un-m="t-4">
        <button class="interactive artivue-button-accent artivue-button-solid" @click="toggleTheme">
          Click me
        </button>
      </div>

      <div un-m="t-4">
        <input class="interactive border pl-3 outline-none artivue-input">
      </div>
    </Card>

    <div un-m="t-4">
      <button class="interactive artivue-button-accent artivue-button-solid" @click="toggleTheme">
        Click me
      </button>
    </div>

    <div un-m="t-4">
      <input class="interactive border pl-3 outline-none artivue-input">
    </div>
  </div>
</template>
