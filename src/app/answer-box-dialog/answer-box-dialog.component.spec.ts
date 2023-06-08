import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBoxDialogComponent } from './answer-box-dialog.component';

describe('AnswerBoxDialogComponent', () => {
  let component: AnswerBoxDialogComponent;
  let fixture: ComponentFixture<AnswerBoxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerBoxDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerBoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
