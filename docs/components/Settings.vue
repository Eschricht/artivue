<script lang="ts" setup>
import { themes, useBaseTheme } from 'artivue'

const {
  theme: defaultTheme,
  setBaseTheme,
} = useBaseTheme()

const keys = [['surface', 'background'], ['surface', 'text'], ['accent', 'background'], ['accent', 'text']] as const

const keyMap: Record<typeof keys[number][0], Record<typeof keys[number][1], string>> = {
  surface: {
    background: 'Surface Color',
    text: 'Surface Text Color',
  },
  accent: {
    background: 'Accent Color',
    text: 'Accent Text Color',
  },
}

const themeKeys = Object.keys(themes).filter(_theme => _theme !== 'DEFAULT') as Array<keyof typeof themes>

function onSelectingTheme(themeName: keyof typeof themes) {
  setBaseTheme(themes[themeName])
}

function onSetThemeProperty(key: typeof keys[number], event: Event) {
  const value = (event.target as HTMLInputElement).value
  const theme = {
    ...defaultTheme.value,
    [key[0]]: {
      ...defaultTheme.value[key[0]],
      [key[1]]: value,
    },
  }

  setBaseTheme(theme)
}
</script>

<template>
  <div>
    <p un-text="xs" un-m="b-1! t-0!">
      Presets
    </p>
    <div un-m="b-8" un-inline="flex" un-flex="wrap" un-gap="4">
      <button v-for="theme in themeKeys" :key="theme" un-artivue-button="~ solid" un-p="l-0" un-rounded="md" un-flex="~" un-overflow="hidden" un-gap="1em" @click="onSelectingTheme(theme)">
        <div un-h="full" un-border="r artivue-action">
          <div :style="{ background: themes[theme].surface.background }" un-p="2" un-w="2em" un-h="full">
            <div :style="{ background: themes[theme].accent.background }" un-h="2" un-rounded="md" />
          </div>
        </div>
        <div un-capitalize>
          {{ theme }}
        </div>
      </button>
    </div>

    <div un-inline="flex" un-flex="wrap" un-gap="4">
      <label v-for="[themeColor, themeProperty] in keys" :key="`${themeColor}.${themeProperty}`">
        <p un-text="xs" un-m="b-1! t-0!">{{ keyMap[themeColor][themeProperty] }}</p>
        <label un-artivue="input" un-p="x-2" un-inline="flex" un-items="center" un-gap="2" un-w="fit">
          <input :value="defaultTheme[themeColor][themeProperty]" un-h="1.5em" un-bg="transparent" type="color" @input="onSetThemeProperty([themeColor, themeProperty], $event)">
          <span un-text="artivue-surface-text-alt">{{ defaultTheme[themeColor][themeProperty] }}</span>
        </label>
      </label>
    </div>
  </div>
</template>
