import { ref } from 'vue'

type Operation = '+' | '-'

export interface Question {
	num1: number
	num2: number
	operation: Operation
	isCorrect: boolean
}

const NUMBER_OF_QUESTIONS = 5

const generateQuestion = (): Question => {
	const operation: Operation = Math.random() < 0.5 ? '+' : '-'
	const num1 = Math.floor(Math.random() * (operation === '+' ? 50 : 100)) + 1
	const num2 =
		Math.floor(Math.random() * (operation === '+' ? 100 - num1 : num1)) + 1

	return { num1, num2, operation, isCorrect: false }
}

export const calculateAnswer = ({
	num1,
	num2,
	operation,
}: Question): number => {
	return operation === '+' ? num1 + num2 : num1 - num2
}

export const useQuiz = () => {
	const questions = ref<Question[]>([])
	const currentQuestionIndex = ref(0)
	const startTime = ref(0)
	const timeTaken = ref(0)
	const isSetComplete = ref(false)

	const generateNewSet = () => {
		questions.value = Array.from(
			{ length: NUMBER_OF_QUESTIONS },
			generateQuestion,
		)
		currentQuestionIndex.value = 0
		startTime.value = Date.now()
		isSetComplete.value = false
		timeTaken.value = 0
	}

	const answerQuestion = (isCorrect: boolean) => {
		if (currentQuestionIndex.value < questions.value.length) {
			questions.value[currentQuestionIndex.value].isCorrect = isCorrect
		}

		if (questions.value.every((q) => q.isCorrect)) {
			isSetComplete.value = true
			timeTaken.value = (Date.now() - startTime.value) / 1000
		} else {
			const nextIncorrectIndex = questions.value.findIndex(
				(q, index) => !q.isCorrect && index > currentQuestionIndex.value,
			)
			currentQuestionIndex.value =
				nextIncorrectIndex !== -1
					? nextIncorrectIndex
					: questions.value.findIndex((q) => !q.isCorrect)
		}
	}

	return {
		answerQuestion,
		calculateAnswer,
		currentQuestionIndex,
		generateNewSet,
		isSetComplete,
		questions,
		timeTaken,
	}
}
