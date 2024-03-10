<script setup lang="ts">
import { themes, useBaseTheme } from 'artivue'

const currentTheme = ref<keyof typeof themes | undefined>()

const {
  setGlobalTheme,
} = useBaseTheme()

watch(currentTheme, (newTheme) => {
  if (newTheme)
    setGlobalTheme(themes[newTheme])
})
</script>

<template>
  <div>
    <Card>
      <Card>
        <Card>
          <p>Hello world</p>

          <div un-m="t-4">
            <button class="artivue-button-accent artivue-button-outline">
              Click me
            </button>
          </div>

          <div un-m="t-4">
            <input class="pl-3 artivue-input">
          </div>
        </Card>

        <div un-m="t-4">
          <button class="artivue-button-accent artivue-button-solid">
            Click me
          </button>
        </div>

        <div un-m="t-4">
          <input class="pl-3 artivue-input">
        </div>
      </Card>

      <div un-m="t-4">
        <button class="artivue-button-accent artivue-button-solid">
          Click me
        </button>
      </div>

      <div un-m="t-4">
        <input class="pl-3 artivue-input">
      </div>
    </Card>

    <div un-m="t-4">
      <button class="artivue-button-accent artivue-button-solid">
        Click me
      </button>
    </div>

    <div un-m="t-4">
      <input class="pl-3 artivue-input">
    </div>
  </div>
</template>
