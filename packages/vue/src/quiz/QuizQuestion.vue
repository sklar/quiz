<template>
  <form @submit.prevent="handleSubmit">
    <p class="question">
      <span>{{ question.num1 }}</span>
      <span>{{ question.operation }}</span>
      <span>{{ question.num2 }}</span>
      <span>=</span>
      <input
        type="number"
        placeholder="???"
        v-model="userAnswer"
        ref="inputRef"
        @input="handleInput"
      />
    </p>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type Question, calculateAnswer } from './quiz.controller'

const props = defineProps<{
	question: Question
}>()

const emit = defineEmits<(e: 'answer', isCorrect: boolean) => void>()

const userAnswer = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const handleSubmit = () => {
	if (userAnswer.value === '') return

	const isCorrect =
		Number.parseInt(userAnswer.value) === calculateAnswer(props.question)
	emit('answer', isCorrect)
	userAnswer.value = ''
	inputRef.value?.focus()
}

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	userAnswer.value = target.value
}

onMounted(() => {
	inputRef.value?.focus()
})
</script>

<style scoped>
.question {
  align-items: baseline;
	display: inline flex;
	font-size: var(--font-size-8);
	font-weight: var(--font-weight-8);
	gap: var(--size-3);

	input {
		background: none;
		inline-size: 4ch;
	}

	::-webkit-inner-spin-button {
		display: none;
	}
}
</style>
