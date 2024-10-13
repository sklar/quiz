<template>
  <p class="result">
    <time class="timer" aria-label="Time to complete the questions set">
      {{ formattedTime }} seconds
    </time>
    <button
      type="button"
      class="button"
      aria-label="Load another set of questions"
      @click="$emit('reload')"
    >
      Reload
    </button>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	time: number
}>()

defineEmits<(e: 'reload') => void>()

const formattedTime = computed(() => props.time.toFixed(0))
</script>

<style scoped>
.result {
  display: grid;
	gap: var(--size-8);
	justify-items: center;
}

.timer {
  font-size: var(--font-size-8);
	font-weight: var(--font-weight-8);
	line-height: unset;
}

.button {
  animation: var(--animation-fade-in) forwards, var(--animation-slide-in-up);
	animation-delay: 0.8s;
	animation-duration: 0.3s, 0.6s;
	animation-timing-function: linear, var(--ease-spring-3);
	opacity: 0;
}
</style>
