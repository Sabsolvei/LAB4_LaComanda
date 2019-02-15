import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarClienteComponent } from './asignar-cliente.component';

describe('AsignarClienteComponent', () => {
  let component: AsignarClienteComponent;
  let fixture: ComponentFixture<AsignarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
