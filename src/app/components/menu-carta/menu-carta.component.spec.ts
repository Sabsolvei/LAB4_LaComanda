import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCartaComponent } from './menu-carta.component';

describe('MenuCartaComponent', () => {
  let component: MenuCartaComponent;
  let fixture: ComponentFixture<MenuCartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
