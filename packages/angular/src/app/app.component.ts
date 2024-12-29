import { Component } from '@angular/core'

import { QuizModule } from './quiz/quiz.module'

@Component({
	selector: 'app-root',
	imports: [QuizModule],
	template: '<main><app-quiz></app-quiz></main>',
})
export class AppComponent {}
