import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogData,
  AddQuestionComponent,
  QuestionsTypeEnum,
} from '../add-question/add-question.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {
  readonly questionsTypeEnum = QuestionsTypeEnum;
  questionsFormArrayControls!: any;

  get questionsFormArrayControlsz(): any {
    return this.questionsFormArrayControls.controls as any;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.questionsFormArrayControls = this.data.questionsFormArray as FormArray;

    console.log(
      'questionsFormArrayControls',
      this.questionsFormArrayControls.controls
    );
  }
}
