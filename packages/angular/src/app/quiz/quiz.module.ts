import { NgModule } from '@angular/core'

import { QuizProgressComponent } from './quiz-progress.component'
import { QuizQuestionComponent } from './quiz-question.component'
import { QuizResultComponent } from './quiz-result.component'
import { QuizComponent } from './quiz.component'

@NgModule({
	imports: [
		QuizComponent,
		QuizQuestionComponent,
		QuizProgressComponent,
		QuizResultComponent,
	],
	exports: [QuizComponent],
})
export class QuizModule {}
