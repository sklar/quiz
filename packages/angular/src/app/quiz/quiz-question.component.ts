import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

// biome-ignore lint/style/useImportType: <explanation>
import { type Question, QuizService } from './quiz.service'

@Component({
	selector: 'app-quiz-question',
	imports: [CommonModule, FormsModule],
	template: `
    <form (ngSubmit)="onSubmit()">
      <p class="question">
        <span>{{ question.num1 }}</span>
        <span>{{ question.operation }}</span>
        <span>{{ question.num2 }}</span>
        <span>=</span>
        <input
          type="number"
          name="userAnswer"
          placeholder="???"
          autofocus
          [(ngModel)]="userAnswer"
        >
      </p>
    </form>
  `,
	styles: [
		`
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
		`,
	],
})
export class QuizQuestionComponent {
	@Input() question!: Question
	@Output() answer = new EventEmitter<boolean>()

	userAnswer = ''

	constructor(private quizService: QuizService) {}

	onSubmit() {
		if (this.userAnswer === '') return

		const isCorrect =
			Number.parseInt(this.userAnswer) ===
			this.quizService.calculateAnswer(this.question)
		this.answer.emit(isCorrect)
		this.userAnswer = ''
	}
}
