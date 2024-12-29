<script lang="ts">
import type { Question } from './quiz.controller'

interface Props {
	questions: Question[]
}

let { questions }: Props = $props()
</script>

<p class="result" aria-label="Correct answers of all answers">
	{questions.filter((q) => q.isCorrect).length} of {questions.length}
</p>

<style>
	.result {
		display: grid;
		gap: var(--size-8);
		justify-items: center;
	}
</style>
