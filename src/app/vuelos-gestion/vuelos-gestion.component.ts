import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Empleado } from '../core/services/vuelo-service.service';

@Component({
  selector: 'app-vuelos-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vuelos-gestion.component.html',
  styleUrl: './vuelos-gestion.component.css'
})
export class VuelosGestionComponent implements OnInit { // Implementa OnInit

  titleCreacion = 'CREACION';
  titleModificacion = 'MODIFICACION';
  empleados: Empleado[] = [];
  rolesDisponibles: string[] = [
    'Piloto',
    'Copiloto',
    'Tripulante',
    'Jefe de Cabina',
  ];
  empleadosParaFiltrar: Empleado[] = [];
  filtroEmpleado: string = '';

  // inyecto el servicio
  constructor(private router: Router, private vueloService: VueloServiceService) { }

  ngOnInit(): void {
    this.empleados = this.vueloService.getEmpleados();
    this.empleadosParaFiltrar = [...this.empleados];
  }

  cancelarModificacion() {
    this.router.navigate(['app/vuelos']);
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
