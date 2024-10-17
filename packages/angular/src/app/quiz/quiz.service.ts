import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

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

@Injectable({
	providedIn: 'root',
})
export class QuizService {
	private state: QuizState = {
		questions: [],
		currentQuestionIndex: 0,
		startTime: 0,
		timeTaken: 0,
		isSetComplete: false,
	}

	private stateSubject = new BehaviorSubject<QuizState>(this.state)

	// constructor() {}

	getState() {
		return this.stateSubject.asObservable()
	}

	private generateQuestion(): Question {
		const operation: Operation = Math.random() < 0.5 ? '+' : '-'
		const num1 = Math.floor(Math.random() * (operation === '+' ? 50 : 100)) + 1
		const num2 =
			Math.floor(Math.random() * (operation === '+' ? 100 - num1 : num1)) + 1

		return { num1, num2, operation, isCorrect: false }
	}

	calculateAnswer(question: Question): number {
		return question.operation === '+'
			? question.num1 + question.num2
			: question.num1 - question.num2
	}

	generateNewSet() {
		this.state = {
			questions: Array.from({ length: NUMBER_OF_QUESTIONS }, () =>
				this.generateQuestion(),
			),
			currentQuestionIndex: 0,
			startTime: Date.now(),
			timeTaken: 0,
			isSetComplete: false,
		}
		this.stateSubject.next(this.state)
	}

	answerQuestion(isCorrect: boolean) {
		this.state.questions = this.state.questions.map((q, index) =>
			index === this.state.currentQuestionIndex ? { ...q, isCorrect } : q,
		)

		if (this.state.questions.every((q) => q.isCorrect)) {
			this.completeSet()
		} else {
			this.moveToNextQuestion()
		}

		this.stateSubject.next(this.state)
	}

	private moveToNextQuestion() {
		const nextIncorrectIndex = this.state.questions.findIndex(
			(q, index) => !q.isCorrect && index > this.state.currentQuestionIndex,
		)
		this.state.currentQuestionIndex =
			nextIncorrectIndex !== -1
				? nextIncorrectIndex
				: this.state.questions.findIndex((q) => !q.isCorrect)
		this.stateSubject.next(this.state)
	}

	private completeSet() {
		this.state.isSetComplete = true
		this.state.timeTaken = (Date.now() - this.state.startTime) / 1000
		this.stateSubject.next(this.state)
	}
}
