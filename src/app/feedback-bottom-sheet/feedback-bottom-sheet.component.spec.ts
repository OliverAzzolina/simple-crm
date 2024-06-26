import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBottomSheetComponent } from './feedback-bottom-sheet.component';

describe('FeedbackBottomSheetComponent', () => {
  let component: FeedbackBottomSheetComponent;
  let fixture: ComponentFixture<FeedbackBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
