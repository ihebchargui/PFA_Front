import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScategorieComponent } from './scategorie.component';

describe('ScategorieComponent', () => {
  let component: ScategorieComponent;
  let fixture: ComponentFixture<ScategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
