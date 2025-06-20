import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosVistaGeneralComponent } from './empleados-vista-general.component';

describe('EmpleadosVistaGeneralComponent', () => {
  let component: EmpleadosVistaGeneralComponent;
  let fixture: ComponentFixture<EmpleadosVistaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosVistaGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosVistaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
