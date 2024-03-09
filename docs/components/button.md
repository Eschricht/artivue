## Button goes here

<script setup lang="ts">
import { NBtn } from '@nortic/vue-ui'

const colors = ['accent', 'primary']
const variants = ['fill', 'outline', 'light', 'text']
</script>

<div v-for="variant in variants" :key="variant">
  <p>{{ variant }}</p>
  <div class="my-4 flex gap-4">
    <NBtn v-for="color in colors" :key="color" class="rounded-lg font-bold tracking-widest shadow-lg shadow-black/25" :variant="variant" :color="color">{{ color }}</NBtn>
  </div>
</div>
