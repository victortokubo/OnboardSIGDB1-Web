import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoFuncionarioEmpresaComponent } from './vinculo-funcionario-empresa.component';

describe('VinculoFuncionarioEmpresaComponent', () => {
  let component: VinculoFuncionarioEmpresaComponent;
  let fixture: ComponentFixture<VinculoFuncionarioEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinculoFuncionarioEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinculoFuncionarioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
