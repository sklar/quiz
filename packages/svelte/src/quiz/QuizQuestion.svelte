<script lang="ts">
import type { Question } from './quiz.controller'
import { calculateAnswer } from './quiz.controller'

interface Props {
	question: Question
	onAnswer: (isCorrect: boolean) => void
}

let { question, onAnswer }: Props = $props()

let userAnswer = $state('')
let inputRef = $state<HTMLInputElement>()

function handleSubmit(event: Event) {
	event.preventDefault()

	if (userAnswer === '') return

	const isCorrect = Number.parseInt(userAnswer) === calculateAnswer(question)

	onAnswer(isCorrect)
	userAnswer = ''
	inputRef?.focus()
}
</script>

<form onsubmit={handleSubmit}>
	<p class="question">
		<span>{question.num1}</span>
		<span>{question.operation}</span>
		<span>{question.num2}</span>
		<span>=</span>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="number"
			placeholder="???"
			autofocus
			bind:this={inputRef}
			bind:value={userAnswer}
		/>
	</p>
</form>

<style>
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
