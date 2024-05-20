import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardListComponent } from './giftcard-list.component';

describe('GiftcardListComponent', () => {
  let component: GiftcardListComponent;
  let fixture: ComponentFixture<GiftcardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftcardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
