import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoFuncionarioCargoComponent } from './vinculo-funcionario-cargo.component';

describe('VinculoFuncionarioCargoComponent', () => {
  let component: VinculoFuncionarioCargoComponent;
  let fixture: ComponentFixture<VinculoFuncionarioCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinculoFuncionarioCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinculoFuncionarioCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
