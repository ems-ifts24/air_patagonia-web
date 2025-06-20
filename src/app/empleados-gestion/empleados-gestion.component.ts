import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Empleado, Avion, Aeropuerto, EstadoVuelo, RolTripulante, Vuelo, EstadoEmpleado } from '../core/services/vuelo-service.service';

@Component({
  selector: 'app-empleados-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados-gestion.component.html',
  styleUrl: './empleados-gestion.component.css'
})
export class EmpleadosGestionComponent implements OnInit {

  modoEdicion: boolean = false;
  titleGestion: string = 'CREACION';

  filtroEmpleado: string = '';
  empleados: Empleado[] = [];
  empleadosParaFiltrar: Empleado[] = [];
  /////////////////
  estadosEmpleado: EstadoEmpleado[] = [];
  empleado: Empleado | null = null;
  /////////////////
  estadosVuelo: EstadoVuelo[] = [];
  rolesTripulantes: RolTripulante[] = [];
  listaAviones: Avion[] = [];
  aeropuertos: Aeropuerto[] = [];
  vuelo: Vuelo | null = null;


  // inyecto el servicio
  constructor(private _router: Router, private _activeRouter: ActivatedRoute, private _vueloService: VueloServiceService) { }

  ngOnInit(): void {
    this.estadosEmpleado = this._vueloService.getEstadosEmpleado();
    this.empleados = this._vueloService.getEmpleados();
    this.listaAviones = this._vueloService.getAviones();
    this.aeropuertos = this._vueloService.getAeropuertos();
    this.rolesTripulantes = this._vueloService.getRolesTripulante();
    this.estadosVuelo = this._vueloService.getEstadosVuelo();
    this.empleadosParaFiltrar = [...this.empleados];

    // Obtener el ID del Empleado de la URL
    this._activeRouter.params.subscribe(params => {
      this.empleado = this._vueloService.getEmpleados().find(empleado => empleado.id === params['id']) || null;
    });
    if (this.empleado) {
      this.modoEdicion = true;
      this.titleGestion = 'MODIFICACION';
    }
  }

  cancelarModificacion() {
    this._router.navigate(['app/empleados']);
  }

  aplicarFiltroEmpleados(): void {
    if (!this.filtroEmpleado) { // si no hay busqueda se muestra todo el listado
      this.empleados = [...this.empleadosParaFiltrar];
      return;
    }

    const busqueda = this.filtroEmpleado.toLowerCase();
    this.empleados = this.empleadosParaFiltrar.filter(empleado =>
      empleado.nombre.toLowerCase().includes(busqueda) ||
      empleado.apellido.toLowerCase().includes(busqueda) ||
      (empleado.dni && empleado.dni.toLowerCase().includes(busqueda))
    );
  }
}
