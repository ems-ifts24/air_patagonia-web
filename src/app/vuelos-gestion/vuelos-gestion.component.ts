import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Empleado, Avion, Aeropuerto, EstadoVuelo, RolTripulante, Vuelo } from '../core/services/vuelo-service.service';

@Component({
  selector: 'app-vuelos-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vuelos-gestion.component.html',
  styleUrl: './vuelos-gestion.component.css'
})
export class VuelosGestionComponent implements OnInit {

  modoEdicion: boolean = false;
  titleGestion: string = 'CREACION';

  filtroEmpleado: string = '';
  empleados: Empleado[] = [];
  empleadosParaFiltrar: Empleado[] = [];
  estadosVuelo: EstadoVuelo[] = [];
  rolesTripulantes: RolTripulante[] = [];
  listaAviones: Avion[] = [];
  aeropuertos: Aeropuerto[] = [];
  vuelo: Vuelo | null = null;


  // inyecto el servicio
  constructor(private _router: Router, private _activeRouter: ActivatedRoute, private _vueloService: VueloServiceService) { }

  ngOnInit(): void {
    this.empleados = this._vueloService.getEmpleados();
    this.listaAviones = this._vueloService.getAviones();
    this.aeropuertos = this._vueloService.getAeropuertos();
    this.rolesTripulantes = this._vueloService.getRolesTripulante();
    this.estadosVuelo = this._vueloService.getEstadosVuelo();
    this.empleadosParaFiltrar = [...this.empleados];

    // Obtener el ID del vuelo de la URL
    this._activeRouter.params.subscribe(params => {
      this.vuelo = this._vueloService.getVuelos().find(vuelo => vuelo.id === params['id']) || null;
    });
    if (this.vuelo) {
      this.modoEdicion = true;
      this.titleGestion = 'MODIFICACION';
    }
  }

  cancelarModificacion() {
    this._router.navigate(['app/vuelos']);
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
