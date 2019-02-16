import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComandaComponent } from './ver-comanda.component';

describe('VerComandaComponent', () => {
  let component: VerComandaComponent;
  let fixture: ComponentFixture<VerComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerComandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
