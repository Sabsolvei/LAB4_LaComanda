import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoSectorComponent } from './pedido-sector.component';

describe('PedidoSectorComponent', () => {
  let component: PedidoSectorComponent;
  let fixture: ComponentFixture<PedidoSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
