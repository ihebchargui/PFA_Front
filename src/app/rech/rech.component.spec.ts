import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechComponent } from './rech.component';

describe('RechComponent', () => {
  let component: RechComponent;
  let fixture: ComponentFixture<RechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
