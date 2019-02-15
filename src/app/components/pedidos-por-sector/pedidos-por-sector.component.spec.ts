import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPorSectorComponent } from './pedidos-por-sector.component';

describe('PedidosPorSectorComponent', () => {
  let component: PedidosPorSectorComponent;
  let fixture: ComponentFixture<PedidosPorSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPorSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPorSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
