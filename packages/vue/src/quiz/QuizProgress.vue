<template>
  <p class="result" aria-label="Correct answers of all answers">
    {{ correctAnswers }} of {{ questions.length }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { Question } from './quiz.controller'

const props = defineProps<{
	questions: Question[]
}>()

const correctAnswers = computed(
	() => props.questions.filter((q) => q.isCorrect).length,
)
</script>

<style scoped>
.result {
  display: grid;
	gap: var(--size-8);
	justify-items: center;
}

</style>
