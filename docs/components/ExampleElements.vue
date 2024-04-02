<script setup lang="ts">
import ArtivueInput from './ArtivueInput.vue'
import Card from './Card.vue'
</script>

<template>
  <Card un-p="4" un-m="t-4">
    <Card un-p="4">
      <div>Theme nesting</div>
      <div un-text="sm artivue-surface-text-alt-2">
        Theme layers is fun!
      </div>
    </Card>

    <div un-m="t-4">
      <div>
        <label>Input</label><br>
        <ArtivueInput un-text="base" placeholder="Focus me" />
      </div>

      <div un-m="t-4" un-flex un-gap="4">
        <button un-text="base" un-artivue-button="~ solid">
          Standard button
        </button>

        <button un-text="base" un-artivue-button="~ solid accent">
          Accent button
        </button>
      </div>
    </div>
  </Card>
</template>
