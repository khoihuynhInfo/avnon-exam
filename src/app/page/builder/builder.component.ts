import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AddQuestionComponent,
  QuestionsTypeEnum,
} from './add-question/add-question.component';
import { ReviewComponent } from './review/review.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  readonly questionsTypeEnum = QuestionsTypeEnum;

  formGroup = this.fb.group({
    questionsFormArray: this.fb.array([]),
  });

  get questionsFormArrayControls(): any {
    return this.formGroup.controls['questionsFormArray'].controls as any;
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  addNewQuestion(): void {
    this.openDialog(AddQuestionComponent);
  }

  reviewAnswers(): void {
    this.openDialog(ReviewComponent);
  }

  private openDialog(
    component: ComponentType<ReviewComponent | AddQuestionComponent>
  ): void {
    const dialogRef = this.dialog.open(component, {
      height: '400px',
      width: '600px',
      data: {
        questionsFormArray: this.formGroup.controls['questionsFormArray'],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.formGroup.controls['questionsFormArray'].controls);
    });
  }
}
