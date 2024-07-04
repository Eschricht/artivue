<script setup lang="ts">
const setupSnippet = `// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@artivue/nuxt'
  ],

  artivue: {
    // Options
  }
})`
</script>

<template>
  <div>
    <div un-prose>
      <h1>@artivue/nuxt</h1>
      <p>
        <b un-bg="artivue-surface-action" un-text="artivue-surface-action-text" un-p="x-2" un-rounded="md">@artivue/nuxt</b> is a Nuxt module that provides a set of components and utilities to help you build your Nuxt application with Artivue design system.
      </p>

      <h2>Installation</h2>
    </div>
    <ThemeLayer as="pre" un-p="2" un-inline="block" un-artivue="surface" un-border="~ artivue-surface-border" un-rounded="lg">
      pnpm add @artivue/nuxt
    </ThemeLayer>
    <div un-prose>
      <h2>Setup</h2>
    </div>
    <ThemeLayer as="div" un-p="2" un-inline="block" un-artivue="surface" un-border="~ artivue-surface-border" un-rounded="lg">
      <Shiki
        lang="ts"
        :code="setupSnippet"
      />
    </ThemeLayer>
  </div>
</template>
