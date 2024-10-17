import { CommonModule } from '@angular/common'
import {
	Component,
	type ElementRef,
	type OnDestroy,
	type OnInit,
	ViewChild,
} from '@angular/core'
import party from 'party-js'
import type { Subscription } from 'rxjs'

import { QuizProgressComponent } from './quiz-progress.component'
import { QuizQuestionComponent } from './quiz-question.component'
import { QuizResultComponent } from './quiz-result.component'
// biome-ignore lint/style/useImportType: <explanation>
import { type Question, QuizService } from './quiz.service'

@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [
		CommonModule,
		QuizQuestionComponent,
		QuizProgressComponent,
		QuizResultComponent,
	],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit, OnDestroy {
	@ViewChild(QuizQuestionComponent)
	quizQuestionComponent!: QuizQuestionComponent
	@ViewChild(QuizProgressComponent)
	quizProgressComponent!: QuizProgressComponent
	@ViewChild(QuizResultComponent) quizResultComponent!: QuizResultComponent

	@ViewChild('confetti', { static: true }) confettiElement!: ElementRef

	questions: Question[] = []
	currentQuestion?: Question
	isSetComplete = false
	timeTaken = 0
	celebrationGif = ''

	private subscription?: Subscription

	constructor(private quizService: QuizService) {}

	ngOnInit() {
		this.subscription = this.quizService.getState().subscribe((state) => {
			this.questions = state.questions
			this.currentQuestion = state.questions[state.currentQuestionIndex]
			this.isSetComplete = state.isSetComplete
			this.timeTaken = state.timeTaken

			if (this.isSetComplete) {
				this.showCelebration()
			}
		})

		this.quizService.generateNewSet()
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe()
	}

	onAnswer(isCorrect: boolean) {
		this.quizService.answerQuestion(isCorrect)
	}

	onReload() {
		this.celebrationGif = ''
		this.quizService.generateNewSet()
	}

	private showCelebration() {
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
		this.celebrationGif =
			celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]

		party.confetti(this.confettiElement.nativeElement, {
			count: party.variation.range(80, 160),
		})
	}
}
