import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardOverviewComponent } from './giftcard-overview.component';

describe('GiftcardOverviewComponent', () => {
  let component: GiftcardOverviewComponent;
  let fixture: ComponentFixture<GiftcardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftcardOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftcardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
