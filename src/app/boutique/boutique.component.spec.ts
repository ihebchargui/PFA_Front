import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoutiqueComponent } from './boutique.component';

describe('BoutiqueComponent', () => {
  let component: BoutiqueComponent;
  let fixture: ComponentFixture<BoutiqueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
