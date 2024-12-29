import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

import type { Question } from './quiz.service'

@Component({
	selector: 'app-quiz-progress',
	imports: [CommonModule],
	template: `
    <p class="result" aria-label="Correct answers of all answers">
      {{ correctAnswers }} of {{ questions.length }}
    </p>
  `,
	styles: [
		`
			.result {
				display: grid;
				gap: var(--size-8);
				justify-items: center;
			}
		`,
	],
})
export class QuizProgressComponent {
	@Input() questions: Question[] = []

	get correctAnswers() {
		return this.questions.filter((q) => q.isCorrect).length
	}
}
