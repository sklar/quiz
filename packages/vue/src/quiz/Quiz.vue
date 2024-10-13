<template>
  <section class="container">
    <header class="header">
      <h1>Math Quiz</h1>
    </header>
    <div class="body">
      <quiz-question
        v-if="!isSetComplete && currentQuestion"
        :question="currentQuestion"
        @answer="answerQuestion"
      />
    </div>
    <footer>
      <quiz-progress
        v-if="!isSetComplete"
        :questions="questions"
      />
      <quiz-result
        v-else
        :time="timeTaken"
        @reload="handleReload"
      />
    </footer>
    <div ref="confettiRef" class="confetti" />
    <div
      class="celebrationGif"
      :style="{ backgroundImage: `url(${celebrationGif})` }"
    />
  </section>
</template>

<script setup lang="ts">
import party from 'party-js'
import { computed, onMounted, ref, watch } from 'vue'

import QuizProgress from './QuizProgress.vue'
import QuizQuestion from './QuizQuestion.vue'
import QuizResult from './QuizResult.vue'
import { useQuiz } from './quiz.controller'

const confettiRef = ref<HTMLElement | null>(null)
const celebrationGif = ref('')

const {
	answerQuestion,
	currentQuestionIndex,
	generateNewSet,
	isSetComplete,
	questions,
	timeTaken,
} = useQuiz()

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

const handleReload = () => {
	celebrationGif.value = ''
	generateNewSet()
}

onMounted(() => {
	generateNewSet()
})

watch(isSetComplete, (newValue) => {
	if (newValue) {
		celebrationGif.value =
			celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]
		if (confettiRef.value) {
			party.confetti(confettiRef.value, {
				count: party.variation.range(80, 160),
			})
		}
	}
})

const currentQuestion = computed(
	() => questions.value[currentQuestionIndex.value],
)
</script>

<style scoped>
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
