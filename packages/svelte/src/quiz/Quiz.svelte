<script lang="ts">
import party from 'party-js'
import { onMount } from 'svelte'

import QuizProgress from './QuizProgress.svelte'
import QuizQuestion from './QuizQuestion.svelte'
import QuizResult from './QuizResult.svelte'
import { quizStore } from './quiz.controller'

let confettiRef = $state<HTMLDivElement>()
let celebrationGif = $state('')

const celebrationGifs = [
	'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
	'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
	'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
	'https://media.giphy.com/media/l0MYGzh7pUL2SOyty/giphy.gif',
	'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
	'https://media.giphy.com/media/cXaeWuJ1oKO4g/giphy.gif',
	'https://media.giphy.com/media/6MMxtt269tcAM/giphy.gif',
	'https://media.giphy.com/media/fwqAg6ZS6ebL2/giphy.gif',
	'https://media.giphy.com/media/DqZKCC1rRht8FmnKbv/giphy.gif',
	'https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif',
	'https://media.giphy.com/media/xDpB3lRInUYla/giphy.gif',
	'https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif',
]

function handleReload() {
	celebrationGif = ''
	quizStore.generateNewSet()
}

onMount(() => {
	quizStore.generateNewSet()
})

$effect(() => {
	if ($quizStore.isSetComplete) {
		celebrationGif =
			celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]
		if (confettiRef) {
			party.confetti(confettiRef, {
				count: party.variation.range(80, 160),
			})
		}
	}
})

let currentQuestion = $derived(
	$quizStore.questions[$quizStore.currentQuestionIndex],
)
</script>

<section class="container">
	<header class="header">
		<h1>Math Quiz</h1>
	</header>
	<div class="body">
		{#if !$quizStore.isSetComplete && currentQuestion}
			<QuizQuestion
				question={currentQuestion}
				onAnswer={(isCorrect) => quizStore.answerQuestion(isCorrect)}
			/>
		{/if}
	</div>
	<footer>
		{#if !$quizStore.isSetComplete}
			<QuizProgress questions={$quizStore.questions} />
		{:else}
			<QuizResult time={$quizStore.timeTaken} onReload={handleReload} />
		{/if}
	</footer>
	<div bind:this={confettiRef} class="confetti"></div>
	<div
		class="celebrationGif"
		style="background-image: url({celebrationGif})"
	></div>
</section>

<style>
	.container {
		display: grid;
		gap: var(--size-4);
		inline-size: fit-content;
		margin-block-start: 20vh;
		margin-inline: auto;
		text-align: center;
	}

	.header {
		inset-block-start: -200vh;
		position: absolute;
	}

	.body {
		block-size: var(--size-12);
		display: grid;
		place-items: center;
	}

	.celebrationGif,
	.confetti {
		inset: 0;
		position: fixed;
		z-index: -1;
	}

	.celebrationGif {
		background-position: center;
		background-size: cover;
		border-radius: var(--radius-3);
		inset: 4vmax;
		max-inline-size: 2000px;
		margin-inline: auto;
	}
</style>
