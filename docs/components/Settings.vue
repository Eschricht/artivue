<script lang="ts" setup>
import { themes, useBaseTheme } from 'artivue'

const {
  theme: defaultTheme,
  isDark: isCurrentDark,
  setGlobalTheme,
} = useBaseTheme()

const keys = ['surfaceColor', 'surfaceTextColor', 'accentColor', 'accentTextColor'] as const

const keyMap: Record<typeof keys[number], string> = {
  surfaceColor: 'Surface Color',
  surfaceTextColor: 'Surface Text Color',
  accentColor: 'Accent Color',
  accentTextColor: 'Accent Text Color',
}

const themeKeys = Object.keys(themes).filter(_theme => _theme !== 'DEFAULT') as Array<keyof typeof themes>

function onSelectingTheme(themeName: keyof typeof themes) {
  setGlobalTheme(themes[themeName])
}
</script>

<template>
  <div>
    <div un-inline="flex" un-flex="wrap" un-gap="4">
      <label v-for="key in keys" :key="key">
        <p un-text="xs" un-m="b-1! t-0!">{{ keyMap[key] }}</p>
        <label un-artivue="input" un-p="x-2" un-inline="flex" un-items="center" un-gap="2" un-w="fit">
          <input v-model="defaultTheme[key]" un-h="1.5em" un-bg="transparent" type="color">
          <span un-text="artivue-text-alt-3 sm">{{ defaultTheme[key] }}</span>
        </label>
      </label>
    </div>

    <p un-text="xs" un-m="t-4 b-1!">
      Presets
    </p>
    <div un-m="b-4" un-inline="flex" un-flex="wrap" un-gap="4">
      <button v-for="theme in themeKeys" :key="theme" un-artivue-button="~ solid" un-p="l-0" un-flex="~" un-overflow="hidden" un-gap="1em" @click="onSelectingTheme(theme)">
        <div un-h="full" un-border="r artivue-action">
          <div :style="{ background: themes[theme].surfaceColor }" un-p="2" un-w="2em" un-h="full">
            <div :style="{ background: themes[theme].accentColor }" un-h="2" un-rounded="md" />
          </div>
        </div>
        <div un-capitalize>
          {{ theme }}
        </div>
      </button>
    </div>
  </div>
</template>
