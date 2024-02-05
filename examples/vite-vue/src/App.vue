<script setup lang="ts">

</script>

<template>
  <!-- Set base HSL colors -->
  <div
    class="p-4 min-h-screen bg-hsl-22252e border-hsl-gray-500 text-hsl-light-100"
  >
    <!-- Reuse HSL values and modify with darken, lighten, saturate and more -->
    <div class="p-4 inline-block border rounded-lg bg-hsl border-hsl border-hsl-darken-20 bg-hsl-lighten-2">
      <label>
        <p>Hello World</p>

        <input
          placeholder="Enter a value"
          class="px-2 border rounded-md outline-none transition-all duration-300 bg-hsl border-hsl border-hsl-darken-10 bg-hsl-lighten-5 focus:border-hsl-teal placeholder:text-hsl focus:border-hsl-darken-20 placeholder:text-hsl-darken-50 focus:-bg-hsl-spin-100"
        >
        <p class="text-xs text-hsl text-hsl-darken-30">
          Theming made easy with HSL colors
        </p>
      </label>
    </div>
  </div>
</template>
