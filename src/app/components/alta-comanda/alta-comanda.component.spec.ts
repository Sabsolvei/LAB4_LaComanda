import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaComandaComponent } from './alta-comanda.component';

describe('AltaComandaComponent', () => {
  let component: AltaComandaComponent;
  let fixture: ComponentFixture<AltaComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaComandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
