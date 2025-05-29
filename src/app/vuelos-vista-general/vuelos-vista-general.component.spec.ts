import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosVistaGeneralComponent } from './vuelos-vista-general.component';

describe('VuelosVistaGeneralComponent', () => {
  let component: VuelosVistaGeneralComponent;
  let fixture: ComponentFixture<VuelosVistaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosVistaGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosVistaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
