import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoEmpresaComponent } from './edicao-empresa.component';

describe('EdicaoEmpresaComponent', () => {
  let component: EdicaoEmpresaComponent;
  let fixture: ComponentFixture<EdicaoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
