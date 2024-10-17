import { Component } from '@angular/core'

import { QuizModule } from './quiz/quiz.module'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [QuizModule],
	template: '<main><app-quiz></app-quiz></main>',
})
export class AppComponent {}
