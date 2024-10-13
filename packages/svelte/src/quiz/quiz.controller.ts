import { derived, get, writable } from 'svelte/store'

export type Operation = '+' | '-'

export interface Question {
	num1: number
	num2: number
	operation: Operation
	isCorrect: boolean
}

interface QuizState {
	questions: Question[]
	currentQuestionIndex: number
	startTime: number
	timeTaken: number
	isSetComplete: boolean
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

const createQuizStore = () => {
	const initialState: QuizState = {
		questions: [],
		currentQuestionIndex: 0,
		startTime: 0,
		timeTaken: 0,
		isSetComplete: false,
	}

	const { subscribe, update } = writable(initialState)

	const generateNewSet = () => {
		update(() => ({
			...initialState,
			questions: Array.from({ length: NUMBER_OF_QUESTIONS }, generateQuestion),
			startTime: Date.now(),
		}))
	}

	const answerQuestion = (isCorrect: boolean) => {
		update((state) => ({
			...state,
			questions: state.questions.map((q, index) =>
				index === state.currentQuestionIndex ? { ...q, isCorrect } : q,
			),
		}))

		// Check if all questions are answered correctly
		const updatedState = get({ subscribe })
		if (updatedState.questions.every((q) => q.isCorrect)) {
			completeSet()
		} else {
			moveToNextQuestion()
		}
	}

	const moveToNextQuestion = () => {
		update((state) => {
			const nextIncorrectIndex = state.questions.findIndex(
				(q, index) => !q.isCorrect && index > state.currentQuestionIndex,
			)
			return {
				...state,
				currentQuestionIndex:
					nextIncorrectIndex !== -1
						? nextIncorrectIndex
						: state.questions.findIndex((q) => !q.isCorrect),
			}
		})
	}

	const completeSet = () => {
		update((state) => ({
			...state,
			isSetComplete: true,
			timeTaken: (Date.now() - state.startTime) / 1000,
		}))
	}

	return {
		subscribe,
		generateNewSet,
		answerQuestion,
		calculateAnswer,
	}
}

export const quizStore = createQuizStore()

export const currentQuestion = derived(
	quizStore,
	($quizStore) => $quizStore.questions[$quizStore.currentQuestionIndex],
)
