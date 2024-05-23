import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardHistoryComponent } from './giftcard-history.component';

describe('GiftcardHistoryComponent', () => {
  let component: GiftcardHistoryComponent;
  let fixture: ComponentFixture<GiftcardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftcardHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftcardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
