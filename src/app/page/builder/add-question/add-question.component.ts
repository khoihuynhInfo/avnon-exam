import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { startWith, tap } from 'rxjs';

export interface DialogData {
  questionsFormArray: FormArray;
}

export enum QuestionsTypeEnum {
  CHECK_BOX_LIST = 'CHECK_BOX_LIST',
  PARAGRAPH = 'PARAGRAPH',
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  readonly questionsTypeEnum = QuestionsTypeEnum;

  questionTypeControl = new FormControl(this.questionsTypeEnum.CHECK_BOX_LIST);

  addQuestionFormGroup!: FormGroup;

  get addQuestionFormGroupControls(): any {
    return (this.addQuestionFormGroup.controls['answers'] as FormArray)
      .controls;
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AddQuestionComponent>
  ) {}

  ngOnInit(): void {
    this.listenQuestionTypeControl();
  }

  addAnotherAnswer(): void {
    (this.addQuestionFormGroup.controls['answers'] as FormArray).push(
      this.fb.group({
        answerx: ['', Validators.required],
        checked: false,
      })
    );
  }

  submitQuestion(): void {
    console.log(this.addQuestionFormGroup);
    if (this.addQuestionFormGroup.invalid) {
      this.addQuestionFormGroup.markAllAsTouched();
      return;
    }

    const questionsFormArray = this.data.questionsFormArray;
    questionsFormArray.push(this.addQuestionFormGroup);
    this.dialogRef.close();
  }

  private listenQuestionTypeControl(): void {
    this.questionTypeControl.valueChanges
      .pipe(
        startWith(this.questionTypeControl.value),
        tap(() => {
          if (!!this.addQuestionFormGroup) {
            this.addQuestionFormGroup.reset();
          }
        })
      )
      .subscribe((questionType: QuestionsTypeEnum | null) => {
        this.initFormGroup(questionType);
      });
  }

  private initFormGroup(questionType: QuestionsTypeEnum | null): void {
    this.addQuestionFormGroup = this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([]),
      awnserText: '',
      questionType,
    });

    (this.addQuestionFormGroup.controls['answers'] as FormArray).push(
      this.fb.group({
        answerx: ['Other', Validators.required],
        checked: false,
      })
    );
  }
}
