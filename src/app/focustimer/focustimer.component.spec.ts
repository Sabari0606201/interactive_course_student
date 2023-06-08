import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocustimerComponent } from './focustimer.component';

describe('FocustimerComponent', () => {
  let component: FocustimerComponent;
  let fixture: ComponentFixture<FocustimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocustimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocustimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
