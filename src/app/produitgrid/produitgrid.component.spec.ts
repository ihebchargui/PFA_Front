import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitgridComponent } from './produitgrid.component';

describe('ProduitgridComponent', () => {
  let component: ProduitgridComponent;
  let fixture: ComponentFixture<ProduitgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
